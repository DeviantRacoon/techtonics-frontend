'use client'

import React from 'react'
import Link from 'next/link'
import { Box, Tooltip, IconButton, Stack, useTheme } from '@mui/material'
import { SettingsOutlined, HelpOutline, Logout } from '@mui/icons-material'

interface SidebarFooterProps {
  expanded: boolean
}

export default function SidebarFooter({ expanded }: SidebarFooterProps) {
  const theme = useTheme()

  const actions = [
    { label: 'Ayuda', icon: <HelpOutline />, href: '/help' },
    { label: 'Configuración', icon: <SettingsOutlined />, href: '/settings' },
    { label: 'Salir', icon: <Logout />, href: '/logout' },
  ]

  return (
    <Stack direction="row" spacing={1} sx={{ px: 1, pb: 2, pt: 1 }}>
      {actions.map(action => (
        <Link href={action.href} key={action.label} passHref legacyBehavior>
          <Tooltip title={!expanded ? action.label : ''} placement="right">
            <IconButton
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                transition: 'color 0.3s',
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              {action.icon}
              {expanded && (
                <Box
                  component="span"
                  sx={{ ml: 1, fontSize: 14, fontWeight: 500 }}
                >
                  {action.label}
                </Box>
              )}
            </IconButton>
          </Tooltip>
        </Link>
      ))}
    </Stack>
  )
}
