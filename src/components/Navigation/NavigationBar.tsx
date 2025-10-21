import { Box } from '@mui/material'
import Logo from './Logo'

export default function NavigationBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 6 },
        py: 2
      }}
    >
      <Logo />
    </Box>
  )
}
