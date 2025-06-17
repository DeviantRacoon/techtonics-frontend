// File: /components/layout/AuthLayout.tsx
import React from 'react'
import { Box, useTheme } from '@mui/material'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme()

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      px={2}
      sx={{ background: theme.palette.background.default, transition: 'all 0.3s ease-in-out' }}>
      {children}
    </Box>
  )
}