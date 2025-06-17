import { useMemo } from 'react'
import React from 'react'
import { BookOutlined, HelpOutline } from '@mui/icons-material'

import { modulesList } from '@/config/routes'
import { getCurrentUser } from '@/common/utils'

export interface NavItem {
  label: string
  link: string
  icon: React.ReactElement
  badgeContent?: string | number
}

export interface NavSection {
  subheader: string
  items: NavItem[]
}

export function useSidebarSections(): NavSection[] {
  const modules = useMemo<NavItem[]>(() => {
    const user = getCurrentUser()
    if (!user) return []

    return modulesList
      .filter(item =>
        user.allowedPermissions.includes(item.permission ?? '') || item.permission === 'dashboard'
      )
      .map(item => ({ label: item.label, link: item.link || '#', icon: item.icon }))
  }, [])

  return useMemo(() => {
    const resources: NavItem[] = [
      { label: 'Documentation', link: '/docs', icon: <BookOutlined color="primary" />, badgeContent: 'New' },
      { label: 'Help Center', link: '/help', icon: <HelpOutline color="primary" />, badgeContent: 3 },
    ]

    return [
      { subheader: 'Modules', items: modules },
      { subheader: 'Resources', items: resources },
    ]
  }, [modules])
}
