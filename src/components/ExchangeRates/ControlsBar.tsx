import { Box, Select, MenuItem, TextField, Button, Typography } from '@mui/material'
import CurrenciesDialog from './CurrenciesDialog'
import type { ControlsBarProps } from './types'

export default function ControlsBar({ openDialog, setOpenDialog }: ControlsBarProps) {
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

      <Button
        variant="outlined"
        color="primary"
        sx={{ height: 'fit-content', borderRadius: '9999px' }}
        onClick={() => setOpenDialog(true)}
      >
        Manage Currencies
      </Button>

      <CurrenciesDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Box>
  )
}
