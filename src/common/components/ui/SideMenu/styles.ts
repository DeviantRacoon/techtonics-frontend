import { alpha, styled } from '@mui/material/styles'
import { ListItemButton } from '@mui/material'
import { motion } from 'framer-motion'

export const SidebarContainer = styled(motion.aside)(({ theme }) => ({
  height: '100vh',
  position: 'fixed',
  left: 0,
  width: 72,
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
  backdropFilter: 'blur(14px)',
  boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
  zIndex: 1101,
  overflowX: 'hidden',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
}));

export const NavLinkStyled = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0, 0),
  gap: theme.spacing(1.5),
  transition: 'all 0.25s ease',
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.text.secondary,

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
    transform: 'translateX(4px)',
    color: theme.palette.text.primary,
  },

  '&.active': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.15)
        : alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&::before': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export const SubMenuArrow = styled(motion.span)(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: '1rem',
  color: theme.palette.text.secondary,
}));

