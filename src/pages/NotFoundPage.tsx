import { Typography, Box } from '@mui/material'

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        mt: '15%',
        width: '100%',
        rowGap: '3rem'
      }}
    >
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '4rem' } }}>
        OOOOOOOPS !
      </Typography>
      <Typography variant="h5">
        We don&apos;t have this page.
        <span style={{ display: 'block' }}>The responsible person will be fired.</span>
      </Typography>
      <Typography variant="subtitle2">thanks to you</Typography>
    </Box>
  )
}
