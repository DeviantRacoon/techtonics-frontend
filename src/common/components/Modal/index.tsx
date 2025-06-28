'use client'

import React, { useEffect, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IconButton, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullscreen?: boolean
  animationSpeed?: number
  noIconClose?: boolean
}

/**
 * Modal
 * Componente modal accesible y animado con soporte para tamaños, fullscreen y cierre por Escape.
 * Optimizado para rendimiento y limpieza de efectos secundarios.
 */
const Modal = React.memo(function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  fullscreen = false,
  animationSpeed = 0.25,
  noIconClose = false
}: ModalProps) {
  const theme = useTheme()

  const modalWidth = useMemo(() => {
    if (fullscreen) return '100vw'
    return {
      sm: 400,
      md: 600,
      lg: 800,
      xl: 1000
    }[size] ?? 600
  }, [size, fullscreen])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mui-modal-backdrop"
          style={backdropStyle(theme)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: animationSpeed }}
            style={contentStyle(theme, modalWidth)}
          >
            {!noIconClose && (
              <IconButton
                onClick={onClose}
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
                aria-label="Cerrar modal"
              >
                <CloseIcon />
              </IconButton>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
})

export default Modal

// Estilos extraídos para evitar recreaciones en cada render
const backdropStyle = (theme: any): React.CSSProperties => ({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: theme.zIndex.modal,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  border: `1px solid ${theme.palette.divider}`
})

const contentStyle = (theme: any, width: string | number): React.CSSProperties => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  width,
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  padding: '1rem'
})