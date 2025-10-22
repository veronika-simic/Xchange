import { createContext } from 'react'
import type { ColorContextSchema } from './types'

export const ColorContext = createContext<ColorContextSchema>({} as ColorContextSchema)
