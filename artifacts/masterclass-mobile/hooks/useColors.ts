import { useColorScheme } from "react-native";

import colors from "@/constants/colors";

/**
 * Returns the design tokens for the current color scheme.
 * The mobile artifact ships dark-first, with the dark palette mirrored
 * from the sibling web artifact's index.css.
 */
export function useColors() {
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? colors.dark : colors.light;
  return { ...palette, radius: colors.radius };
}
