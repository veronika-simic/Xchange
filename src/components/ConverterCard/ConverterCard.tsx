import { useState } from 'react'
import { Card, CardContent, Box, TextField, MenuItem, IconButton, Typography } from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { useCurrencies, useExchangeRate } from '../../hooks/api'

export default function ConverterCard() {
  const [amount, setAmount] = useState('1.00')
  const [from, setFrom] = useState('GBP')
  const [to, setTo] = useState('EUR')
  const { currencies, loading: loadingCurrencies } = useCurrencies()

  const { result, loading: loadingRate } = useExchangeRate({
    fromCurrency: from,
    toCurrency: to,
    amount: Number(amount)
  })

  // Swap the selected currencies
  const handleSwapCurrencies = () => {
    setFrom((prevFrom) => {
      setTo(prevFrom)
      return to
    })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
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
                  disabled={loadingRate || loadingCurrencies}
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
            ) : (
              <Typography>Loading currencies...</Typography>
            )}

            <Typography sx={{ mt: 1 }}>{result}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
