'use client'

import React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { useTheme, useMediaQuery } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

import DrawerContent from '../SideMenu/DrawerContent'
import AppHeader from '../Navbar/AppHeader'
import ConfirmModal from '@/common/components/ConfirmModal'
import { useSessionExpiration } from '@/common/hooks'
import { ToastProvider } from '../../ToastProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    isRenewalModalOpen,
    onRenew,
    onDismiss,
  } = useSessionExpiration()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const drawerWidth = isMobile ? 0 : 75

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <ToastProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <CssBaseline />

          {/* Menú lateral */}
          <Box component="aside" aria-label="Menú de navegación lateral">
            <DrawerContent />
          </Box>

          <AppHeader />

          {/* Contenido principal */}
          <Box
            component="main"
            role="main"
            sx={{
              flexGrow: 1,
              pt: 8,
              pl: { xs: 2, sm: `${drawerWidth + 8}px` },
              pr: 2,
              pb: 4,
              transition: 'padding-left 0.3s ease',
            }}>
            {children}
          </Box>

          {/* Modal de sesión */}
          <ConfirmModal
            isOpen={isRenewalModalOpen}
            onClose={onDismiss}
            onConfirm={onRenew}
            title="Tu sesión está por expirar"
            message="¿Deseas renovarla ahora?"
            confirmText="Renovar"
            cancelText="Cerrar"
          />

          <div id="modal-root" />
        </LocalizationProvider>
      </ToastProvider>
    </Box>
  )
}