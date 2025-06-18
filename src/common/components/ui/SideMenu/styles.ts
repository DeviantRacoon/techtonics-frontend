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
      ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[800]} 100%)`
      : `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  backdropFilter: 'blur(16px)',
  boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
  borderRight: `1px solid ${theme.palette.divider}`,
  zIndex: 1101,
  overflowX: 'hidden',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
}));

export const NavLinkStyled = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0.5, 0),
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
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.12)
        : alpha(theme.palette.primary.main, 0.06),
    transform: 'translateX(4px)',
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
  },

  '&.active': {
    backgroundImage: `linear-gradient(90deg, ${alpha(theme.palette.primary.light, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&::before': {
      backgroundColor: theme.palette.primary.main,
    },
    boxShadow: theme.shadows[2],
  },
}));

export const SubMenuArrow = styled(motion.span)(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  transition: 'transform 0.25s ease',
}));

