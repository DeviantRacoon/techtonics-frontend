import { useEffect, useState } from 'react'

export function useSidebarState(defaultOpen = true) {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('sidebarOpen') : null
    if (stored !== null) {
      setOpen(stored === 'true')
    }
  }, [])

  const toggle = () => {
    setOpen(prev => {
      const next = !prev
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarOpen', next ? 'true' : 'false')
      }
      return next
    })
  }

  return { open, toggle }
}
