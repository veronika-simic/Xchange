import { CssBaseline } from '@mui/material'
import HeroSection from './components/HeroSection/HeroSection'
import ConverterCard from './components/ConverterCard/ConverterCard'
import ExchangeRatesPage from './pages/ExchangeRatesPage'
function App() {
  return (
    <>
      <CssBaseline enableColorScheme />
      /<HeroSection />/
      <ConverterCard />
      <ExchangeRatesPage />
    </>
  )
}

export default App
