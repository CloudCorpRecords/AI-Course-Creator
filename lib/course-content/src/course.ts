import type { Course } from "./types";
import { module1 } from "./module1";
import { module2 } from "./module2";
import { module3 } from "./module3";
import { module4 } from "./module4";
import { module5 } from "./module5";
import { module6 } from "./module6";

export const course: Course = {
  title: "Coding with AI",
  subtitle: "From Vibe Coding Basics to First-Principles Mastery",
  description:
    "A comprehensive 35-lesson masterclass covering every aspect of AI-assisted development — from mindset and tools to advanced agent systems and production deployment.",
  modules: [module1, module2, module3, module4, module5, module6],
};

export { module1, module2, module3, module4, module5, module6 };

export const getTotalLessons = () =>
  course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

export const getTotalMinutes = () =>
  course.modules.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.estimatedMinutes, 0),
    0
  );

export const findLesson = (lessonId: string) => {
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      if (lesson.id === lessonId) return { module, lesson };
    }
  }
  return null;
};

export const getPrevNextLesson = (lessonId: string) => {
  const allLessons = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  );
  const idx = allLessons.findIndex((l) => l.id === lessonId);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
};
