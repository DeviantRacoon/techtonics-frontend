'use client'

import React from 'react'
import {
  Typography,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Box,
  Card,
  CardHeader
} from '@mui/material'


import { Modal, SmartButton } from '@/common/components'

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

export default function ModalCutOffView({ isOpen, onClose, }: { isOpen: boolean, onClose: () => void }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))


  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" noIconClose>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              Realizar el corte de jornada
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ¿Estas seguro de realizar el corte de jornada?
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }} alignItems="center">
          <Stack padding={2} spacing={2} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 1, width: "100%" }}>
            <Card>
              <Typography variant="h6" fontWeight={700} color="text.primary">
                Corte de jornada
              </Typography>
            </Card>
          </Stack>
          <Stack width={"100%"}>

          </Stack>
        </Stack>

        <Divider />

        <Stack direction={isMobile ? 'column' : 'row'} spacing={1} justifyContent="flex-end">
          <SmartButton
            label="Cancelar"
            variant="outlined"
            onClick={onClose}
            // loading={loading}
            fullWidth={isMobile}
          />
          <SmartButton
            label="Confirmar"
            variant="contained"
            // onClick={onConfirm}
            // loading={loading}
            fullWidth={isMobile}
            sx={!isMobile ? { flex: 1 } : undefined}
          />
        </Stack>
      </Stack>
    </Modal>
  )
}
