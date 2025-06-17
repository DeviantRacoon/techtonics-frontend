'use client'

import React from 'react'
import Link from 'next/link'
import {
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import SearchIcon from '@mui/icons-material/Search'
import { usePathname } from 'next/navigation'

import SidebarLogo from './SidebarLogo'
import { useSidebarSections } from './useSidebarSections'

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const pathname = usePathname()
  const sections = useSidebarSections()
  const width = open ? 240 : 72

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onToggle}
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.shortest,
          }),
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent={open ? 'space-between' : 'center'} px={1.5} py={1.5}>
        <SidebarLogo expanded={open} />
        {!isMobile && (
          <IconButton onClick={onToggle} size="small">
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </Box>

      {open && (
        <Box px={2} pb={1}>
          <TextField
            placeholder="Buscar..."
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      <Divider />

      {sections.map(section => (
        <Box key={section.subheader} mt={1}>
          {open && (
            <Typography variant="overline" color="text.secondary" sx={{ px: 2, mb: 0.5 }}>
              {section.subheader}
            </Typography>
          )}
          <List disablePadding>
            {section.items.map(item => {
              const active = pathname.startsWith(item.link)
              return (
                <Link key={item.label} href={item.link} passHref legacyBehavior>
                  <ListItemButton
                    selected={active}
                    sx={{
                      justifyContent: open ? 'flex-start' : 'center',
                      px: 2,
                      minHeight: 40,
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.action.selected,
                        fontWeight: theme.typography.fontWeightMedium,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
                      {item.badgeContent != null ? (
                        <Badge badgeContent={item.badgeContent} color="secondary">
                          {item.icon}
                        </Badge>
                      ) : (
                        item.icon
                      )}
                    </ListItemIcon>
                    {open && <ListItemText primary={item.label} />}
                  </ListItemButton>
                </Link>
              )
            })}
          </List>
        </Box>
      ))}
    </Drawer>
  )
}
