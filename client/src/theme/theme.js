import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    background: {
      light: "#f5f5f5", // Light mode background
      secondary: "#ffffff", // Light mode secondary background
      dark: "#1a202c", // Dark mode background
      secondaryDark: "#2d3748", // Dark mode secondary background
    },
    text: {
      primary: "#2d3436", // Light mode primary text
      secondary: "#636e72", // Light mode secondary text
      muted: "#b2b2b2", // Light mode muted text
      primaryDark: "#f5f5f5", // Dark mode primary text
      secondaryDark: "#d1d8e0", // Dark mode secondary text
      mutedDark: "#a0aec0", // Dark mode muted text
    },
    accent: {
      primary: "#f97316", // Updated Accent color (Orange)
      secondary: "#4a90e2", // Secondary accent color (Blue)
      tertiary: "#f6ad55", // Tertiary accent color (Orange)
    },
    borders: {
      default: "#d1d8e0", // Light mode borders
      divider: "#c5c6c7", // Light mode dividers
      defaultDark: "#4a5568", // Dark mode borders
      dividerDark: "#718096", // Dark mode dividers
    },
    buttons: {
      primary: "#ff6f61", // Primary button color
      primaryHover: "#ff5f4c", // Primary button hover color
      secondary: "#3498db", // Secondary button color
      secondaryHover: "#2980b9", // Secondary button hover color
    },
    alerts: {
      success: "#a4de02", // Success alert color
      warning: "#f1c40f", // Warning alert color
      error: "#e74c3c", // Error alert color
    },
    hoverbutton: {
      light: "#d6e9ff", // Light mode background
      secondary: "#a4c5ed", // Light mode secondary background
      dark: "#414e66", // Dark mode background
      secondaryDark: "#5f6c82", // Dark mode secondary background
    },
  },
  config: {
    initialColorMode: "light", // Initial color mode
    useSystemColorMode: true, // Disable system color mode
  },
  styles: {
    global: (props) => ({
      body: {
        bg:
          props.colorMode === "light" ? "background.light" : "background.dark",
        color:
          props.colorMode === "light" ? "text.primary" : "text.primaryDark",
      },
      a: {
        color:
          props.colorMode === "light" ? "accent.primary" : "accent.primary",
        _hover: {
          textDecoration: "underline",
        },
      },
    }),
  },
});

export default theme;
