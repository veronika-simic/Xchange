import { Box, Select, MenuItem, TextField, Typography } from '@mui/material'

export default function ControlsBar() {
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
        <Select fullWidth>
          <MenuItem value="GBP">GBP</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </Select>
      </Box>

      <Box sx={{ minWidth: 180 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
          Select Date
        </Typography>
        <TextField type="date" fullWidth />
      </Box>
    </Box>
  )
}
