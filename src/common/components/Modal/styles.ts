import { Theme } from '@mui/material/styles'

export const backdropStyle = (theme: Theme): React.CSSProperties => ({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: theme.zIndex.modal,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem'
})

export const contentStyle = (
  theme: Theme,
  width: string | number
): React.CSSProperties => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  width,
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  padding: '1rem'
})