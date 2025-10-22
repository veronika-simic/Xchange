import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://cdn.jsdelivr.net/npm/'

const today = new Date().toISOString().split('T')[0]

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<string[], void>({
      query: () => {
        const version = '@latest'
        return `@fawazahmed0/currency-api${version}/v1/currencies.json`
      },
      transformResponse: (response: Record<string, string>) => {
        return Object.keys(response)
          .map((c) => c.toUpperCase())
          .sort()
      }
    }),
    getExchangeRates: builder.query<Record<string, number>, string>({
      query: (base) => {
        const version = `@${today}`
        return `@fawazahmed0/currency-api${version}/v1/currencies/${base.toLowerCase()}.json`
      },
      transformResponse: (response: Record<string, Record<string, number>>, _, base) => {
        return response[base.toLowerCase()]
      }
    })
  })
})

export const { useGetCurrenciesQuery, useGetExchangeRatesQuery } = apiSlice
