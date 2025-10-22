import { Box, IconButton } from '@mui/material'
import Banner from './Banner'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import type { RefObject } from 'react'

interface HeroSectionProps {
  scrollToRef: RefObject<HTMLDivElement | null>
}

export default function HeroSection({ scrollToRef }: HeroSectionProps) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <Banner />

      <IconButton
        onClick={handleScroll}
        sx={{ display: 'block', pb: '20px', margin: '0 auto 40px', color: 'white' }}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: '4rem' }} />
      </IconButton>
    </Box>
  )
}
