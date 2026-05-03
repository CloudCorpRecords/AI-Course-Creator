import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  course,
  getTotalLessons,
  type Module,
} from "@workspace/course-content";
import {
  defaultStreakState,
  diffBadges,
  evaluateBadges,
  isStreakAtRisk,
  levelFromXp,
  shouldCountPerfectQuiz,
  updateStreak,
  xpForQuiz,
  XP_PER_LESSON,
  type LevelInfo,
  type ModuleSpec,
  type StreakState,
} from "@workspace/gamification";

const STORAGE_KEY = "masterclass-mobile.gamification.v2";

interface CompletedLesson {
  completedAt: string;
}

interface QuizScoreRecord {
  correct: number;
  total: number;
  takenAt: string;
  perfectFirstTry?: boolean;
}

interface PersistedState {
  xp: number;
  completedLessons: Record<string, CompletedLesson>;
  perfectQuizCount: number;
  quizScores: Record<string, QuizScoreRecord>;
  streak: StreakState;
  badges: string[];
  lastVisitedLesson: string | null;
  notificationsEnabled: boolean;
}

const DEFAULT_STATE: PersistedState = {
  xp: 0,
  completedLessons: {},
  perfectQuizCount: 0,
  quizScores: {},
  streak: defaultStreakState(),
  badges: [],
  lastVisitedLesson: null,
  notificationsEnabled: false,
};

const MODULES_SPEC: ModuleSpec[] = course.modules.map((m: Module) => ({
  id: m.id,
  number: m.number,
  lessonIds: m.lessons.map((l) => l.id),
}));
const TOTAL_LESSONS = getTotalLessons();

export interface CelebrationEvent {
  id: string;
  title: string;
  message: string;
  xpDelta: number;
  newBadges: string[];
  leveledUp: boolean;
  newLevel?: number;
  freezeUsed: boolean;
}

interface GamificationValue {
  ready: boolean;
  xp: number;
  level: LevelInfo;
  streak: StreakState;
  streakAtRisk: boolean;
  badges: string[];
  perfectQuizCount: number;
  completedLessons: Record<string, CompletedLesson>;
  quizScores: Record<string, QuizScoreRecord>;
  lastVisitedLesson: string | null;
  notificationsEnabled: boolean;
  totalLessons: number;
  completedCount: number;
  isCompleted: (lessonId: string) => boolean;
  setLastVisited: (lessonId: string) => void;
  completeLesson: (
    lessonId: string,
    quiz?: { correct: number; total: number; perfectFirstTry?: boolean },
  ) => CelebrationEvent;
  setNotificationsEnabled: (on: boolean) => Promise<void>;
  resetProgress: () => Promise<void>;
  pendingCelebration: CelebrationEvent | null;
  acknowledgeCelebration: () => void;
}

