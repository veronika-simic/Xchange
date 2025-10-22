import { useState } from 'react'
import { Card, CardContent, Box, TextField, MenuItem, IconButton, Typography } from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { useGetCurrenciesQuery, useGetExchangeRatesQuery } from '../features/api/apiSlice'

export default function ConverterCard() {
  const [amount, setAmount] = useState('1.00')
  const [from, setFrom] = useState('GBP')
  const [to, setTo] = useState('EUR')

  const {
    data: currencies = [],
    isLoading: loadingCurrencies,
    error: currenciesError
  } = useGetCurrenciesQuery()

  const { data: rates, isLoading: loadingRates, error: ratesError } = useGetExchangeRatesQuery(from)

  const handleSwapCurrencies = () => {
    setFrom((prevFrom) => {
      setTo(prevFrom)
      return to
    })
  }

  let resultText = ''
  if (rates && !loadingRates) {
    const fromLower = from.toLowerCase()
    const toLower = to.toLowerCase()

    if (fromLower === 'gbp') {
      resultText = `${amount} ${from} = ${(Number(amount) * rates[toLower]).toFixed(4)} ${to}`
    } else if (toLower === 'gbp') {
      resultText = `${amount} ${from} = ${(Number(amount) / rates[fromLower]).toFixed(4)} ${to}`
    } else {
      const converted = (Number(amount) / rates[fromLower]) * rates[toLower]
      resultText = `${amount} ${from} = ${converted.toFixed(4)} ${to}`
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Card
        sx={{
          width: { xs: '90%', sm: '70%', md: '50%' },
          borderRadius: 4,
          boxShadow: 2
        }}
      >
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

            {loadingCurrencies ? (
              <Typography>Loading currencies...</Typography>
            ) : currenciesError ? (
              <Typography color="error">Failed to load currency list</Typography>
            ) : (
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
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  sx={{ flex: 1 }}
                >
                  {currencies.map((cur) => (
                    <MenuItem key={cur} value={cur}>
                      {cur}
                    </MenuItem>
                  ))}
                </TextField>

                <IconButton
                  onClick={handleSwapCurrencies}
                  disabled={loadingRates || loadingCurrencies}
                >
                  <SwapHorizIcon />
                </IconButton>

                <TextField
                  select
                  label="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  sx={{ flex: 1 }}
                >
                  {currencies.map((cur) => (
                    <MenuItem key={cur} value={cur}>
                      {cur}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            )}

            {loadingRates ? (
              <Typography>Loading exchange rate...</Typography>
            ) : ratesError ? (
              <Typography color="error">Failed to load exchange rate</Typography>
            ) : (
              <Typography sx={{ mt: 1 }}>{resultText}</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
