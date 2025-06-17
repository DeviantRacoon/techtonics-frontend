import { useMemo } from 'react'

import { IMenuItem } from '@/common/models'

import { modulesList } from '@/config/routes'
import { getCurrentUser } from '@/common/utils'

export function useDrawerContent() {
  const menuItems: IMenuItem[] = useMemo(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) return []

    return modulesList.filter(item => currentUser?.allowedPermissions.includes(item.permission ?? '') || item.permission === 'dashboard')
  }, [])

  return {
    menuItems
  }
}