const GamificationContext = createContext<GamificationValue | null>(null);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(DEFAULT_STATE);
  const [ready, setReady] = useState<boolean>(false);
  const [pendingCelebration, setPendingCelebration] =
    useState<CelebrationEvent | null>(null);
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestStateRef = useRef<PersistedState>(DEFAULT_STATE);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw) as Partial<PersistedState>;
          const merged: PersistedState = {
            ...DEFAULT_STATE,
            ...parsed,
            streak: { ...defaultStreakState(), ...(parsed.streak ?? {}) },
          };
          latestStateRef.current = merged;
          setState(merged);
        }
      } catch {
        // ignore corrupt storage; defaults stand
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    latestStateRef.current = state;
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(latestStateRef.current),
      ).catch(() => {});
    }, 80);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [state, ready]);

  // Flush latest state on unmount to avoid losing the last debounced write.
  useEffect(() => {
    return () => {
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(latestStateRef.current),
      ).catch(() => {});
    };
  }, []);

  const isCompleted = useCallback(
    (lessonId: string) => !!state.completedLessons[lessonId],
    [state.completedLessons],
  );

  const setLastVisited = useCallback((lessonId: string) => {
    setState((prev) =>
      prev.lastVisitedLesson === lessonId
        ? prev
        : { ...prev, lastVisitedLesson: lessonId },
    );
  }, []);

  const completeLesson = useCallback(
    (
      lessonId: string,
      quiz?: { correct: number; total: number; perfectFirstTry?: boolean },
    ): CelebrationEvent => {
      let event: CelebrationEvent = {
        id: `${lessonId}-${Date.now()}`,
        title: "Lesson complete!",
        message: "",
        xpDelta: 0,
        newBadges: [],
        leveledUp: false,
        freezeUsed: false,
      };
      setState((prev) => {
        const alreadyDone = !!prev.completedLessons[lessonId];
        // XP is awarded on the first completion only — no farming by retaking.
        const lessonXp = alreadyDone ? 0 : XP_PER_LESSON;
        const quizXp = !alreadyDone && quiz ? xpForQuiz(quiz) : 0;
        const xpDelta = lessonXp + quizXp;
        const xp = prev.xp + xpDelta;

        const completedLessons = alreadyDone
          ? prev.completedLessons
          : {
              ...prev.completedLessons,
              [lessonId]: { completedAt: new Date().toISOString() },
            };

        const prevScore = prev.quizScores[lessonId];
        const hadPerfectBefore = !!prevScore?.perfectFirstTry;

        const quizScores = quiz
          ? {
              ...prev.quizScores,
              [lessonId]: {
                correct: quiz.correct,
                total: quiz.total,
                takenAt: new Date().toISOString(),
                perfectFirstTry:
                  hadPerfectBefore || !!quiz.perfectFirstTry,
              },
            }
          : prev.quizScores;

        const isFirstTryPerfectNow = !!quiz?.perfectFirstTry;
        const countPerfect = !!quiz &&
          shouldCountPerfectQuiz({
            perfectFirstTry: isFirstTryPerfectNow,
            hadPerfectBefore,
          });
        const perfectQuizCount = countPerfect
          ? prev.perfectQuizCount + 1
          : prev.perfectQuizCount;

        const streak = updateStreak(prev.streak, new Date());
        const prevLevel = levelFromXp(prev.xp).level;
        const newLevelInfo = levelFromXp(xp);
        const leveledUp = newLevelInfo.level > prevLevel;

        const completedIds = Object.keys(completedLessons);
        const earned = evaluateBadges({
          completedLessonIds: completedIds,
          totalLessons: TOTAL_LESSONS,
          modules: MODULES_SPEC,
          perfectQuizCount,
          streak,
          level: newLevelInfo.level,
        });
        const newBadges = diffBadges(prev.badges, earned);
        const badges = newBadges.length > 0 ? earned : prev.badges;

        let title = "Lesson complete!";
        let message = `+${xpDelta} XP`;
        if (leveledUp) {
          title = `Level ${newLevelInfo.level} unlocked!`;
          message = `You hit Level ${newLevelInfo.level} (+${xpDelta} XP)`;
        } else if (newBadges.length > 0) {
          title = "Badge unlocked!";
          message = `You earned ${newBadges.length} new badge${newBadges.length > 1 ? "s" : ""}`;
        } else if (countPerfect) {
          title = "Perfect score! 💯";
          message = `+${xpDelta} XP for nailing the quiz first try`;
        }
        if (streak.freezeUsedOnLastUpdate) {
          message += ` · Streak freeze saved your streak`;
        }

        event = {
          id: `${lessonId}-${Date.now()}`,
          title,
          message,
          xpDelta,
          newBadges,
          leveledUp,
          newLevel: leveledUp ? newLevelInfo.level : undefined,
          freezeUsed: !!streak.freezeUsedOnLastUpdate,
        };

        return {
          ...prev,
          xp,
          completedLessons,
          quizScores,
          perfectQuizCount,
          streak,
          badges,
        };
      });
      setPendingCelebration(event);
      return event;
    },
    [],
  );

  const acknowledgeCelebration = useCallback(() => {
    setPendingCelebration(null);
  }, []);

  const setNotificationsEnabled = useCallback(async (on: boolean) => {
    setState((prev) => ({ ...prev, notificationsEnabled: on }));
    const { scheduleDailyStreakReminder, cancelStreakReminder } = await import(
      "@/lib/notifications"
    );
    if (on) {
      const ok = await scheduleDailyStreakReminder(19, 0);
      if (!ok) {
        setState((prev) => ({ ...prev, notificationsEnabled: false }));
      }
    } else {
      await cancelStreakReminder();
    }
  }, []);

  const resetProgress = useCallback(async () => {
    latestStateRef.current = DEFAULT_STATE;
    setState({ ...DEFAULT_STATE });
    await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  const level = useMemo(() => levelFromXp(state.xp), [state.xp]);
  const completedCount = Object.keys(state.completedLessons).length;
  const streakAtRisk = useMemo(
    () => isStreakAtRisk(state.streak, new Date()),
    [state.streak],
  );

  const value = useMemo<GamificationValue>(
    () => ({
      ready,
      xp: state.xp,
      level,
      streak: state.streak,
      streakAtRisk,
      badges: state.badges,
      perfectQuizCount: state.perfectQuizCount,
      completedLessons: state.completedLessons,
      quizScores: state.quizScores,
      lastVisitedLesson: state.lastVisitedLesson,
      notificationsEnabled: state.notificationsEnabled,
      totalLessons: TOTAL_LESSONS,
      completedCount,
      isCompleted,
      setLastVisited,
      completeLesson,
      setNotificationsEnabled,
      resetProgress,
      pendingCelebration,
      acknowledgeCelebration,
    }),
    [
      ready,
      state,
      level,
      streakAtRisk,
      completedCount,
      isCompleted,
      setLastVisited,
      completeLesson,
      setNotificationsEnabled,
      resetProgress,
      pendingCelebration,
      acknowledgeCelebration,
    ],
  );

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification(): GamificationValue {
  const ctx = useContext(GamificationContext);
  if (!ctx) {
    throw new Error("useGamification must be used inside <GamificationProvider>");
  }
  return ctx;
}
