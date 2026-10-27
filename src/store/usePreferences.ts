import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CalculatorId } from '../lib/calculations'
type Preferences = {
  favorites: CalculatorId[]
  compact: boolean
  theme: 'light' | 'dark'
  toggleFavorite: (id: CalculatorId) => void
  toggleCompact: () => void
  toggleTheme: () => void
  clear: () => void
}
export const usePreferences = create<Preferences>()(
  persist(
    (set) => ({
      favorites: [],
      compact: false,
      theme: 'light',
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((x) => x !== id)
            : [...s.favorites, id],
        })),
      toggleCompact: () => set((s) => ({ compact: !s.compact })),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      clear: () => set({ favorites: [], compact: false }),
    }),
    { name: 'calcula-preferencias' },
  ),
)
