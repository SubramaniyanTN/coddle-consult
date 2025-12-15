// src/hooks/useThemeColors.ts
import { useColorScheme } from "react-native";

export const colors:Record<string, Record<"light"|"dark", string>>={
    /* Screen Backgrounds */
    background: {
      light: "#FFFFFF",
      dark: "#000000",
    },

    /* Primary Text (titles, main labels) */
    text: {
      light: "#1C1C1E",
      dark: "#FFFFFF",
    },

    /* Secondary Text (subtitles, support text) */
    subText: {
      light: "#6C6C70",
      dark: "#EBEBF599",
    },

    /* Tertiary Text (caption, info text) */
    tertiaryText: {
      light: "#8E8E93",
      dark: "#8E8E93CC",
    },

    /* Quaternary / Placeholder Text */
    placeholder: {
      light: "#C7C7CC",
      dark: "#48484ACC",
    },

    /* Card surfaces */
    card: {
      light: "#FFF",
      dark: "#4A4A4A",
    },

    /* Card borders / separators */
    cardBorder: {
      light: "#E5E5EA",
      dark: "#3A3A3C",
    },

    /* Neutral surfaces (editable components, sheets) */
    surface: {
      light: "#F2F2F7",
      dark: "#1C1C1E",
    },

    /* Icons */
    icon: {
      light: "#1C1C1E",
      dark: "#FFFFFF",
    },

    /* Primary CTA Button */
    button: {
      light: "#3B82F6",
      dark: "#3B82F6",
    },

    /* Primary CTA button label */
    buttonText: {
      light: "#FFFFFF",
      dark: "#FFFFFF",
    },

    /* Disabled button */
    disabled: {
      light: "#D1D1D6",
      dark: "#3A3A3C",
    },

    /* Disabled text */
    disabledText: {
      light: "#A1A1AA",
      dark: "#6B7280",
    },

    /* Alerts */
    success: {
      light: "#34C759",
      dark: "#30D158",
    },
    warning: {
      light: "#FFCC00",
      dark: "#FFD60A",
    },
    error: {
      light: "#FF3B30",
      dark: "#FF453A",
    },

    /* Brand Colors (Optional) */
    brand: {
      light: "#4F46E5",
      dark: "#6366F1",
    },
    brandText: {
      light: "#FFFFFF",
      dark: "#E0E7FF",
    },
    "svg-primary": {
        light: "#1C1C1E",
        dark: "#FFFFFF",
      }
  }

export  type ColorName = keyof typeof colors;

export default function useThemeColors() {
  const scheme = useColorScheme() ?? "light";

  // Convert nested objects into flat colorName → value
  const flattened: Record<ColorName, string> = {} as any;

  (Object.keys(colors) as ColorName[]).forEach((key) => {
    flattened[key] = colors[key][scheme];
  });

  return flattened;
}


