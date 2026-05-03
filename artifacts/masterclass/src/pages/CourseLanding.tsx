import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Code2,
  Brain,
} from "lucide-react";
import { course, getTotalLessons, getTotalMinutes } from "@/data/course";

interface CourseLandingProps {
  completedCount: number;
  completedLessons: Record<string, boolean>;
  lastVisitedLesson: string | null;
}

const MODULE_ICONS = [Brain, Code2, Zap, BookOpen, Trophy, CheckCircle2];

export function CourseLanding({
  completedCount,
  completedLessons,
  lastVisitedLesson,
}: CourseLandingProps) {
  const [, navigate] = useLocation();
  const total = getTotalLessons();
  const totalMinutes = getTotalMinutes();
  const totalHours = Math.round(totalMinutes / 60);
  const overallPct = Math.round((completedCount / total) * 100);

  const firstLesson = course.modules[0].lessons[0];

  const handleContinue = () => {
    navigate(`/lesson/${lastVisitedLesson ?? firstLesson.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/20 uppercase tracking-wider">
                Masterclass
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              {course.subtitle}
            </p>
            <p className="text-base text-foreground/60 max-w-2xl mb-8">
              {course.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { icon: BookOpen, label: `${course.modules.length} Modules` },
                { icon: Zap, label: `${total} In-Depth Lessons` },
                { icon: Clock, label: `~${totalHours}h of Content` },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground/80">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress + CTA */}
            {completedCount > 0 ? (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Your progress: {completedCount} / {total} lessons complete
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {overallPct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden max-w-sm mb-6">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPct}%` }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
                <button
                  onClick={handleContinue}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                >
                  Continue Learning
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleContinue}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                Start Learning
                <ArrowRight size={16} />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modules */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Course Curriculum
        </h2>

        <div className="grid gap-4">
          {course.modules.map((module, i) => {
            const Icon = MODULE_ICONS[i] ?? BookOpen;
            const completedInModule = module.lessons.filter(
              (l) => !!completedLessons[l.id]
            ).length;
            const modulePct = Math.round(
              (completedInModule / module.lessons.length) * 100
            );

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <button
                  onClick={() => navigate(`/lesson/${module.lessons[0].id}`)}
                  className="w-full text-left group"
                >
                  <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:bg-card/80 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Module {module.number}
                          </span>
                          {completedInModule === module.lessons.length && (
                            <CheckCircle2 size={12} className="text-emerald-400" />
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {module.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            {module.lessons.length} lessons
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ~
                            {Math.round(
                              module.lessons.reduce(
                                (a, l) => a + l.estimatedMinutes,
                                0
                              ) / 60
                            )}
                            h
                          </span>
                          {completedInModule > 0 && (
                            <span className="text-xs text-primary font-medium">
                              {completedInModule}/{module.lessons.length} done
                              {modulePct === 100 ? " ✓" : ""}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1"
                      />
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
