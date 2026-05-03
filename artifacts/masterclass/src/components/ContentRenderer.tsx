import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import type { ContentBlock } from "@/data/types";
import {
  Lightbulb,
  AlertTriangle,
  Sparkles,
  Dumbbell,
  CheckSquare,
  Quote as QuoteIcon,
  ChevronDown,
} from "lucide-react";

function CodeBlock({
  code,
  language,
  caption,
}: {
  code: string;
  language: string;
  caption?: string;
}) {
  const langMap: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    tsx: "typescript",
    jsx: "javascript",
    sh: "bash",
    shell: "bash",
    yml: "yaml",
    py: "python",
  };
  const hlLang = langMap[language] ?? language;

  return (
    <div className="code-block my-6 overflow-hidden rounded-[8px]">
      {(caption || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-black/20">
          {caption ? (
            <span className="text-xs text-muted-foreground font-medium truncate">
              {caption}
            </span>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-wider shrink-0 ml-2">
            {language}
          </span>
        </div>
      )}
      <SyntaxHighlighter
        language={hlLang}
        style={atomOneDark}
        customStyle={{
          margin: 0,
          padding: "1.25rem 1.5rem",
          background: "hsl(228 14% 6%)",
          fontSize: "0.84rem",
          lineHeight: "1.7",
          overflowX: "auto",
        }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function Callout({
  type,
  title,
  text,
}: {
  type: "tip" | "warning" | "insight";
  title: string;
  text: string;
}) {
  const config = {
    tip: {
      icon: <Lightbulb size={15} />,
      className: "callout callout-tip",
      titleColor: "text-emerald-400",
      iconBg: "bg-emerald-400/15",
    },
    warning: {
      icon: <AlertTriangle size={15} />,
      className: "callout callout-warning",
      titleColor: "text-amber-400",
      iconBg: "bg-amber-400/15",
    },
    insight: {
      icon: <Sparkles size={15} />,
      className: "callout callout-insight",
      titleColor: "text-primary",
      iconBg: "bg-primary/15",
    },
  }[type];

  return (
    <div className={config.className}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`p-1 rounded ${config.iconBg} ${config.titleColor}`}>
          {config.icon}
        </span>
        <span className={`text-sm font-semibold ${config.titleColor}`}>
          {title}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foreground/85">{text}</p>
    </div>
  );
}

function ExerciseBlock({
  title,
  description,
  hints,
}: {
  title: string;
  description: string;
  hints: string[];
}) {
  const [hintsOpen, setHintsOpen] = useState(false);

  return (
    <div className="exercise-block">
      <div className="flex items-center gap-2 mb-3">
        <span className="p-1.5 rounded-md bg-primary/15">
          <Dumbbell size={14} className="text-primary" />
        </span>
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">
          Exercise
        </span>
      </div>
      <h4 className="text-base font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-foreground/80 leading-relaxed mb-4">
        {description}
      </p>
      {hints.length > 0 && (
        <div>
          <button
            onClick={() => setHintsOpen((o) => !o)}
            className="flex items-center gap-2 text-xs font-semibold text-primary/80 hover:text-primary transition-colors mb-2 group"
          >
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${hintsOpen ? "rotate-180" : ""}`}
            />
            {hintsOpen ? "Hide hints" : `Show ${hints.length} hint${hints.length > 1 ? "s" : ""}`}
          </button>

          {hintsOpen && (
            <ul className="space-y-1.5 mt-2 pl-1">
              {hints.map((hint, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground/75">
                  <span className="text-primary shrink-0 mt-0.5">→</span>
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function TakeawaysBlock({ items }: { items: string[] }) {
  return (
    <div className="takeaways-block">
      <div className="flex items-center gap-2 mb-3">
        <span className="p-1.5 rounded-md bg-emerald-400/15">
          <CheckSquare size={14} className="text-emerald-400" />
        </span>
        <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
          Key Takeaways
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-foreground/85">
            <CheckSquare size={14} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuoteBlock({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  return (
    <div className="quote-block">
      <div className="flex gap-3">
        <QuoteIcon size={20} className="text-primary/40 shrink-0 mt-0.5" />
        <div>
          <p className="text-base leading-relaxed text-foreground/90 italic">
            "{text}"
          </p>
          {attribution && (
            <p className="text-sm text-muted-foreground mt-2 not-italic">
              — {attribution}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-1">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-[15px] leading-[1.85] text-foreground/85 mb-5"
              >
                {block.text}
              </p>
            );

          case "heading":
            return block.level === 2 ? (
              <h2
                key={i}
                className="text-xl font-bold text-foreground mt-10 mb-4 pb-2 border-b border-border/40"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={i}
                className="text-base font-semibold text-foreground mt-7 mb-3"
              >
                {block.text}
              </h3>
            );

          case "code":
            return (
              <CodeBlock
                key={i}
                code={block.code}
                language={block.language}
                caption={block.caption}
              />
            );

          case "tip":
          case "warning":
          case "insight":
            return (
              <Callout
                key={i}
                type={block.type}
                title={block.title}
                text={block.text}
              />
            );

          case "exercise":
            return (
              <ExerciseBlock
                key={i}
                title={block.title}
                description={block.description}
                hints={block.hints}
              />
            );

          case "takeaways":
            return <TakeawaysBlock key={i} items={block.items} />;

          case "quote":
            return (
              <QuoteBlock
                key={i}
                text={block.text}
                attribution={block.attribution}
              />
            );

          case "list":
            return block.ordered ? (
              <ol key={i} className="list-none space-y-2.5 my-5 pl-0">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[15px] text-foreground/80">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="space-y-2 my-5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[15px] text-foreground/80">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
