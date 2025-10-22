export const getLast7Dates = (endDate: string): string[] => {
  const end = new Date(endDate)
  const dates: string[] = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date(end)
    d.setDate(end.getDate() - i)
    dates.push(d.toISOString().split('T')[0])
  }

  return dates
}
