import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Typography,
  Box
} from '@mui/material'
import { useGetExchangeRatesQuery } from '../../features/api/apiSlice'
import { getLast7Dates } from '../../utils/dates'

interface RatesTableProps {
  baseCurrency: string
  selectedDate: string
}

const currenciesToShow = ['USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR']

export default function RatesTable({ baseCurrency, selectedDate }: RatesTableProps) {
  const last7Dates = getLast7Dates(selectedDate)

  const queries = last7Dates.map((date) => useGetExchangeRatesQuery({ base: baseCurrency, date }))

  const isLoading = queries.some((q) => q.isLoading)
  const isError = queries.some((q) => q.error)

  if (isLoading)
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading 7-day exchange rates...</Typography>
      </Box>
    )

  if (isError)
    return (
      <Typography color="error" textAlign="center" sx={{ py: 4 }}>
        Failed to load exchange rate history.
      </Typography>
    )

  return (
    <Table sx={{ minWidth: 600 }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: 'primary.main' }}>
          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Currency</TableCell>
          {last7Dates.map((d) => (
            <TableCell key={d} sx={{ color: 'white', fontWeight: 500 }} align="center">
              {d}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {currenciesToShow.map((cur) => (
          <TableRow key={cur} hover>
            <TableCell sx={{ fontWeight: 500 }}>{cur}</TableCell>
            {queries.map((q, i) => (
              <TableCell key={last7Dates[i]} align="center">
                {q.data ? (q.data[cur.toLowerCase()]?.toFixed(4) ?? '-') : '-'}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
