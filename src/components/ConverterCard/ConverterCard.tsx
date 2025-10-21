import { useEffect, useState, useCallback } from 'react'
import {
  Card,
  CardContent,
  Box,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Typography
} from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

export default function ConverterCard() {
  const [amount, setAmount] = useState('1.00')
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [currencies, setCurrencies] = useState<string[]>([]) // all available currency codes
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Fetch the list of available currencies for the dropdown
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch(
          'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json'
        )
        if (!res.ok) throw new Error('Failed to fetch currencies')
        const data = await res.json()
        const codes = Object.keys(data)
          .map((c) => c.toUpperCase())
          .sort()
        setCurrencies(codes)
        // set default values AFTER currencies are loaded
        setFromCurrency('GBP')
        setToCurrency('EUR')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setResult('Something went wrong while fetching exchange rates')
      }
    }
    fetchCurrencies()
  }, [])

  // Swap the selected currencies
  const handleSwapCurrencies = () => {
    setFromCurrency((prevFrom) => {
      setToCurrency(prevFrom)
      return toCurrency
    })
  }

  // Fetch exchange rate and calculate result using GBP as base
  const getExchangeRate = useCallback(async () => {
    const numericAmount = parseFloat(amount)
    if (Number.isNaN(numericAmount)) {
      setResult('Enter a valid number')
      return
    }
    if (!fromCurrency || !toCurrency) return

    const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${today}/v1/currencies/gbp.json`

    setIsLoading(true)
    setResult('')

    try {
      const res = await fetch(apiUrl)
      if (!res.ok) throw new Error('Failed to fetch exchange rate')
      const data = await res.json()
      const rates = data.gbp

      const from = fromCurrency.toLowerCase()
      const to = toCurrency.toLowerCase()

      let converted = 0
      if (from === 'gbp') {
        converted = numericAmount * rates[to]
      } else if (to === 'gbp') {
        converted = numericAmount / rates[from]
      } else {
        converted = (numericAmount / rates[from]) * rates[to]
      }

      setResult(`${numericAmount} ${fromCurrency} = ${converted.toFixed(4)} ${toCurrency}`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setResult('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [amount, fromCurrency, toCurrency])

  // Initial conversion on mount when currencies are loaded
  useEffect(() => {
    if (fromCurrency && toCurrency) getExchangeRate()
  }, [fromCurrency, toCurrency, getExchangeRate])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getExchangeRate()
  }

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}
    >
      <Card sx={{ width: { xs: '90%', sm: '70%', md: '50%' }, borderRadius: 4, boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ display: 'grid', gap: 3 }}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              InputProps={{
                inputProps: { min: 0, step: 'any' }
              }}
            />

            {currencies.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <TextField
                  select
                  label="From"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  sx={{ flex: 1 }}
                >
                  {currencies.map((cur) => (
                    <MenuItem key={cur} value={cur}>
                      {cur}
                    </MenuItem>
                  ))}
                </TextField>

                <IconButton onClick={handleSwapCurrencies} disabled={isLoading}>
                  <SwapHorizIcon />
                </IconButton>

                <TextField
                  select
                  label="To"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  sx={{ flex: 1 }}
                >
                  {currencies.map((cur) => (
                    <MenuItem key={cur} value={cur}>
                      {cur}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            ) : (
              <Typography>Loading currencies...</Typography>
            )}

            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
              {isLoading ? 'Getting exchange rate...' : 'Convert'}
            </Button>

            <Typography sx={{ mt: 1 }}>{result}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
