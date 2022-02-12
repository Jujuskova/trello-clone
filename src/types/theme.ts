export type ThemeName = 'dark' | 'light'
export type ThemeVariables = { [key: string]: string | number }
export type ThemeType = Record<ThemeName, ThemeVariables>

export type ThemeContextType = {
  themeName: ThemeName
  toggleTheme(): void
}
