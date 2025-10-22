import { useContext } from 'react'
import { ColorContext } from '../Colorcontext'

export const useColorMode = () => useContext(ColorContext)
