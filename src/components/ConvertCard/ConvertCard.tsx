import { Card, CardContent, Box, TextField, MenuItem, Button } from '@mui/material'
import { useState } from 'react'

const currencies = ['GBP', 'USD', 'EUR', 'JPY', 'CAD', 'AUD']

export default function ConverterCard() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('GBP')
  const [toCurrency, setToCurrency] = useState('USD')

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 3,
        mt: { xs: -10, md: -24 }
      }}
    >
      <Card
        sx={{
          width: { xs: '90%', sm: '70%', md: '50%' },
          borderRadius: 4,
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
          backgroundColor: 'white'
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gap: 4
            }}
          >
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />

            {/* From Currency */}
            <TextField
              select
              label="From"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              fullWidth
            >
              {currencies.map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </TextField>

            {/* To Currency */}
            <TextField
              select
              label="To"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              fullWidth
            >
              {currencies.map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </TextField>

            {/* Convert Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 600,
                borderRadius: '9999px',
                textTransform: 'none'
              }}
              fullWidth
            >
              Convert
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
