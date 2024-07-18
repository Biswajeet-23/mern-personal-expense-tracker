import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    background: {
      light: "#E1F5FE",
      secondary: "#FFFFFF",
    },
    text: {
      primary: "#2D3436",
      secondary: "#636E72",
      muted: "#B2B2B2",
    },
    accent: {
      primary: "#FFAB91",
      secondary: "#A3C4F3",
      tertiary: "#B9FBC0",
    },
    borders: {
      default: "#D1D8E0",
      divider: "#C5C6C7",
    },
    buttons: {
      primary: "#FF6F61",
      primaryHover: "#FF5F4C",
      secondary: "#3498DB",
      secondaryHover: "#2980B9",
    },
    alerts: {
      success: "#A4DE02",
      warning: "#F1C40F",
      error: "#E74C3C",
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
