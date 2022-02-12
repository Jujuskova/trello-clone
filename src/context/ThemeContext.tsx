import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'

import themes from 'helpers/theme/themeVariables.json'
import { setCSSVariables } from 'helpers/theme'

import { ThemeContextType, ThemeName, ThemeVariables } from 'types'

export const ThemeContext = createContext<ThemeContextType>({
  themeName: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('light')
  const [theme, setTheme] = useState<ThemeVariables>(
    themes[themeName as ThemeName],
  )

  useEffect(() => {
    setCSSVariables(theme)
  }, [theme])

  const toggleTheme = useCallback((): void => {
    const newTheme = themeName === 'light' ? 'dark' : 'light'
    setThemeName(newTheme)
    setTheme(themes[newTheme])
  }, [themeName])

  const value = useMemo(
    () => ({ themeName, toggleTheme }),
    [themeName, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
