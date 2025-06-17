// components/Sidebar/MenuItem.tsx
'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'
import { Box, Collapse, List, ListItemText, Tooltip } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { motion } from 'framer-motion'

import { NavLinkStyled, SubMenuArrow } from './styles'

interface SubmenuItem {
  label: string
  link: string
}

interface MenuItemProps {
  item: {
    label: string
    icon: React.ReactElement
    link?: string
    submenu?: SubmenuItem[]
  }
  pathname: string
  expanded: boolean
  openSubmenus: Record<string, boolean>
  toggleSubmenu: (label: string) => void
}

export default function MenuItem({ item, pathname, expanded, openSubmenus, toggleSubmenu }: MenuItemProps) {
  const isActive = (link?: string) => link && pathname.startsWith(link)
  const isOpen = openSubmenus[item.label] ?? false
  const active = isActive(item.link)

  if (item.submenu) {
    return (
      <Fragment>
        <NavLinkStyled onClick={() => toggleSubmenu(item.label)} className={active ? 'active' : ''}>
          {item.icon}
          {expanded ? (
            <>
              <ListItemText primary={item.label} />
              <SubMenuArrow as={motion.span} animate={{ rotate: isOpen ? 180 : 0 }}>
                <ExpandMore />
              </SubMenuArrow>
            </>
          ) : (
            <Tooltip title={item.label} placement="right">
              <Box component="span" />
            </Tooltip>
          )}
        </NavLinkStyled>

        <Collapse in={isOpen && expanded} timeout={300} unmountOnExit sx={{ pl: 4 }}>
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <List disablePadding>
              {item.submenu.map((sub) => (
                <Link key={sub.label} href={sub.link} passHref legacyBehavior>
                  <NavLinkStyled className={isActive(sub.link) ? 'active' : ''}>
                    {expanded && <ListItemText primary={sub.label} />}
                  </NavLinkStyled>
                </Link>
              ))}
            </List>
          </motion.div>
        </Collapse>
      </Fragment>
    )
  }

  return (
    <Link key={item.label} href={item.link || '#'} passHref legacyBehavior>
      <NavLinkStyled className={active ? 'active' : ''}>
        {item.icon}
        {expanded ? (
          <ListItemText primary={item.label} />
        ) : (
          <Tooltip title={item.label} placement="right">
            <Box component="span" />
          </Tooltip>
        )}
      </NavLinkStyled>
    </Link>
  )
}
