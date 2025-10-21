import { Container, Typography, Paper } from '@mui/material'
import ControlsBar from '../components/ExchangeRates/ControlsBar'
import RatesTable from '../components/ExchangeRates/RatesTable'

export default function ExchangeRatesPage() {
  return (
    <Container sx={{ mt: 6, mb: 8 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        color="primary.main"
        sx={{ mb: 4, textAlign: 'center' }}
      >
        7-Day Exchange Rate History
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 4, mb: 6 }}>
        <ControlsBar />
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <RatesTable />
      </Paper>
    </Container>
  )
}
