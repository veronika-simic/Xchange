import { IconButton, useTheme } from '@mui/material'
import DarkIcon from '@mui/icons-material/Brightness4'
import LightIcon from '@mui/icons-material/Brightness7'
import React, { useContext } from 'react'
import { ColorContext } from '../../models/ColorContext'

export default function SwitchModeButton() {
  const theme = useTheme()
  const colorMode = useContext(ColorContext)
  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <LightIcon /> : <DarkIcon />}
    </IconButton>
  )
}
