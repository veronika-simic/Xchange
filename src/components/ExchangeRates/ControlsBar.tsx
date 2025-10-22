import { Box, Select, MenuItem, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { useGetCurrenciesQuery } from '../../features/api/apiSlice'

interface ControlsBarProps {
  baseCurrency: string
  onCurrencyChange: (cur: string) => void
  selectedDate: Dayjs | null
  onDateChange: (date: Dayjs | null) => void
}

export default function ControlsBar({
  baseCurrency,
  onCurrencyChange,
  selectedDate,
  onDateChange
}: ControlsBarProps) {
  const { data: currencies = [], isLoading } = useGetCurrenciesQuery()

  const minDate = dayjs().subtract(90, 'day')
  const maxDate = dayjs()

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ minWidth: 150 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
          Base Currency
        </Typography>
        <Select
          fullWidth
          value={baseCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          disabled={isLoading}
        >
          {currencies.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ minWidth: 180 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
          Select Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => onDateChange(newValue)}
            minDate={minDate}
            maxDate={maxDate}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  )
}
