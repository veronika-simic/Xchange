import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

const sampleCurrencies = ['USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR']
const sampleDates = ['2024-10-14', '2024-10-13']

export default function RatesTable() {
  return (
    <Table sx={{ minWidth: 600 }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: 'primary.main' }}>
          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Currency</TableCell>
          {sampleDates.map((d) => (
            <TableCell key={d} sx={{ color: 'white', fontWeight: 500 }} align="center">
              {d}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleCurrencies.map((cur) => (
          <TableRow key={cur} hover>
            <TableCell sx={{ fontWeight: 500 }}>{cur}</TableCell>
            {sampleDates.map((d) => (
              <TableCell key={d} align="center">
                --
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
