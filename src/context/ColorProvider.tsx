import React, { useState, useMemo, type ReactNode } from 'react'

import type { ColorMode } from './types'
import { ColorContext } from './Colorcontext'

interface ColorProviderProps {
  children: ReactNode
}

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ColorMode>('light')

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const value = useMemo(
    () => ({
      toggleColorMode,
      currentColorMode: mode
    }),
    [mode]
  )

  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
}
