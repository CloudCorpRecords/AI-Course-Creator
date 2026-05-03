/**
 * Dark-first design tokens for the AI Coding Masterclass mobile app.
 * Synced with the sibling web artifact's index.css palette.
 */
const palette = {
  text: "#dde0ec",
  tint: "#7c6af7",
  background: "#0f1117",
  foreground: "#dde0ec",
  card: "#161922",
  cardForeground: "#dde0ec",
  primary: "#7c6af7",
  primaryForeground: "#ffffff",
  secondary: "#1c2030",
  secondaryForeground: "#dde0ec",
  muted: "#1c2030",
  mutedForeground: "#8b91a7",
  accent: "#06b6d4",
  accentForeground: "#0f1117",
  destructive: "#ef4444",
  destructiveForeground: "#ffffff",
  border: "#252a3a",
  input: "#252a3a",
  success: "#10b981",
  warning: "#f59e0b",
} as const;

const colors = {
  light: palette,
  dark: palette,
  radius: 14,
};

export default colors;
