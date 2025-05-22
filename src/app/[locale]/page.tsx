'use client'

import { useCallback, useEffect, useState } from "react"
import { ClimateData } from "@/domain"
import { useStatistics } from "@/hooks"
import { InputLocation, WeatherMonths } from "../_components"
import { calcScore } from "@/utils/calc-score"
import { Info } from "lucide-react"

export default function HomePage() {
  // const t = useTranslation()

  const [errorPage, setErrorPage] = useState('')
  const [locationSearched, setLocationSearched] = useState('')
  const [result, setResult] = useState<ClimateData[] | null>(null)

  const { data, isFetching, isError, error } = useStatistics(locationSearched)


  const handleSearch = useCallback((location: string) => {
    if (location) {
      setLocationSearched(location)
      setErrorPage('')
      setResult(null)
    }
  }, [])

  useEffect(() => {
    if (!isFetching && locationSearched) {
      if (data) {
        const score = calcScore(data)
        setResult(score)
      } else if (isError) {
        setErrorPage(error?.message || 'Erro ao buscar dados')
      } else {
        setErrorPage('Dados não encontrados')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching, isError, error])


  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Praiômetro
      </h1>
      <h2 className="text-center">Pesquise abaixo a cidade do Brasil em que a praia está localizada e veja quais são as melhores épocas.</h2>
      <div className="my-6">
        <InputLocation onSearch={handleSearch} />

      </div>

      {isFetching && (
        <p className="text-center mt-6 text-blue-500"> Carregando dados...</p>
      )}

      {errorPage && <p className="text-center mt-6 text-red-500">{errorPage}</p>}

      {result && <WeatherMonths data={result} />}
      <div className="w-full flex gap-2 flex-col justify-center items-center m-5 border p-5">
        <Info className="w-10 h-10 text-blue-500" />
        <p className="mb-5 text-center">
          As informações exibidas são baseadas em dados meteorológicos reais coletados na região pesquisada, com base em registros dos últimos anos. Para garantir maior precisão e confiabilidade, utilizamos a média histórica dos dados obtidos entre 3 e 1 ano atrás. Essa análise considera critérios específicos que avaliam as condições climáticas ideais para a experiência na praia, como temperatura do ar, incidência solar, chuvas, ventos e outros fatores relevantes de cada mês.
        </p>

      </div>
    </main>
  )
}