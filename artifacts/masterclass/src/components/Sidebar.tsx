import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown, BookOpen, Menu, X } from "lucide-react";
import { course, getTotalLessons } from "@/data/course";
import type { Module } from "@/data/types";

interface SidebarProps {
  completedLessons: Record<string, boolean>;
  completedCount: number;
}

function ModuleSection({
  module,
  completedLessons,
  onNavigate,
  defaultOpen,
}: {
  module: Module;
  completedLessons: Record<string, boolean>;
  onNavigate: (id: string) => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [location] = useLocation();

  const completedInModule = module.lessons.filter(
    (l) => completedLessons[l.id]
  ).length;
  const pct = Math.round((completedInModule / module.lessons.length) * 100);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left hover:bg-sidebar-accent transition-colors group"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider w-5 shrink-0">
            {module.number}
          </span>
          <span className="text-sm font-medium text-sidebar-foreground truncate">
            {module.title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {pct === 100 && (
            <CheckCircle2 size={13} className="text-emerald-400" />
          )}
          {pct > 0 && pct < 100 && (
            <span className="text-xs text-muted-foreground">{pct}%</span>
          )}
          <ChevronDown
            size={14}
            className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-3 border-l border-border/50 mt-0.5 mb-1">
              {module.lessons.map((lesson) => {
                const isActive = location === `/lesson/${lesson.id}`;
                const isDone = !!completedLessons[lesson.id];
                return (
                  <button
                    key={lesson.id}
                    onClick={() => onNavigate(lesson.id)}
                    className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-md text-left transition-all group/lesson mb-0.5 ${
                      isActive
                        ? "nav-active"
                        : "hover:bg-sidebar-accent text-sidebar-foreground/75 hover:text-sidebar-foreground"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      ) : (
                        <Circle
                          size={14}
                          className={
                            isActive
                              ? "text-primary/50"
                              : "text-muted-foreground/40"
                          }
                        />
                      )}
                    </span>
                    <span className="text-xs leading-relaxed">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar({ completedLessons, completedCount }: SidebarProps) {
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const total = getTotalLessons();
  const overallPct = Math.round((completedCount / total) * 100);

  const handleNavigate = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo / Header */}
      <div className="px-4 pt-5 pb-4 border-b border-sidebar-border">
        <button
          onClick={() => { navigate("/"); setMobileOpen(false); }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
            <BookOpen size={15} className="text-primary" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-sidebar-foreground leading-tight">
              Coding with AI
            </div>
            <div className="text-xs text-muted-foreground leading-tight">
              Masterclass
            </div>
          </div>
        </button>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-muted-foreground">
              {completedCount} / {total} lessons
            </span>
            <span className="text-xs font-medium text-primary">{overallPct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${overallPct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {course.modules.map((module, i) => {
          const hasActiveLesson = module.lessons.some(
            (l) => location === `/lesson/${l.id}`
          );
          return (
            <ModuleSection
              key={module.id}
              module={module}
              completedLessons={completedLessons}
              onNavigate={handleNavigate}
              defaultOpen={i === 0 || hasActiveLesson}
            />
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">
          {course.modules.length} modules · {total} lessons
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center shadow-md"
      >
        <Menu size={18} className="text-foreground" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-sidebar z-50 border-r border-sidebar-border"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-sidebar-accent"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border overflow-hidden">
        <SidebarContent />
      </aside>
    </>
  );
}
