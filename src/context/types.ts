export type ColorMode = 'light' | 'dark'

export interface ColorContextSchema {
  toggleColorMode: () => void
  currentColorMode: ColorMode
}
