'use client'

import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, IconButton, Typography, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import InfoIcon from '@mui/icons-material/Info'

type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  variant?: ToastVariant
  duration?: number
}

interface ToastContextProps {
  show: (message: string, options?: ToastOptions, errors?: string[]) => void
  close: () => void
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<{ title: string, errors?: string[] }>({
    title: '',
    errors: [],
  })
  const [variant, setVariant] = useState<'loading' | ToastVariant>('loading')

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const transitionRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (transitionRef.current) clearTimeout(transitionRef.current)
    timerRef.current = null
    transitionRef.current = null
  }

  const show = useCallback((msg: string, options?: ToastOptions, errors?: string[],) => {
    clearTimers()

    setMessage({
      title: msg,
      errors,
    })
    setVariant('loading')
    setOpen(true)

    transitionRef.current = setTimeout(() => {
      setVariant(options?.variant || 'info')
    }, 250)

    timerRef.current = setTimeout(() => {
      setOpen(false)
    }, (options?.duration || 3000))
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    clearTimers()
  }, [])

  const renderIcon = (currentVariant: 'loading' | ToastVariant) => {
    if (currentVariant === 'loading') return <CircularProgress size={20} thickness={5} />
    switch (currentVariant) {
      case 'success':
        return <CheckCircleIcon color="success" fontSize="small" />
      case 'error':
        return <ErrorIcon color="error" fontSize="small" />
      case 'warning':
        return <WarningAmberIcon color="warning" fontSize="small" />
      case 'info':
      default:
        return <InfoIcon color="info" fontSize="small" />
    }
  }

  const getBorderColor = (currentVariant: 'loading' | ToastVariant) => {
    switch (currentVariant) {
      case 'success':
        return 'success.main'
      case 'error':
        return 'error.main'
      case 'warning':
        return 'warning.main'
      case 'loading':
        return 'info.main'
      case 'info':
      default:
        return 'info.main'
    }
  }

  return (
    <ToastContext.Provider value={{ show, close }}>
      {children}

      <AnimatePresence>
        {open && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            sx={{ position: 'fixed', top: 80, right: 16, zIndex: 1400 }}>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'background.paper',
                borderLeft: 4,
                borderColor: getBorderColor(variant),
                px: 2,
                py: 1.5,
                boxShadow: 8,
                borderRadius: 1,
                minWidth: 300,
                maxWidth: 380,
              }}>

              <Box sx={{ position: 'relative', width: 24, height: 24 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={variant}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ position: 'absolute', top: 0, left: 0 }}>
                    {renderIcon(variant)}
                  </motion.div>
                </AnimatePresence>
              </Box>

              <Typography component="div" variant="body2" fontWeight={500} flex={1}>
                {message.title}
                <br />
                <Box component="ul" sx={{ m: 0 }}>
                  {message?.errors?.map((item, index) => (
                    <Typography
                      key={`${index}-${item}`}
                      component="li"
                      variant="caption"
                      fontWeight={200}
                      flex={1}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Typography>

              <IconButton onClick={close} size="small" sx={{ color: 'text.secondary' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  )
};

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast no se encuentra dentro de un ToastProvider')
  }
  return context
};
