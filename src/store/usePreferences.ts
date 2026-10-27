import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CalculatorId } from '../lib/calculations'
type Preferences = {
  favorites: CalculatorId[]
  compact: boolean
  toggleFavorite: (id: CalculatorId) => void
  toggleCompact: () => void
  clear: () => void
}
export const usePreferences = create<Preferences>()(
  persist(
    (set) => ({
      favorites: [],
      compact: false,
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((x) => x !== id)
            : [...s.favorites, id],
        })),
      toggleCompact: () => set((s) => ({ compact: !s.compact })),
      clear: () => set({ favorites: [], compact: false }),
    }),
    { name: 'calcula-preferencias' },
  ),
)
