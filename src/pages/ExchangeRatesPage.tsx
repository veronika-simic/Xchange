import { Container, Paper } from '@mui/material'
import ControlsBar from '../components/ExchangeRates/ControlsBar'
import RatesTable from '../components/ExchangeRates/RatesTable'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import HeroSection from '../components/HeroSection/HeroSection'

export default function ExchangeRatesPage() {
  const [baseCurrency, setBaseCurrency] = useState('GBP')
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())

  return (
    <Container>
      <HeroSection />
      <Paper sx={{ p: 3, borderRadius: 4, mb: 6 }}>
        <ControlsBar
          baseCurrency={baseCurrency}
          onCurrencyChange={setBaseCurrency}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <RatesTable
          baseCurrency={baseCurrency}
          selectedDate={selectedDate?.format('YYYY-MM-DD') || ''}
        />
      </Paper>
    </Container>
  )
}
