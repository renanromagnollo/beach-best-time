'use client'

import { useCallback, useEffect, useState } from "react"
import { ClimateData } from "@/domain"
import { useStatistics } from "@/hooks"
import { InputLocation, WeatherMonths } from "../_components"
import { calcScore } from "@/utils/calc-score"

export default function HomePage() {
  // const t = useTranslation()

  const [errorPage, setErrorPage] = useState('')
  const [location, setLocation] = useState('')
  const [result, setResult] = useState<ClimateData[] | null>(null)

  const { data, isFetching, isError, error } = useStatistics(location)


  const handleSearch = useCallback((location: string) => {
    if (location) {
      setLocation(location)
      setErrorPage('')
      setResult(null)
    }
  }, [])

  useEffect(() => {
    if (!isFetching) {
      if (data) {
        const score = calcScore(data)
        setResult(score)
      } else if (isError) {
        setErrorPage(error?.message || 'Erro ao buscar dados')
      } else {
        setErrorPage('Dados não encontrados')
      }
    }
  }, [data, isFetching, isError, error])


  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Melhores Épocas para Curtir a Praia
      </h1>
      <InputLocation onSearch={handleSearch} />

      {isFetching && (
        <p className="text-center mt-6 text-blue-500"> Carregando dados...</p>
      )}

      {errorPage && <p className="text-center mt-6 text-red-500">{errorPage}</p>}

      {result && <WeatherMonths data={result} />}
    </main>
  )
}