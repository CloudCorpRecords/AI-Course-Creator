/**
 * Tiny zero-dependency syntax highlighter for mobile lesson code blocks.
 * Tokenizes only what the masterclass curriculum actually uses
 * (typescript / bash / yaml / toml / markdown / text). Falls back to
 * plain tokens for unknown languages.
 */

export type TokenKind =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "type"
  | "builtin"
  | "number"
  | "punctuation"
  | "function"
  | "tag"
  | "key"
  | "operator";

export interface Token {
  kind: TokenKind;
  text: string;
}

interface Rule {
  kind: TokenKind;
  re: RegExp;
}

const TS_KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "switch", "case", "break", "continue", "import", "export", "from", "as",
  "default", "class", "extends", "implements", "interface", "type", "enum",
  "new", "this", "super", "throw", "try", "catch", "finally", "await",
  "async", "yield", "in", "of", "typeof", "instanceof", "void", "null",
  "undefined", "true", "false", "static", "public", "private", "protected",
  "readonly", "abstract", "namespace", "declare", "satisfies", "infer",
]);

const TS_TYPES = new Set([
  "string", "number", "boolean", "any", "unknown", "never", "object",
  "Promise", "Array", "Record", "Partial", "Pick", "Omit", "Map", "Set",
  "Date", "Error", "RegExp",
]);

const BASH_KEYWORDS = new Set([
  "if", "then", "else", "fi", "for", "in", "do", "done", "while", "case",
  "esac", "function", "return", "exit", "export", "local", "echo", "cd",
  "ls", "rm", "mkdir", "cp", "mv", "cat", "grep", "sed", "awk", "curl",
  "git", "npm", "pnpm", "yarn", "node", "python", "pip", "sudo",
]);

function tokenizeWith(rules: Rule[], src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    let matched = false;
    for (const rule of rules) {
      rule.re.lastIndex = i;
      const m = rule.re.exec(src);
      if (m && m.index === i && m[0].length > 0) {
        out.push({ kind: rule.kind, text: m[0] });
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Coalesce a single plain char with the previous plain token.
      const last = out[out.length - 1];
      if (last && last.kind === "plain") last.text += src[i]!;
      else out.push({ kind: "plain", text: src[i]! });
      i += 1;
    }
  }
  return out;
}

