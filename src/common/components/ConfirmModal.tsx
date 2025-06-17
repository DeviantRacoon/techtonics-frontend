'use client'

import React from 'react'
import {
  Typography,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material'

import InfoOutlineIcon from '@mui/icons-material/InfoOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import Modal from './Modal'
import SmartButton from './SmartButton'

type ConfirmModalVariant = 'info' | 'warning' | 'success' | 'error'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
  variant?: ConfirmModalVariant
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  message = '¿Estás seguro de que deseas continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
  variant = 'info',
}: ConfirmModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const getIcon = () => {
    switch (variant) {
      case 'warning':
        return <WarningAmberIcon sx={{ fontSize: 60, color: theme.palette.warning.main }} />
      case 'success':
        return <CheckCircleOutlineIcon sx={{ fontSize: 60, color: theme.palette.success.main }} />
      case 'error':
        return <ErrorOutlineIcon sx={{ fontSize: 60, color: theme.palette.error.main }} />
      default:
        return <InfoOutlineIcon sx={{ fontSize: 60, color: theme.palette.info.main }} />
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" noIconClose>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box>{getIcon()}</Box>

          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {message}
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Stack direction={isMobile ? 'column' : 'row'} spacing={1} justifyContent="flex-end">
          <SmartButton
            label={cancelText}
            variant="outlined"
            onClick={onClose}
            loading={loading}
            fullWidth={isMobile}
          />
          <SmartButton
            label={confirmText}
            variant="contained"
            onClick={onConfirm}
            loading={loading}
            fullWidth={isMobile}
            sx={!isMobile ? { flex: 1 } : undefined}
          />
        </Stack>
      </Stack>
    </Modal>
  )
}
