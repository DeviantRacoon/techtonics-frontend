import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullscreen?: boolean
  animationSpeed?: number
  noIconClose?: boolean
}
