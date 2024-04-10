import type { ThemeSetting } from '.'
import { defaultThemeSetting } from './theme-data'

export const storeThemeSetting = (autoSaveId: string, newThemeSetting: ThemeSetting): void => {
  window.localStorage.setItem(autoSaveId, JSON.stringify(newThemeSetting))
}

export const restoreThemeSetting = (autoSaveId?: string): ThemeSetting => {
  if (autoSaveId) {
    const storage = window.localStorage.getItem(autoSaveId)

    if (storage) {
      return JSON.parse(storage) as ThemeSetting
    }
  }

  return defaultThemeSetting
}
