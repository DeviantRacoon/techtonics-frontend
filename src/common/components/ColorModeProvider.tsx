'use client'

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { PaletteMode, ThemeProvider } from '@mui/material'
import { createCustomTheme } from '@/config/theme'

interface ColorModeContextProps {
  mode: PaletteMode
  toggleColorMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextProps>({
  mode: 'light',
  toggleColorMode: () => {}
})

export default function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light')

  useEffect(() => {
    const stored = localStorage.getItem('colorMode') as PaletteMode | null
    if (stored) {
      setMode(stored)
    }
  }, [])

  const toggleColorMode = useCallback(() => {
    setMode(prev => {
      const newMode = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('colorMode', newMode)
      return newMode
    })
  }, [])

  const theme = useMemo(() => createCustomTheme(mode), [mode])

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
