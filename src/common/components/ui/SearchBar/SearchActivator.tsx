'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CommandDialog from './CommandDialog'

export default function SearchActivator() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)

  const isMac = useMemo(() => typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform), [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
          borderRadius: 1,
          px: 2,
          py: 1,
          minWidth: 180,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
          backgroundColor: theme.palette.background.paper,
          cursor: 'pointer',
          zIndex: 1,
          transition: 'all 0.25s ease',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transform: 'scale(1.01)',
          },
        }}
      >
        <SearchIcon fontSize="small" color="action" />
        <Typography
          variant="body2"
          color={theme.palette.text.disabled}
          sx={{ flexGrow: 1, fontSize: 13 }}
        >
          {isMobile ? 'Buscar' : 'Buscar...'}
        </Typography>
        {!isMobile && (
          <Box
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontSize: 11,
              color: theme.palette.text.disabled,
              zIndex: 1,
            }}
          >
            {isMac ? '⌘ K' : 'Ctrl K'}
          </Box>
        )}
      </Box>

      <CommandDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
