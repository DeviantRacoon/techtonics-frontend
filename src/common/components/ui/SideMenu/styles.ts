import { styled, alpha, darken, lighten } from '@mui/material/styles';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import { motion } from 'framer-motion'

export const SidebarContainer = styled(motion.aside)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';

  const baseColor = theme.palette.background.default;
  const lighter = darken(baseColor, 0.3);

  return {
    height: '100vh',
    position: 'fixed',
    left: 0,
    width: 72,
    display: 'flex',
    flexDirection: 'column',
    background: isDark
      ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`
      : `${theme.palette.background.paper}`,
    backdropFilter: 'blur(20px)',
    boxShadow: `4px 0 24px ${alpha(baseColor, 0.08)},
                0 2px 4px ${alpha(baseColor, 0.12)},
                0 4px 8px ${alpha(baseColor, 0.16)}`,

    border: `1px solid ${theme.palette.divider}`,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: 1,
      height: '100%',
      pointerEvents: 'none',
    },

    zIndex: 1101,
    overflowX: 'hidden',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  };
});

export const NavLinkStyled = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
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
  },

  '&.active': {
    backgroundImage: `linear-gradient(90deg, ${alpha(theme.palette.primary.light, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&::before': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export const SubMenuArrow = styled(motion.div)(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: '1.25rem',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.2s ease',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
