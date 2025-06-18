import { useMemo } from 'react'

import { IMenuItem } from '@/common/models'

import { modulesList } from '@/config/routes'
import { getCurrentUser } from '@/common/utils'

export function useDrawerContent() {
  const menuItems: IMenuItem[] = useMemo(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) return []

    const modules = modulesList.filter(item => !item.submenu && (currentUser?.allowedPermissions.includes(item.permission ?? '') || item.permission === 'dashboard'))
    const subModules = modulesList.filter(item => item.submenu && item.submenu.some(sub => currentUser?.allowedPermissions.includes(sub.permission ?? '')))

    return [...modules, ...subModules]
  }, [])

  return {
    menuItems
  }
}
