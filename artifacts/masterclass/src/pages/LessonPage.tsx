import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { findLesson, getPrevNextLesson } from "@/data/course";
import { ContentRenderer } from "@/components/ContentRenderer";

interface LessonPageProps {
  lessonId: string;
  isCompleted: (id: string) => boolean;
  markComplete: (id: string) => void;
  markIncomplete: (id: string) => void;
  setLastVisited: (id: string) => void;
}

export function LessonPage({
  lessonId,
  isCompleted,
  markComplete,
  markIncomplete,
  setLastVisited,
}: LessonPageProps) {
  const [, navigate] = useLocation();
  const found = findLesson(lessonId);
  const { prev, next } = getPrevNextLesson(lessonId);
  const done = isCompleted(lessonId);

  useEffect(() => {
    if (lessonId) {
      setLastVisited(lessonId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [lessonId, setLastVisited]);

  if (!found) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground mb-2">
            Lesson not found
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-primary hover:underline"
          >
            Return to course
          </button>
        </div>
      </div>
    );
  }

  const { module, lesson } = found;

  return (
    <div className="flex-1 min-w-0">
      <motion.div
        key={lessonId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border">
          <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors lg:hidden"
            >
              <ArrowLeft size={15} />
              <span>Course</span>
            </button>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground min-w-0">
              <button
                onClick={() => navigate("/")}
                className="hover:text-foreground transition-colors shrink-0"
              >
                Course
              </button>
              <span>/</span>
              <span className="text-foreground/60 truncate">
                Module {module.number}: {module.title}
              </span>
            </div>

            {/* Complete toggle */}
            <button
              onClick={() =>
                done ? markIncomplete(lessonId) : markComplete(lessonId)
              }
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                done
                  ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/25 hover:bg-emerald-400/10"
                  : "bg-card border border-border text-muted-foreground hover:border-emerald-400/30 hover:text-emerald-400"
              }`}
            >
              <CheckCircle2 size={13} />
              {done ? "Completed" : "Mark Complete"}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-8 lg:py-12">
          {/* Lesson header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Module {module.number}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-xs text-muted-foreground">{module.title}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
              {lesson.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={14} />
              <span>{lesson.estimatedMinutes} min read</span>
            </div>
          </div>

          {/* Lesson content */}
          <ContentRenderer blocks={lesson.content} />

          {/* Bottom actions */}
          <div className="mt-14 pt-8 border-t border-border">
            {!done && (
              <div className="mb-8 text-center">
                <button
                  onClick={() => markComplete(lessonId)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-400/15 text-emerald-400 border border-emerald-400/25 text-sm font-semibold hover:bg-emerald-400/20 transition-all"
                >
                  <CheckCircle2 size={16} />
                  Mark Lesson Complete
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              {prev ? (
                <button
                  onClick={() => navigate(`/lesson/${prev.id}`)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group text-left max-w-xs"
                >
                  <ChevronLeft
                    size={16}
                    className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Previous
                    </div>
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {prev.title}
                    </div>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {next ? (
                <button
                  onClick={() => navigate(`/lesson/${next.id}`)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group text-right max-w-xs ml-auto"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Next
                    </div>
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {next.title}
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                  />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
