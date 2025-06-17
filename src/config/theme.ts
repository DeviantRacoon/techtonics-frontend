import { PaletteMode, createTheme } from '@mui/material'

const commonTokens = {
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif`,
    fontSize: 14,
    h1: { fontSize: '3rem', fontWeight: 700 },
    h2: { fontSize: '2.25rem', fontWeight: 700 },
    h3: { fontSize: '1.75rem', fontWeight: 700 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { textTransform: 'none', fontWeight: 500 },
    caption: { fontSize: '0.75rem' },
  },
  shape: { borderRadius: 10 },
  spacing: 8,
  shadows: Array(25).fill('0px 2px 6px rgba(0, 0, 0, 0.06)') as string[],
  breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1536 } },
}

export const createCustomTheme = (mode: PaletteMode) => {
  const palette = {
    mode,
    primary: {
      main: '#1666ef',
      light: '#5b9cfd',
      dark: '#0f3e9c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8e24aa',
      light: '#c158dc',
      dark: '#5a0074',
      contrastText: '#ffffff',
    },
    error: { main: '#D32F2F', contrastText: '#ffffff' },
    warning: { main: '#FFA000', contrastText: '#212121' },
    info: { main: '#0288D1', contrastText: '#ffffff' },
    success: { main: '#43A047', contrastText: '#ffffff' },
    ...(mode === 'light'
      ? {
          background: { default: '#f5f7fd', paper: '#ffffff' },
          text: { primary: '#101526', secondary: '#525a70', disabled: '#9AA1B2' },
          divider: '#e2e5ec',
          grey: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
        }
      : {
          background: { default: '#111827', paper: '#1f2937' },
          text: { primary: '#e5eaf2', secondary: '#b3b8c4', disabled: '#6c7586' },
          divider: 'rgba(255,255,255,0.12)',
          grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
        }),
  }

  const base = createTheme({ palette, ...commonTokens })

  return createTheme(base, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: base.palette.background.default },
        },
      },
      MuiButton: {
        styleOverrides: { root: { borderRadius: 8, fontWeight: 500 } },
      },
      MuiPaper: {
        styleOverrides: { root: { borderRadius: 10 } },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: base.palette.background.paper,
            color: base.palette.text.primary,
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundColor: base.palette.background.paper },
        },
      },
    },
  })
}
