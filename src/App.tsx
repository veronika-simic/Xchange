import { CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection/HeroSection'
import ExchangeRatesPage from './pages/ExchangeRatesPage'
import ConverterPage from './pages/ConverterPage'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
