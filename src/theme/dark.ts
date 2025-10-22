import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82B1FF',
      light: '#BEE3FF',
      dark: '#1A3C6E'
    },
    secondary: {
      main: '#FF8A65'
    },
    background: {
      default: '#121212',
      paper: '#1E1E2F'
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0'
    }
  }
})

export default darkTheme
