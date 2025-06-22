import { useMemo } from 'react'

import { IMenuItem } from '@/common/models'
import { modulesList } from '@/config/routes'

export function useDrawerContent() {
  const menuItems: IMenuItem[] = useMemo(() => {
    return modulesList
  }, [])

  return {
    menuItems
  }
}
