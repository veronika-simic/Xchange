import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function Logo() {
  return (
    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        XE
      </Typography>
    </Link>
  )
}
