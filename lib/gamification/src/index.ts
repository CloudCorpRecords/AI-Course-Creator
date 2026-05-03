export const XP_PER_LESSON = 50;
export const XP_PER_CORRECT_QUESTION = 10;
export const XP_PERFECT_QUIZ_BONUS = 25;

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 1000, 2000, 4000, 7500, 12000, 20000,
] as const;

export const STREAK_FREEZE_REGEN_INTERVAL = 7;
export const STREAK_FREEZE_MAX = 1;

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export const BADGES: BadgeDef[] = [
  { id: "first-lesson", title: "First Steps", description: "Complete your first lesson", emoji: "🎯" },
  { id: "module-1", title: "Mindset Mastered", description: "Complete Module 1", emoji: "🧠" },
  { id: "module-2", title: "Tools Tamer", description: "Complete Module 2", emoji: "🛠️" },
  { id: "module-3", title: "Prompt Pro", description: "Complete Module 3", emoji: "💬" },
  { id: "module-4", title: "Workflow Wizard", description: "Complete Module 4", emoji: "⚙️" },
  { id: "module-5", title: "Advanced Adept", description: "Complete Module 5", emoji: "🚀" },
  { id: "module-6", title: "Builder Boss", description: "Complete Module 6", emoji: "🏗️" },
  { id: "quiz-ace", title: "Quiz Ace", description: "Pass a quiz with no mistakes", emoji: "💯" },
  { id: "perfect-five", title: "Perfectionist", description: "Ace 5 quizzes on first try", emoji: "🌟" },
  { id: "streak-3", title: "On a Roll", description: "3-day learning streak", emoji: "🔥" },
  { id: "streak-7", title: "Week Warrior", description: "7-day learning streak", emoji: "🗓️" },
  { id: "streak-30", title: "Unstoppable", description: "30-day learning streak", emoji: "👑" },
  { id: "level-5", title: "Halfway Hero", description: "Reach Level 5", emoji: "⭐" },
  { id: "level-10", title: "Apex Learner", description: "Reach Level 10", emoji: "🏆" },
  { id: "course-complete", title: "Masterclass Complete", description: "Finish every lesson", emoji: "🎓" },
];

export interface LevelInfo {
  level: number;
  xpInLevel: number;
  xpForNextLevel: number;
  progress: number;
}

export function levelFromXp(xp: number): LevelInfo {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]!) level = i + 1;
  }
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold =
    LEVEL_THRESHOLDS[level] ?? currentThreshold + (currentThreshold || 100);
  const span = Math.max(1, nextThreshold - currentThreshold);
  const xpInLevel = xp - currentThreshold;
  const xpForNextLevel = Math.max(0, nextThreshold - xp);
  return {
    level,
    xpInLevel,
    xpForNextLevel,
    progress: Math.min(1, Math.max(0, xpInLevel / span)),
  };
}

