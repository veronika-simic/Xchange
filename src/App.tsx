import { createTheme, CssBaseline, ThemeProvider, type PaletteMode } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection/HeroSection'
import ExchangeRatesPage from './pages/ExchangeRatesPage'
import ConverterPage from './pages/ConverterPage'
import { useMemo, useState } from 'react'
import lightTheme from './theme/light'
import darkTheme from './theme/dark'
import { ColorContext } from './models/ColorContext'
function App() {
  const [mode, setMode] = useState<PaletteMode>('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme : darkTheme), [mode])
  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ExchangeRatesPage />
              </>
            }
          />
          <Route path="/converter" element={<ConverterPage />} />
        </Routes>
      </ThemeProvider>
    </ColorContext.Provider>
  )
}

export default App
