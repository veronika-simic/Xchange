import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  Box
} from '@mui/material'

interface CurrenciesDialogProps {
  open: boolean
  onClose: () => void
}

const allCurrencies = ['GBP', 'USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR', 'AZM']

export default function CurrenciesDialog({ open, onClose }: CurrenciesDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, textAlign: 'center' }}>
        Manage Currencies (min 3, max 7)
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          {allCurrencies.map((cur) => (
            <Box key={cur} sx={{ width: '50%' }}>
              <FormControlLabel
                control={<Checkbox />}
                label={cur}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }
                }}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
        <Button variant="contained" color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}
