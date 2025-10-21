import { Box, Paper, Typography } from '@mui/material'

export default function ExchangeRatesPage() {
  return (
    <Box sx={{ py: 6 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        color="primary.main"
        sx={{ mb: 4, textAlign: 'center' }}
      >
        Exchange Rates History
      </Typography>

      {/* Controls: base currency, date, manage currencies */}

      {/* Table */}
      <Paper sx={{ mt: 6, p: 2, overflowX: 'auto' }}></Paper>
    </Box>
  )
}
