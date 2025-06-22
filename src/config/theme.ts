import { PaletteMode, createTheme, alpha } from "@mui/material";
import type { Shadows } from "@mui/material/styles";

const shadows: Shadows = [
  "none",
  ...Array(24).fill("0px 2px 6px rgba(0, 0, 0, 0.06)"),
] as Shadows;

const commonTokens = {
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif`,
    fontSize: 14,
    h1: { fontSize: "3rem", fontWeight: 700 },
    h2: { fontSize: "2.25rem", fontWeight: 700 },
    h3: { fontSize: "1.75rem", fontWeight: 700 },
    h4: { fontSize: "1.5rem", fontWeight: 600 },
    h5: { fontSize: "1.25rem", fontWeight: 600 },
    h6: { fontSize: "1rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
    button: { textTransform: "none" as const, fontWeight: 500 },
    caption: { fontSize: "0.75rem" },
  },
  shape: { borderRadius: 10 },
  spacing: 8,
  shadows,
  breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1536 } },
};

export const createCustomTheme = (mode: PaletteMode) => {
  const palette = {
    mode,
    primary: {
      main: "#4A6CF7",
      light: "#7C9EFF",
      dark: "#2A4DB8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9B59B6",
      light: "#C38BD4",
      dark: "#6E2D91",
      contrastText: "#ffffff",
    },
    success: {
      main: "#2ECC71",
      dark: "#27AE60",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F39C12",
      contrastText: "#212121",
    },
    error: {
      main: "#E74C3C",
      contrastText: "#ffffff",
    },
    info: {
      main: "#3498DB",
      contrastText: "#ffffff",
    },
    ...(mode === "light"
      ? {
          background: {
            default: "#f4f6f9",
            paper: "#ffffff",
            table: "#f1f3f7",
          },
          text: {
            primary: "#2C3E50",
            secondary: "#5D6D7E",
            disabled: "#AAB2BD",
          },
          divider: "#D6DBE9",
          grey: {
            50: "#fdfdfe",
            100: "#f0f2f7",
            200: "#e1e4ec",
            300: "#ccd2e2",
            400: "#b0b9d0",
            500: "#8a96af",
            600: "#68748c",
            700: "#4c566c",
            800: "#343d4e",
            900: "#1f2632",
          },
        }
      : {
          background: {
            default: "#161A2D",
            paper: "#1f2235",
            table: "#23263A",
          },
          text: {
            primary: "#EAECEF",
            secondary: "#AAB2C3",
            disabled: "#6F7890",
          },
          divider: "rgba(255,255,255,0.12)",
          grey: {
            50: "#e4e6f0",
            100: "#cfd3e0",
            200: "#b6bbca",
            300: "#9da3b3",
            400: "#858c9d",
            500: "#6e7486",
            600: "#595e6f",
            700: "#444858",
            800: "#2f3240",
            900: "#1a1c2d",
          },
        }),
  };

  const base = createTheme({ palette, ...commonTokens });

  return createTheme(base, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: base.palette.background.default,
            color: base.palette.text.primary,
            transition: "all 0.3s ease-in-out",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: base.palette.background.paper,
            color: base.palette.text.primary,
            boxShadow:
              base.palette.mode === "dark"
                ? "0 1px 4px rgba(0,0,0,0.3)"
                : "0 1px 4px rgba(0,0,0,0.08)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor:
              base.palette.mode === "dark" ? "#1c1f32" : "#e9edf5",
            color: base.palette.text.primary,
            borderRight: "none",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor:
              base.palette.mode === "dark" ? "#2b2f45" : "#e2e8f0",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          hover: {
            "&:hover": {
              backgroundColor:
                base.palette.mode === "dark" ? "#2a2d45" : "#f0f4fa",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
            textTransform: "none",
            "&:hover": {
              boxShadow: `0 2px 8px ${alpha(base.palette.primary.main, 0.2)}`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: "none",
            boxShadow:
              base.palette.mode === "dark"
                ? "0px 4px 12px rgba(0,0,0,0.35)"
                : "0px 4px 12px rgba(0,0,0,0.04)",
          },
        },
      },
    },
  });
};
