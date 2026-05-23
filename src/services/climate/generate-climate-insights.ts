import { Dictionary } from '@/i18n/types'
import { ClimateSummary } from '@/types/climate'


export type ClimateInsight = {
  month: number

  score: number

  label: string

  summary: string

  recommendation: string
}

function getLabel(
  score: number,
  dictionary: Dictionary
) {
  if (score >= 9) {
    return dictionary.climate.perfect
  }

  if (score >= 8) {
    return dictionary.climate.excellent
  }

  if (score >= 7) {
    return dictionary.climate.veryGood
  }

  if (score >= 6) {
    return dictionary.climate.good
  }

  if (score >= 5) {
    return dictionary.climate.regular
  }

  return dictionary.climate.bad
}

function generateSummary(
  climate: ClimateSummary,
  locale: 'pt' | 'en'
) {
  /**
   * PT
   */
  if (locale === 'pt') {
    const parts: string[] = []

    if (
      climate.averageTemperatureMax >= 27 &&
      climate.averageTemperatureMax <= 32
    ) {
      parts.push(
        'temperaturas excelentes'
      )
    }

    if (climate.averageRainSum <= 3) {
      parts.push(
        'baixa incidência de chuva'
      )
    }

    if (
      climate.averageSunshineDuration >=
      7 * 3600
    ) {
      parts.push(
        'muitos períodos de sol'
      )
    }

    if (
      climate.averageWindspeedMax <= 25
    ) {
      parts.push('ventos agradáveis')
    }

    if (parts.length === 0) {
      return 'Condições climáticas moderadas para praia.'
    }

    return `O mês apresenta ${parts.join(
      ', '
    )}.`
  }

  /**
   * EN
   */
  const parts: string[] = []

  if (
    climate.averageTemperatureMax >= 27 &&
    climate.averageTemperatureMax <= 32
  ) {
    parts.push(
      'excellent temperatures'
    )
  }

  if (climate.averageRainSum <= 3) {
    parts.push('low rainfall')
  }

  if (
    climate.averageSunshineDuration >=
    7 * 3600
  ) {
    parts.push('long sunny periods')
  }

  if (
    climate.averageWindspeedMax <= 25
  ) {
    parts.push('pleasant winds')
  }

  if (parts.length === 0) {
    return 'Moderate beach weather conditions.'
  }

  return `The month presents ${parts.join(
    ', '
  )}.`
}

function generateRecommendation(
  score: number,
  dictionary: Dictionary
) {
  if (score >= 8.5) {
    return dictionary.recommendations.excellent
  }

  if (score >= 7) {
    return dictionary.recommendations.good
  }

  if (score >= 5) {
    return dictionary.recommendations.regular
  }

  return dictionary.recommendations.bad
}

export function generateClimateInsights(
  summaries: ClimateSummary[],
  dictionary: Dictionary,
  locale: 'pt' | 'en'
) {
  return summaries.map((summary) => {
    return {
      month: summary.month,

      score: summary.averageScore,

      label: getLabel(
        summary.averageScore,
        dictionary
      ),

      summary: generateSummary(
        summary,
        locale
      ),

      recommendation:
        generateRecommendation(
          summary.averageScore,
          dictionary
        ),
    }
  })
}