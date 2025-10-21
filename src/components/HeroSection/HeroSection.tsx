import { Box, Container } from '@mui/material'
import NavigationBar from '../Navigation/NavigationBar'
import Banner from './Banner'

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '60vh', md: '70vh' },
        backgroundColor: 'primary.main',
        color: 'white',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          width: '100%',
          height: '100px',
          backgroundColor: 'background.default',
          borderTopLeftRadius: '50% 40px',
          borderTopRightRadius: '50% 40px'
        }}
      />

      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pb: 18
        }}
      >
        <NavigationBar />
        <Banner />
      </Container>
    </Box>
  )
}
