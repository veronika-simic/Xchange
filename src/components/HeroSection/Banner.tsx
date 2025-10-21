import { Box, Typography } from '@mui/material'

export default function Banner() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        pb: 6
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '3.5rem' },
          mb: 2
        }}
      >
        LIVE EXCHANGE RATES
      </Typography>

      <Typography
        variant="h6"
        sx={{
          mb: 3,
          opacity: 0.9
        }}
      >
        Compare 100+ currencies in real time
      </Typography>
    </Box>
  )
}
