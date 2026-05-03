import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Award, Printer, X, Sparkles } from "lucide-react";
import { course, getTotalLessons } from "@/data/course";

const STORAGE_KEY = "masterclass_certificate";

interface SavedCertificate {
  name: string;
  completedAt: string;
}

const loadCertificate = (): SavedCertificate | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
};

const saveCertificate = (data: SavedCertificate) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

const SHOWN_KEY = "masterclass_celebration_shown";

interface CompletionCelebrationProps {
  completedCount: number;
}

export function CompletionCelebration({
  completedCount,
}: CompletionCelebrationProps) {
  const total = getTotalLessons();
  const isComplete = completedCount >= total;

  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState<SavedCertificate | null>(loadCertificate);
  const [nameInput, setNameInput] = useState(saved?.name ?? "");
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (!isComplete) {
      triggeredRef.current = false;
      return;
    }
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SHOWN_KEY) === "1";
    } catch {}
    if (!alreadyShown) {
      try {
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {}
      setOpen(true);
    }
  }, [isComplete]);

  useEffect(() => {
    if (!open) return;

    const duration = 2500;
    const end = Date.now() + duration;
    const colors = ["#34d399", "#60a5fa", "#fbbf24", "#f472b6", "#a78bfa"];
    let rafId = 0;
    let cancelled = false;

    const frame = () => {
      if (cancelled) return;
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        startVelocity: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        startVelocity: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) {
        rafId = requestAnimationFrame(frame);
      }
    };
    rafId = requestAnimationFrame(frame);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors,
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [open]);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    const data: SavedCertificate = {
      name: trimmed,
      completedAt: saved?.completedAt ?? new Date().toISOString(),
    };
    saveCertificate(data);
    setSaved(data);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isComplete) return null;

  const formattedDate = saved
    ? new Date(saved.completedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #completion-certificate, #completion-certificate * { visibility: visible !important; }
          #completion-certificate {
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: white !important;
            color: #111 !important;
            padding: 40px !important;
            box-shadow: none !important;
            border: none !important;
          }
          #completion-certificate .cert-print-hide { display: none !important; }
          #completion-certificate .cert-text { color: #111 !important; }
          #completion-certificate .cert-muted { color: #555 !important; }
          #completion-certificate .cert-accent { color: #047857 !important; }
          #completion-certificate .cert-border { border-color: #047857 !important; }
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            data-testid="celebration-overlay"
          >
            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="cert-print-hide absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-lg"
                data-testid="button-close-celebration"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div
                id="completion-certificate"
                className="relative bg-gradient-to-br from-card via-card to-card/80 border-2 cert-border border-emerald-400/30 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-amber-400/5 pointer-events-none cert-print-hide" />

                <div className="relative text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full cert-print-hide" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/20 to-amber-400/20 border cert-border border-emerald-400/40 flex items-center justify-center">
                        <Award size={42} className="text-emerald-400 cert-accent" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles size={14} className="text-amber-400 cert-accent cert-print-hide" />
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 cert-accent">
                      Certificate of Completion
                    </span>
                    <Sparkles size={14} className="text-amber-400 cert-accent cert-print-hide" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-foreground cert-text mb-2 leading-tight">
                    Congratulations!
                  </h2>

                  <p className="text-sm text-muted-foreground cert-muted mb-8">
                    This certifies that
                  </p>

                  {saved ? (
                    <div className="mb-8">
                      <p
                        className="text-2xl md:text-3xl font-bold text-foreground cert-text font-serif italic mb-1"
                        data-testid="certificate-name"
                      >
                        {saved.name}
                      </p>
                      <button
                        onClick={() => setSaved(null)}
                        className="cert-print-hide text-xs text-muted-foreground hover:text-primary transition-colors underline"
                        data-testid="button-edit-name"
                      >
                        Edit name
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSaveName}
                      className="cert-print-hide mb-8 max-w-sm mx-auto"
                    >
                      <label className="block text-xs text-muted-foreground mb-2">
                        Enter your name for the certificate
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          placeholder="Your full name"
                          className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-emerald-400/50"
                          autoFocus
                          maxLength={60}
                          data-testid="input-certificate-name"
                        />
                        <button
                          type="submit"
                          disabled={!nameInput.trim()}
                          className="px-4 py-2 rounded-lg bg-emerald-400/15 text-emerald-400 border border-emerald-400/30 text-sm font-semibold hover:bg-emerald-400/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          data-testid="button-save-name"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  )}

                  <p className="text-base text-foreground/80 cert-text mb-2 max-w-md mx-auto">
                    has successfully completed all{" "}
                    <span className="font-semibold text-emerald-400 cert-accent">
                      {total} lessons
                    </span>{" "}
                    of
                  </p>

                  <p className="text-xl md:text-2xl font-bold text-foreground cert-text mb-1">
                    {course.title}
                  </p>
                  <p className="text-sm text-muted-foreground cert-muted mb-8 italic">
                    {course.subtitle}
                  </p>

                  <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground cert-muted mb-8">
                    <div>
                      <div className="font-semibold text-foreground/80 cert-text mb-0.5">
                        {course.modules.length}
                      </div>
                      <div className="uppercase tracking-wider">Modules</div>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div>
                      <div className="font-semibold text-foreground/80 cert-text mb-0.5">
                        {total}
                      </div>
                      <div className="uppercase tracking-wider">Lessons</div>
                    </div>
                    {saved && (
                      <>
                        <div className="w-px h-8 bg-border" />
                        <div>
                          <div className="font-semibold text-foreground/80 cert-text mb-0.5">
                            {formattedDate}
                          </div>
                          <div className="uppercase tracking-wider">
                            Completed
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {saved && (
                    <div className="cert-print-hide flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={handlePrint}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400/15 text-emerald-400 border border-emerald-400/30 text-sm font-semibold hover:bg-emerald-400/20 transition-all"
                        data-testid="button-print-certificate"
                      >
                        <Printer size={14} />
                        Print Certificate
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className="px-5 py-2.5 rounded-xl bg-card border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                        data-testid="button-dismiss-celebration"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-400/20 to-amber-400/20 border border-emerald-400/40 text-emerald-400 text-sm font-semibold shadow-lg backdrop-blur-sm hover:from-emerald-400/30 hover:to-amber-400/30 transition-all"
          data-testid="button-view-certificate"
        >
          <Award size={15} />
          View Certificate
        </button>
      )}
    </>
  );
}