const TS_RULES: Rule[] = [
  { kind: "comment", re: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
  { kind: "string", re: /`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/y },
  { kind: "number", re: /\b\d+(?:\.\d+)?\b/y },
  { kind: "plain", re: /\s+/y },
  {
    kind: "keyword",
    re: /\b[A-Za-z_$][A-Za-z0-9_$]*\b/y,
  },
  { kind: "operator", re: /=>|===|!==|==|!=|<=|>=|&&|\|\||\.\.\.|[+\-*/%=<>!&|^~?:]/y },
  { kind: "punctuation", re: /[(){}\[\];,.@]/y },
];

function tokenizeTs(src: string): Token[] {
  const raw = tokenizeWith(TS_RULES, src);
  // Reclassify identifiers into keyword / type / function / plain.
  const tokens: Token[] = [];
  for (let i = 0; i < raw.length; i++) {
    const t = raw[i]!;
    if (t.kind === "keyword") {
      const next = raw[i + 1];
      if (TS_KEYWORDS.has(t.text)) {
        tokens.push({ kind: "keyword", text: t.text });
      } else if (TS_TYPES.has(t.text) || /^[A-Z]/.test(t.text)) {
        tokens.push({ kind: "type", text: t.text });
      } else if (next && next.kind === "punctuation" && next.text === "(") {
        tokens.push({ kind: "function", text: t.text });
      } else {
        tokens.push({ kind: "plain", text: t.text });
      }
    } else {
      tokens.push(t);
    }
  }
  return tokens;
}

const BASH_RULES: Rule[] = [
  { kind: "comment", re: /#[^\n]*/y },
  { kind: "string", re: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y },
  { kind: "operator", re: /\$\{[^}]+\}|\$[A-Za-z_][A-Za-z0-9_]*/y },
  { kind: "number", re: /\b\d+\b/y },
  { kind: "plain", re: /\s+/y },
  { kind: "punctuation", re: /[|&;()<>{}\[\]]/y },
  { kind: "keyword", re: /\b[A-Za-z_][A-Za-z0-9_-]*\b/y },
  { kind: "operator", re: /[=+\-*/%!?:]/y },
];

function tokenizeBash(src: string): Token[] {
  const raw = tokenizeWith(BASH_RULES, src);
  const tokens: Token[] = [];
  for (let i = 0; i < raw.length; i++) {
    const t = raw[i]!;
    if (t.kind === "keyword") {
      if (BASH_KEYWORDS.has(t.text)) {
        // First word on a line that's also a known command -> builtin
        tokens.push({ kind: "function", text: t.text });
      } else if (/^-{1,2}[A-Za-z]/.test(t.text)) {
        tokens.push({ kind: "type", text: t.text });
      } else {
        tokens.push({ kind: "plain", text: t.text });
      }
    } else {
      tokens.push(t);
    }
  }
  return tokens;
}

function tokenizeYaml(src: string): Token[] {
  const out: Token[] = [];
  const lines = src.split("\n");
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li]!;
    if (line.trimStart().startsWith("#")) {
      const indent = line.length - line.trimStart().length;
      if (indent > 0) out.push({ kind: "plain", text: line.slice(0, indent) });
      out.push({ kind: "comment", text: line.slice(indent) });
    } else {
      const m = /^(\s*-?\s*)([A-Za-z0-9_.\-]+)(:)(\s*)(.*)$/.exec(line);
      if (m) {
        const [, lead, key, colon, gap, rest] = m;
        if (lead) out.push({ kind: "plain", text: lead });
        out.push({ kind: "key", text: key! });
        out.push({ kind: "punctuation", text: colon! });
        if (gap) out.push({ kind: "plain", text: gap });
        if (rest) {
          if (/^["'].*["']$/.test(rest) || /^\d/.test(rest)) {
            out.push({
              kind: /^\d/.test(rest) ? "number" : "string",
              text: rest,
            });
          } else if (/^(true|false|null|~)$/.test(rest)) {
            out.push({ kind: "keyword", text: rest });
          } else {
            out.push({ kind: "plain", text: rest });
          }
        }
      } else {
        out.push({ kind: "plain", text: line });
      }
    }
    if (li < lines.length - 1) out.push({ kind: "plain", text: "\n" });
  }
  return out;
}

const TOML_RULES: Rule[] = [
  { kind: "comment", re: /#[^\n]*/y },
  { kind: "tag", re: /^\[\[?[^\]\n]+\]\]?/my },
  { kind: "string", re: /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/y },
  { kind: "number", re: /\b\d+(?:\.\d+)?\b/y },
  { kind: "keyword", re: /\b(true|false)\b/y },
  { kind: "key", re: /^[ \t]*[A-Za-z_][A-Za-z0-9_-]*(?=\s*=)/my },
  { kind: "operator", re: /=/y },
  { kind: "plain", re: /\s+/y },
  { kind: "punctuation", re: /[\[\],{}.]/y },
  { kind: "plain", re: /[A-Za-z_][A-Za-z0-9_-]*/y },
];

function tokenizeMarkdown(src: string): Token[] {
  const out: Token[] = [];
  const lines = src.split("\n");
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li]!;
    if (/^#{1,6}\s/.test(line)) {
      out.push({ kind: "tag", text: line });
    } else if (/^\s*[-*+]\s/.test(line) || /^\s*\d+\.\s/.test(line)) {
      const m = /^(\s*(?:[-*+]|\d+\.)\s)(.*)$/.exec(line);
      if (m) {
        out.push({ kind: "operator", text: m[1]! });
        out.push({ kind: "plain", text: m[2]! });
      } else {
        out.push({ kind: "plain", text: line });
      }
    } else if (/^>\s/.test(line)) {
      out.push({ kind: "comment", text: line });
    } else {
      // inline code/bold/italic minimal
      let rest = line;
      const inline = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/;
      while (rest.length > 0) {
        const m = inline.exec(rest);
        if (!m) {
          out.push({ kind: "plain", text: rest });
          break;
        }
        if (m.index > 0)
          out.push({ kind: "plain", text: rest.slice(0, m.index) });
        const tok = m[0];
        out.push({
          kind: tok.startsWith("`") ? "string" : "type",
          text: tok,
        });
        rest = rest.slice(m.index + tok.length);
      }
    }
    if (li < lines.length - 1) out.push({ kind: "plain", text: "\n" });
  }
  return out;
}

export function tokenize(language: string, code: string): Token[] {
  const lang = language.toLowerCase();
  if (lang === "ts" || lang === "typescript" || lang === "js" || lang === "javascript" || lang === "tsx" || lang === "jsx") {
    return tokenizeTs(code);
  }
  if (lang === "bash" || lang === "sh" || lang === "shell" || lang === "zsh") {
    return tokenizeBash(code);
  }
  if (lang === "yaml" || lang === "yml") {
    return tokenizeYaml(code);
  }
  if (lang === "toml") {
    return tokenizeWith(TOML_RULES, code);
  }
  if (lang === "markdown" || lang === "md") {
    return tokenizeMarkdown(code);
  }
  return [{ kind: "plain", text: code }];
}

export const TOKEN_COLORS: Record<TokenKind, string> = {
  plain: "#cbd5e1",
  comment: "#64748b",
  string: "#86efac",
  keyword: "#c084fc",
  type: "#7dd3fc",
  builtin: "#fbbf24",
  number: "#fbbf24",
  punctuation: "#94a3b8",
  function: "#f472b6",
  tag: "#7c6af7",
  key: "#7dd3fc",
  operator: "#f472b6",
};
