import { describe, it, expect } from "vitest";
import {
  levelFromXp,
  updateStreak,
  xpForQuiz,
  isPerfect,
  evaluateBadges,
  diffBadges,
  dayKey,
  LEVEL_THRESHOLDS,
  XP_PER_CORRECT_QUESTION,
  XP_PERFECT_QUIZ_BONUS,
  type StreakState,
  type ModuleSpec,
} from "../src/index";

describe("levelFromXp", () => {
  it("returns level 1 at zero xp", () => {
    const info = levelFromXp(0);
    expect(info.level).toBe(1);
    expect(info.progress).toBe(0);
  });

  it("levels up at thresholds", () => {
    expect(levelFromXp(LEVEL_THRESHOLDS[1]!).level).toBe(2);
    expect(levelFromXp(LEVEL_THRESHOLDS[2]!).level).toBe(3);
    expect(levelFromXp(LEVEL_THRESHOLDS[5]!).level).toBe(6);
  });

  it("clamps progress to [0,1]", () => {
    const info = levelFromXp(99);
    expect(info.progress).toBeGreaterThan(0);
    expect(info.progress).toBeLessThan(1);
  });

  it("caps at top level", () => {
    const info = levelFromXp(999_999);
    expect(info.level).toBe(LEVEL_THRESHOLDS.length);
  });
});

describe("xpForQuiz / isPerfect", () => {
  it("awards xp per correct + perfect bonus", () => {
    expect(xpForQuiz({ correct: 0, total: 3 })).toBe(0);
    expect(xpForQuiz({ correct: 2, total: 3 })).toBe(2 * XP_PER_CORRECT_QUESTION);
    expect(xpForQuiz({ correct: 3, total: 3 })).toBe(
      3 * XP_PER_CORRECT_QUESTION + XP_PERFECT_QUIZ_BONUS,
    );
  });

  it("isPerfect requires nonzero total", () => {
    expect(isPerfect({ correct: 0, total: 0 })).toBe(false);
    expect(isPerfect({ correct: 1, total: 1 })).toBe(true);
  });
});

describe("updateStreak", () => {
  const base: StreakState = { current: 0, longest: 0, lastActiveDay: null };

  it("starts at 1 from empty", () => {
    const s = updateStreak(base, new Date("2025-01-01T10:00:00"));
    expect(s.current).toBe(1);
    expect(s.longest).toBe(1);
    expect(s.lastActiveDay).toBe("2025-01-01");
  });

  it("is idempotent for same day", () => {
    const s1 = updateStreak(base, new Date("2025-01-01T10:00:00"));
    const s2 = updateStreak(s1, new Date("2025-01-01T22:00:00"));
    expect(s2).toEqual(s1);
  });

  it("increments on consecutive day", () => {
    const s1 = updateStreak(base, new Date("2025-01-01T10:00:00"));
    const s2 = updateStreak(s1, new Date("2025-01-02T09:00:00"));
    expect(s2.current).toBe(2);
    expect(s2.longest).toBe(2);
  });

  it("resets after gap, preserves longest", () => {
    let s = updateStreak(base, new Date("2025-01-01T10:00:00"));
    s = updateStreak(s, new Date("2025-01-02T10:00:00"));
    s = updateStreak(s, new Date("2025-01-03T10:00:00"));
    expect(s.current).toBe(3);
    s = updateStreak(s, new Date("2025-01-10T10:00:00"));
    expect(s.current).toBe(1);
    expect(s.longest).toBe(3);
  });
});

describe("dayKey", () => {
  it("formats local YYYY-MM-DD", () => {
    expect(dayKey(new Date(2025, 0, 5, 23, 30))).toBe("2025-01-05");
    expect(dayKey(new Date(2025, 11, 31, 0, 1))).toBe("2025-12-31");
  });
});

describe("evaluateBadges", () => {
  const modules: ModuleSpec[] = [
    { id: "module-1", number: 1, lessonIds: ["1-1", "1-2"] },
    { id: "module-2", number: 2, lessonIds: ["2-1", "2-2"] },
  ];
  const baseStreak: StreakState = { current: 0, longest: 0, lastActiveDay: null };

  it("awards first-lesson on first completion", () => {
    const earned = evaluateBadges({
      completedLessonIds: ["1-1"],
      totalLessons: 4,
      modules,
      perfectQuizCount: 0,
      streak: baseStreak,
      level: 1,
    });
    expect(earned).toContain("first-lesson");
    expect(earned).not.toContain("module-1");
  });

  it("awards module badge when all lessons completed", () => {
    const earned = evaluateBadges({
      completedLessonIds: ["1-1", "1-2"],
      totalLessons: 4,
      modules,
      perfectQuizCount: 0,
      streak: baseStreak,
      level: 1,
    });
    expect(earned).toContain("module-1");
    expect(earned).not.toContain("module-2");
  });

  it("awards course-complete when all lessons done", () => {
    const earned = evaluateBadges({
      completedLessonIds: ["1-1", "1-2", "2-1", "2-2"],
      totalLessons: 4,
      modules,
      perfectQuizCount: 0,
      streak: baseStreak,
      level: 1,
    });
    expect(earned).toContain("course-complete");
    expect(earned).toContain("module-1");
    expect(earned).toContain("module-2");
  });

  it("awards streak and quiz badges", () => {
    const earned = evaluateBadges({
      completedLessonIds: ["1-1"],
      totalLessons: 4,
      modules,
      perfectQuizCount: 5,
      streak: { current: 7, longest: 7, lastActiveDay: "2025-01-07" },
      level: 5,
    });
    expect(earned).toEqual(
      expect.arrayContaining([
        "quiz-ace",
        "perfect-five",
        "streak-3",
        "streak-7",
        "level-5",
      ]),
    );
    expect(earned).not.toContain("streak-30");
    expect(earned).not.toContain("level-10");
  });
});

describe("diffBadges", () => {
  it("returns only newly earned badges", () => {
    expect(diffBadges(["a", "b"], ["a", "b", "c"])).toEqual(["c"]);
    expect(diffBadges([], ["a"])).toEqual(["a"]);
    expect(diffBadges(["a"], ["a"])).toEqual([]);
  });
});
