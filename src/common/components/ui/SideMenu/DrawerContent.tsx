// components/Sidebar/DrawerContent.tsx
'use client'

import React, { useState, useCallback } from 'react'
import { Box, List } from '@mui/material'
import { usePathname } from 'next/navigation'

import { useDrawerContent } from './useDrawerContent'
import SidebarLogo from './SidebarLogo'
import MenuItem from './MenuItem'
import { SidebarContainer } from './styles'

export default function DrawerContent() {
  const { menuItems } = useDrawerContent()
  const pathname = usePathname()
  const [hovered, setHovered] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})

  const toggleSubmenu = useCallback((label: string) => {
    setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }))
  }, [])

  return (
    <>
      {hovered && (
        <Box
          sx={{
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            zIndex: 1100,
          }}
        />
      )}

      <SidebarContainer
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ width: hovered ? 230 : 68 }}
        transition={{ duration: 0.3 }}
      >
        <SidebarLogo expanded={hovered} />

        <Box sx={{ px: 1 }}>
          <List>
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                item={item}
                pathname={pathname}
                expanded={hovered}
                openSubmenus={openSubmenus}
                toggleSubmenu={toggleSubmenu}
              />
            ))}
          </List>
        </Box>
      </SidebarContainer>
    </>
  )
}