/** Convert any Date or ISO string to a YYYY-MM-DD string in local time. */
export function dayKey(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function dayDiff(aKey: string, bKey: string): number {
  const a = new Date(aKey + "T00:00:00");
  const b = new Date(bKey + "T00:00:00");
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDay: string | null;
  /** Available "freezes" that protect the streak across a one-day gap. */
  freezesAvailable: number;
  /** Whether the most recent updateStreak() consumed a freeze. */
  freezeUsedOnLastUpdate?: boolean;
}

export function defaultStreakState(): StreakState {
  return {
    current: 0,
    longest: 0,
    lastActiveDay: null,
    freezesAvailable: STREAK_FREEZE_MAX,
    freezeUsedOnLastUpdate: false,
  };
}

export function updateStreak(prev: StreakState, today: Date | string): StreakState {
  const todayKey = dayKey(today);
  if (prev.lastActiveDay === todayKey) {
    return { ...prev, freezeUsedOnLastUpdate: false };
  }

  let current: number;
  let freezesAvailable = prev.freezesAvailable ?? 0;
  let freezeUsed = false;

  if (prev.lastActiveDay === null) {
    current = 1;
  } else {
    const diff = dayDiff(prev.lastActiveDay, todayKey);
    if (diff === 1) {
      current = prev.current + 1;
    } else if (diff <= 0) {
      current = prev.current;
    } else if (diff === 2 && freezesAvailable > 0) {
      current = prev.current + 1;
      freezesAvailable -= 1;
      freezeUsed = true;
    } else {
      current = 1;
    }
  }

  // Refill one freeze every full week of streak (only when a fresh day was added).
  if (
    !freezeUsed &&
    current > prev.current &&
    current % STREAK_FREEZE_REGEN_INTERVAL === 0 &&
    freezesAvailable < STREAK_FREEZE_MAX
  ) {
    freezesAvailable = Math.min(STREAK_FREEZE_MAX, freezesAvailable + 1);
  }

  return {
    current,
    longest: Math.max(prev.longest, current),
    lastActiveDay: todayKey,
    freezesAvailable,
    freezeUsedOnLastUpdate: freezeUsed,
  };
}

/**
 * Returns true when the streak is alive but the user has not been active today.
 * Useful for surfacing an "at risk" warning in the UI.
 */
export function isStreakAtRisk(
  streak: StreakState,
  today: Date | string,
): boolean {
  if (streak.current <= 0) return false;
  if (!streak.lastActiveDay) return false;
  return dayKey(today) !== streak.lastActiveDay;
}

export interface QuizScore {
  correct: number;
  total: number;
}

export function xpForQuiz(score: QuizScore): number {
  if (score.total <= 0) return 0;
  let xp = score.correct * XP_PER_CORRECT_QUESTION;
  if (score.correct === score.total) xp += XP_PERFECT_QUIZ_BONUS;
  return xp;
}

export function isPerfect(score: QuizScore): boolean {
  return score.total > 0 && score.correct === score.total;
}

/**
 * "Perfect quiz" badges should only count first-try aces.
 * Eventually-correct retakes (after one or more wrong answers) do not qualify,
 * and a previously-perfect quiz cannot increment the count again.
 */
export function shouldCountPerfectQuiz(args: {
  perfectFirstTry: boolean;
  hadPerfectBefore: boolean;
}): boolean {
  return args.perfectFirstTry && !args.hadPerfectBefore;
}

export interface ModuleSpec {
  id: string;
  number: number;
  lessonIds: string[];
}

export interface BadgeContext {
  completedLessonIds: string[];
  totalLessons: number;
  modules: ModuleSpec[];
  perfectQuizCount: number;
  streak: StreakState;
  level: number;
}

export function evaluateBadges(ctx: BadgeContext): string[] {
  const earned = new Set<string>();
  if (ctx.completedLessonIds.length >= 1) earned.add("first-lesson");
  for (const m of ctx.modules) {
    const allDone = m.lessonIds.every((id) => ctx.completedLessonIds.includes(id));
    if (allDone && m.lessonIds.length > 0) {
      earned.add(`module-${m.number}`);
    }
  }
  if (ctx.perfectQuizCount >= 1) earned.add("quiz-ace");
  if (ctx.perfectQuizCount >= 5) earned.add("perfect-five");
  if (ctx.streak.current >= 3 || ctx.streak.longest >= 3) earned.add("streak-3");
  if (ctx.streak.current >= 7 || ctx.streak.longest >= 7) earned.add("streak-7");
  if (ctx.streak.current >= 30 || ctx.streak.longest >= 30) earned.add("streak-30");
  if (ctx.level >= 5) earned.add("level-5");
  if (ctx.level >= 10) earned.add("level-10");
  if (
    ctx.totalLessons > 0 &&
    ctx.completedLessonIds.length >= ctx.totalLessons
  ) {
    earned.add("course-complete");
  }
  return Array.from(earned);
}

export function diffBadges(prev: string[], next: string[]): string[] {
  const prevSet = new Set(prev);
  return next.filter((id) => !prevSet.has(id));
}
