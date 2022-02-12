import { ThemeVariables } from 'types'

export const setCSSVariables = (theme: ThemeVariables): void => {
  Object.keys(theme).forEach((key: string) => {
    document.documentElement.style.setProperty(`--${key}`, theme[key] as string)
  })
}
