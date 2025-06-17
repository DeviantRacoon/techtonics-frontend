import { styled } from '@mui/material/styles'
import { ListItemButton } from '@mui/material'
import { motion } from 'framer-motion'

export const SidebarContainer = styled(motion.aside)(({ theme }) => ({
  height: '100vh',
  position: 'fixed',
  left: 0,
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  backdropFilter: 'blur(12px)',
  boxShadow: '4px 0 20px rgba(0,0,0,0.06)',
  zIndex: 1101,
  overflowX: 'hidden',
}))

export const NavLinkStyled = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5, 2),
  gap: theme.spacing(1.5),
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 6,
    bottom: 6,
    width: 3,
    borderRadius: 3,
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(3px)',
  },
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    fontWeight: theme.typography.fontWeightMedium,
    '&::before': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

export const SubMenuArrow = styled(motion.span)(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: '1rem',
}))
