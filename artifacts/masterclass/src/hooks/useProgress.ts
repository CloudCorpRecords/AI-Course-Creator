import { useState, useCallback } from "react";

const STORAGE_KEY = "masterclass_progress";

interface ProgressState {
  completedLessons: Record<string, boolean>;
  lastVisitedLesson: string | null;
}

const loadProgress = (): ProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedLessons: {}, lastVisitedLesson: null };
};

const saveProgress = (state: ProgressState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  const markComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        completedLessons: { ...prev.completedLessons, [lessonId]: true },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const markIncomplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        completedLessons: { ...prev.completedLessons, [lessonId]: false },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const setLastVisited = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const next = { ...prev, lastVisitedLesson: lessonId };
      saveProgress(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (lessonId: string) => !!progress.completedLessons[lessonId],
    [progress]
  );

  const completedCount = Object.values(progress.completedLessons).filter(
    Boolean
  ).length;

  return {
    completedLessons: progress.completedLessons,
    lastVisitedLesson: progress.lastVisitedLesson,
    markComplete,
    markIncomplete,
    setLastVisited,
    isCompleted,
    completedCount,
  };
}
