export const COLORS = {
  primary: "#030014",
  secondary: "#151312",
  light: {
    100: "#D6C6FF",
    200: "#A8B5DB",
    300: "#9CA4AB",
  },
  dark: {
    100: "#221F3D",
    200: "#0F0D23",
  },
  accent: "#AB8BFF",
  white: "#FFFFFF",
  gray: {
    500: "#6B7280",
  },
  red: {
    500: "#EF4444",
  },
} as const;

export const LAYOUT = {
  logoTop: 80,
  logoHeight: 40,
  logoMarginBottom: 20,
} as const;
export const HEADER_HEIGHT =
  LAYOUT.logoTop + LAYOUT.logoHeight + LAYOUT.logoMarginBottom;
