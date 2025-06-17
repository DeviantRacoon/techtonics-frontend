'use client'

import React from 'react'
import { IconButton, Tooltip, useTheme } from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { useColorMode } from '@/common/hooks'

export default function ThemeToggle() {
  const { toggleColorMode, mode } = useColorMode()
  const theme = useTheme()

  return (
    <Tooltip
      title={mode === 'light' ? 'Activar modo oscuro' : 'Desactivar modo oscuro'}
    >
      <IconButton onClick={toggleColorMode} sx={{ color: theme.palette.text.primary }}>
        {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  )
}
