import { Box, Button } from '@mui/material'
import Logo from './Logo'
import SwitchButton from './SwitchButton'
import { Link } from 'react-router-dom'

export default function NavigationBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, md: 6 },
        py: 2,
        backgroundColor: 'primary.main',
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Logo />
        <Button
          component={Link}
          to="/converter"
          variant="text"
          sx={{
            color: 'white',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': { color: '#e0e0e0' }
          }}
        >
          Get Exchange
        </Button>
      </Box>

      <SwitchButton />
    </Box>
  )
}
