import { createTheme, CssBaseline, ThemeProvider, type PaletteMode } from '@mui/material'
import { Routes, Route, Outlet } from 'react-router-dom'
import ExchangeRatesPage from './pages/ExchangeRatesPage'
import ConverterPage from './pages/ConverterPage'
import { useMemo, useState } from 'react'
import lightTheme from './theme/light'
import darkTheme from './theme/dark'
import { ColorContext } from './models/ColorContext'
import NotFoundPage from './pages/NotFoundPage'
import NavigationBar from './components/Navigation/NavigationBar'
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
            element={
              <>
                <NavigationBar />
                <Outlet />
              </>
            }
          >
            <Route path="/" element={<ExchangeRatesPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/converter" element={<ConverterPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorContext.Provider>
  )
}

export default App
