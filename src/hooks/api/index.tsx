import axios from 'axios'
import { useState, useEffect } from 'react'

interface UseExchangeRateParams {
  fromCurrency: string
  toCurrency: string
  amount: number
}
const today = new Date().toISOString().split('T')[0] // e.g. 2025-10-21

export const instance = axios.create({
  baseURL: 'https://cdn.jsdelivr.net/npm/',
  timeout: 5000
})

export const getApiUrl = (path: string, useLatest = false) => {
  const version = useLatest ? '@latest' : `@${today}`
  return `@fawazahmed0/currency-api${version}/v1/${path}`
}

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await instance.get(getApiUrl('currencies.json', true))
        const codes = Object.keys(res.data)
          .map((c) => c.toUpperCase())
          .sort()
        setCurrencies(codes)
      } catch {
        setError('Failed to load currency list')
      } finally {
        setLoading(false)
      }
    }

    fetchCurrencies()
  }, [])

  return { currencies, loading, error }
}

export const useExchangeRate = ({ fromCurrency, toCurrency, amount }: UseExchangeRateParams) => {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!fromCurrency || !toCurrency || !amount) return

    const fetchRate = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await instance.get(getApiUrl('currencies/gbp.json'))
        const rates = res.data.gbp
        const from = fromCurrency.toLowerCase()
        const to = toCurrency.toLowerCase()

        let converted = 0
        if (from === 'gbp') {
          converted = amount * rates[to]
        } else if (to === 'gbp') {
          converted = amount / rates[from]
        } else {
          converted = (amount / rates[from]) * rates[to]
        }

        setResult(`${amount} ${fromCurrency} = ${converted.toFixed(4)} ${toCurrency}`)
      } catch {
        setError('Something went wrong while fetching exchange rates')
      } finally {
        setLoading(false)
      }
    }

    fetchRate()
  }, [fromCurrency, toCurrency, amount])

  return { result, loading, error }
}

// redux toolkit query
