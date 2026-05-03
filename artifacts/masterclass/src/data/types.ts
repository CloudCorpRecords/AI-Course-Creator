export type ContentBlockType =
  | "paragraph"
  | "heading"
  | "code"
  | "tip"
  | "warning"
  | "insight"
  | "exercise"
  | "takeaways"
  | "quote"
  | "list";

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  text: string;
}

export interface CodeBlock {
  type: "code";
  language: string;
  caption?: string;
  code: string;
}

export interface CalloutBlock {
  type: "tip" | "warning" | "insight";
  title: string;
  text: string;
}

export interface ExerciseBlock {
  type: "exercise";
  title: string;
  description: string;
  hints: string[];
}

export interface TakeawaysBlock {
  type: "takeaways";
  items: string[];
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  attribution?: string;
}

export interface ListBlock {
  type: "list";
  ordered?: boolean;
  items: string[];
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | CodeBlock
  | CalloutBlock
  | ExerciseBlock
  | TakeawaysBlock
  | QuoteBlock
  | ListBlock;

export interface Lesson {
  id: string;
  title: string;
  estimatedMinutes: number;
  content: ContentBlock[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  title: string;
  subtitle: string;
  description: string;
  modules: Module[];
}
