import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4A90E2',
      light: '#A3C9F1',
      dark: '#0F3D91'
    },
    secondary: {
      main: '#FF6B6B'
    },
    background: {
      default: '#F7F9FC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1F2937',
      secondary: '#4B5563'
    }
  }
})

export default lightTheme
