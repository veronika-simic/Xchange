import { Box, Link, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 2,
        mt: 6,
        textAlign: 'center'
      }}
    >
      <Typography variant="body2">
        Created with <span style={{ color: 'red' }}>❤️</span> by{' '}
        <Link
          href="https://github.com/veronika-simic"
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{ color: 'inherit', fontWeight: 'bold' }}
        >
          Vera
        </Link>
      </Typography>
    </Box>
  )
}
