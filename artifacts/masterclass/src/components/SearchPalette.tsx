import { useMemo } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, Circle, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { course } from "@/data/course";

interface SearchPaletteProps {
  completedLessons: Record<string, boolean>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchPalette({
  completedLessons,
  open,
  onOpenChange,
}: SearchPaletteProps) {
  const [, navigate] = useLocation();

  const grouped = useMemo(
    () =>
      course.modules.map((m) => ({
        id: m.id,
        heading: `${m.number}. ${m.title}`,
        lessons: m.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          minutes: l.estimatedMinutes,
        })),
      })),
    []
  );

  const handleSelect = (lessonId: string) => {
    onOpenChange(false);
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">Search lessons</DialogTitle>
      <DialogDescription className="sr-only">
        Search across all course lessons by title and jump to one.
      </DialogDescription>
      <CommandInput placeholder="Search lessons by title…" />
      <CommandList>
        <CommandEmpty>No lessons found.</CommandEmpty>
        {grouped.map((m) => (
          <CommandGroup key={m.id} heading={m.heading}>
            {m.lessons.map((l) => {
              const isDone = !!completedLessons[l.id];
              return (
                <CommandItem
                  key={l.id}
                  value={`${l.title} ${m.heading}`}
                  onSelect={() => handleSelect(l.id)}
                  className="gap-2.5"
                >
                  {isDone ? (
                    <CheckCircle2
                      size={14}
                      className="text-emerald-400 shrink-0"
                    />
                  ) : (
                    <Circle
                      size={14}
                      className="text-muted-foreground/40 shrink-0"
                    />
                  )}
                  <span className="flex-1 truncate">{l.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {l.minutes} min
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  const isMac =
    typeof navigator !== "undefined" &&
    /mac/i.test(navigator.platform || navigator.userAgent);
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 hover:bg-sidebar-accent text-left text-xs text-muted-foreground transition-colors"
    >
      <Search size={13} className="shrink-0" />
      <span className="flex-1">Search lessons…</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-background/60 text-[10px] font-mono text-muted-foreground">
        {isMac ? "⌘" : "Ctrl"}K
      </kbd>
    </button>
  );
}
