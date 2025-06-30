import { useAuthStore } from '../store'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const clearUser = useAuthStore((s) => s.clearUser)
  const hasHydrated = useAuthStore((s) => s.hasHydrated)

  return { user, setUser, clearUser, hasHydrated }
}
