import ControlsBar from '../components/ExchangeRates/ControlsBar'
import RatesTable from '../components/ExchangeRates/RatesTable'
import { useState, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import HeroSection from '../components/HeroSection/HeroSection'
import { Container } from '@mui/material'

export default function ExchangeRatesPage() {
  const [baseCurrency, setBaseCurrency] = useState('GBP')
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())

  const controlsRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <HeroSection scrollToRef={controlsRef} />
      <Container>
        <div ref={controlsRef}>
          <ControlsBar
            baseCurrency={baseCurrency}
            onCurrencyChange={setBaseCurrency}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        <RatesTable
          baseCurrency={baseCurrency}
          selectedDate={selectedDate?.format('YYYY-MM-DD') || ''}
        />
      </Container>
    </>
  )
}
