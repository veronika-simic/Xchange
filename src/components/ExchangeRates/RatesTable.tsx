import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  IconButton,
  Tooltip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useGetExchangeRatesQuery, useGetCurrenciesQuery } from '../../features/api/apiSlice'
import { getLast7Dates } from '../../utils/dates'

interface RatesTableProps {
  baseCurrency: string
  selectedDate: string
}

export default function RatesTable({ baseCurrency, selectedDate }: RatesTableProps) {
  const last7Dates = getLast7Dates(selectedDate)

  const defaultCurrencies = ['USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR']
  const [displayedCurrencies, setDisplayedCurrencies] = useState<string[]>(defaultCurrencies)

  const [newCurrency, setNewCurrency] = useState('')
  const [adding, setAdding] = useState(false)

  const queries = last7Dates.map((date) => useGetExchangeRatesQuery({ base: baseCurrency, date }))

  const isLoading = queries.some((q) => q.isLoading)
  const isError = queries.some((q) => q.error)
  const allRates = queries.map((q) => q.data)

  const { data: currencies = [], isLoading: loadingCurrencies } = useGetCurrenciesQuery()

  const handleAddCurrency = () => {
    if (newCurrency && !displayedCurrencies.includes(newCurrency)) {
      setDisplayedCurrencies([...displayedCurrencies, newCurrency])
      setNewCurrency('')
      setAdding(false)
    }
  }

  const handleRemoveCurrency = (cur: string) => {
    if (displayedCurrencies.length > 3) {
      setDisplayedCurrencies(displayedCurrencies.filter((c) => c !== cur))
    }
  }

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

  const availableCurrencies = currencies.filter(
    (c) => c !== baseCurrency && !displayedCurrencies.includes(c)
  )

  const canRemove = displayedCurrencies.length > 3

  return (
    <Box>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Currency</TableCell>
            {last7Dates.map((d) => (
              <TableCell key={d} sx={{ color: 'white', fontWeight: 500 }} align="center">
                {d}
              </TableCell>
            ))}
            <TableCell sx={{ color: 'white', fontWeight: 500 }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {displayedCurrencies.map((cur) => (
            <TableRow key={cur} hover>
              <TableCell sx={{ fontWeight: 500 }}>{cur}</TableCell>

              {allRates.map((data, i) => (
                <TableCell key={last7Dates[i]} align="center">
                  {data ? (data[cur.toLowerCase()]?.toFixed(4) ?? '–') : '–'}
                </TableCell>
              ))}

              <TableCell align="center">
                <Tooltip title={canRemove ? `Remove ${cur}` : 'At least 3 currencies must remain'}>
                  <span>
                    <IconButton
                      onClick={() => handleRemoveCurrency(cur)}
                      color="error"
                      disabled={!canRemove}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {displayedCurrencies.length < 7 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
            gap: 2
          }}
        >
          {!adding ? (
            <Button variant="contained" onClick={() => setAdding(true)} color="primary">
              + Add Currency
            </Button>
          ) : (
            <>
              <Select
                size="small"
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value)}
                displayEmpty
                disabled={loadingCurrencies}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="" disabled>
                  {loadingCurrencies ? 'Loading...' : 'Select currency'}
                </MenuItem>
                {availableCurrencies.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                color="success"
                onClick={handleAddCurrency}
                disabled={!newCurrency}
              >
                Add
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAdding(false)
                  setNewCurrency('')
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
