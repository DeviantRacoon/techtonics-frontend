/**
 * SmartButton - Botón reutilizable basado en MUI
 * 
 * Funcionalidades:
 * - El texto (`label`) se usa también como ID único (kebab-case).
 * - Soporte para `variant`, `size`, `fullWidth`, `disabled`, `hidden`.
 * - Ícono decorativo a la izquierda (`leftIcon`).
 * - Estado de `loading` con spinner integrado.
 * - Accesible, semántico, limpio y optimizado.
 * 
 * Props:
 * @param label        Texto mostrado en el botón (también se usa para generar el ID)
 * @param onClick      Función al hacer clic
 * @param variant      Estilo visual del botón ('contained' | 'outlined' | 'text')
 * @param size         Tamaño del botón ('small' | 'medium' | 'large')
 * @param type         Tipo de botón (opcional, por defecto 'button')
 * @param fullWidth    Si el botón debe ocupar todo el ancho
 * @param disabled     Desactiva el botón
 * @param hidden       Oculta el botón visualmente (pero mantiene accesibilidad)
 * @param loading      Muestra un spinner mientras está activo
 * @param leftIcon     Ícono opcional a la izquierda del texto
 * @param flex         Si el botón debe ser flexible (opcional)
 */

import { Button, CircularProgress } from '@mui/material'
import { useId } from 'react'
import React from 'react'

interface SmartButtonProps {
  label: string
  onClick?: () => void
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  disabled?: boolean
  hidden?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  sx?: React.CSSProperties
}

function SmartButton({
  label,
  onClick,
  variant = 'contained',
  size = 'medium',
  type = 'button',
  fullWidth = true,
  disabled = false,
  hidden = false,
  loading = false,
  leftIcon,
  sx = {},
}: SmartButtonProps) {
  const autoId = useId()
  const generatedId = label.toLowerCase().replace(/\s+/g, '-') || autoId

  return (
    <Button
      id={generatedId}
      aria-label={label}
      variant={variant}
      size={size}
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={leftIcon}
      disableElevation
      sx={{ mt: 2, visibility: hidden ? 'hidden' : 'visible', ...sx }}>
      {loading ? <CircularProgress size={22} color="inherit" /> : label}
    </Button>
  )
}

export default React.memo(SmartButton)
