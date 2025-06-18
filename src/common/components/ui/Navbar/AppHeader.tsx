'use client';

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  useTheme,
} from '@mui/material';

import SearchActivator from '../SearchBar/SearchActivator';
import UserMenu from './UserMenu';

export default function AppHeader() {
  const theme = useTheme();
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
        width: { sm: 'calc(100% - 83px)', md: 'calc(100% - 70px)' },
      }}>
      <Toolbar
        disableGutters
        sx={{ justifyContent: 'space-between', minHeight: 64, px: 2, zIndex: 10 }}>
        <SearchActivator />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
