'use client';

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import SearchActivator from '../SearchBar/SearchActivator';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle'
import MenuIcon from '@mui/icons-material/Menu'

export default function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      role="navigation"
      elevation={scrolled ? 1 : 0}
      sx={{
        backgroundColor: scrolled
          ? theme.palette.background.paper
          : 'transparent',
        zIndex: 10,

        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 1px 4px rgba(0,0,0,0.05)' : 'none',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
        width: { sm: 'calc(100% - 83px)', md: 'calc(100% - 65px)' },
      }}>
      <Toolbar
        disableGutters
        sx={{ justifyContent: 'space-between', minHeight: 64, px: 2, zIndex: 10 }}>
        {isMobile && (
          <IconButton onClick={onMenuClick} sx={{ mr: 1, color: theme.palette.text.primary }}>
            <MenuIcon />
          </IconButton>
        )}
        <SearchActivator />
        <ThemeToggle />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
