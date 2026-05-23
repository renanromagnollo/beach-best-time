import { beaches } from '../src/data/beaches'

import {
  fetchClimateData,
} from '../src/services/climate/fetch-climate-data'

import {
  normalizeClimateData,
} from '../src/services/climate/normalize-climate-data'

import {
  groupClimateByMonth,
} from '../src/services/climate/group-climate-data-by-month'

import {
  calculateClimateScore,
} from '../src/services/climate/calculate-climate-score'

import {
  generateClimateSummary,
} from '../src/services/climate/generate-climate-summary'

import {
  generateClimateInsights,
} from '../src/services/climate/generate-climate-insights'

import {
  saveClimateData,
} from '../src/services/climate/save-climate-data'

import {
  generateBestMonths,
} from '../src/services/climate/generate-best-months'

import {
  getDictionary,
} from '../src/i18n/get-dictionary'

import {
  Locale,
} from '../src/i18n/config'

async function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  )
}

async function generate() {
  console.log('')
  console.log(
    '🌊 Gerando dados climáticos...'
  )

  /**
   * Idiomas
   */
  const locales: Locale[] = [
    'pt',
    'en',
  ]

  /**
   * Anos analisados
   */
  const years = [2023, 2024, 2025]

  /**
   * Percorre praias
   */
  for (const beach of beaches) {
    console.log('')
    console.log(
      '=================================================='
    )

    console.log(
      `📍 Processando ${beach.name}`
    )

    console.log(
      '=================================================='
    )

    try {
      const beachClimateYears = []

      /**
       * Busca anos
       */
      for (const year of years) {
        const rawClimateData =
          await fetchClimateData({
            latitude: beach.latitude,
            longitude: beach.longitude,
            year,
          })

        const normalizedClimateData =
          normalizeClimateData(
            rawClimateData
          )

        const groupedClimateData =
          groupClimateByMonth(
            normalizedClimateData
          )

        const monthlyClimateScores =
          calculateClimateScore(
            groupedClimateData
          )

        beachClimateYears.push({
          year,

          dailyData:
            normalizedClimateData,

          monthlyData:
            monthlyClimateScores,
        })

        console.log(
          `✅ ${beach.name} (${year}) concluído`
        )

        await sleep(2000)
      }

      /**
       * Resumo climático
       */
      const climateSummary =
        generateClimateSummary(
          beachClimateYears
        )

      /**
       * Melhores meses
       */
      const bestMonths =
        generateBestMonths(
          climateSummary
        )

      /**
       * Gera JSON para cada idioma
       */
      for (const locale of locales) {
        const dictionary =
          await getDictionary(locale)

        const climateInsights =
          generateClimateInsights(
            climateSummary,
            dictionary,
            locale
          )

        const beachClimateResult = {
          beach: {
            name: beach.name,

            slug: beach.slug,

            state: beach.state,

            latitude: beach.latitude,

            longitude: beach.longitude,
          },

          bestMonths,

          years: beachClimateYears,

          climateSummary,

          climateInsights,
        }

        await saveClimateData(
          beach.slug,
          locale,
          beachClimateResult
        )

        console.log(
          `🌍 JSON ${locale.toUpperCase()} salvo`
        )
      }

      console.log('')
      console.log(
        `🏖️ ${beach.name} finalizada`
      )

      await sleep(3000)
    } catch (error) {
      console.log('')

      console.error(
        `❌ Erro em ${beach.name}`
      )

      console.error(error)
    }
  }

  console.log('')
  console.log(
    '🎉 Dados climáticos gerados!'
  )
}

generate()