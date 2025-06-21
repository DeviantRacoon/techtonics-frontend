import { useMemo } from 'react'

import { IMenuItem } from '@/common/models'
import { modulesList } from '@/config/routes'
import { getCurrentUser } from '@/common/utils'

export function useDrawerContent() {
  const menuItems: IMenuItem[] = useMemo(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) return []

    const hasPermission = (perm?: string) =>
      currentUser.allowedPermissions.includes(perm ?? '')

    const modules = modulesList.filter(item =>
      !item.submenu &&
      (hasPermission(item.permission) || item.permission === 'dashboard')
    )

    const subModules = modulesList
      .filter(item => Array.isArray(item.submenu))
      .map(item => {
        const filteredSubmenu = item.submenu!.filter(sub => hasPermission(sub.permission))
        return filteredSubmenu.length > 0
          ? { ...item, submenu: filteredSubmenu }
          : null
      })
      .filter(Boolean) as IMenuItem[]

    return [...modules, ...subModules]
  }, [])

  return {
    menuItems
  }
}
