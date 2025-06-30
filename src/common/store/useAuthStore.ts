import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUserLogin } from '../models'

interface AuthState {
  user: IUserLogin | null
  hasHydrated: boolean
  setUser: (user: IUserLogin | null) => void
  clearUser: () => void
  setHydrated: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
)
