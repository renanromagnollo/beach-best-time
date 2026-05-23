import {
  MonthlyClimateData,
} from './group-climate-data-by-month'

export type MonthlyClimateScore =
  MonthlyClimateData & {
    score: number
  }

/**
 * Limita valor entre mínimo e máximo
 */
function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.min(
    Math.max(value, min),
    max
  )
}

/**
 * Calcula score climático do mês
 */
function calculateMonthScore(
  month: MonthlyClimateData
) {
  let score = 0

  /**
   * Temperatura máxima
   */
  if (
    month.averageTemperatureMax >= 26 &&
    month.averageTemperatureMax <= 32
  ) {
    score += 2
  }

  /**
   * Chuva
   */
  if (month.averageRainSum <= 3) {
    score += 2
  } else if (
    month.averageRainSum <= 6
  ) {
    score += 1
  }

  /**
   * Horas de sol
   */
  if (
    month.averageSunshineDuration >=
    7 * 3600
  ) {
    score += 2
  } else if (
    month.averageSunshineDuration >=
    5 * 3600
  ) {
    score += 1
  }

  /**
   * Nuvens
   */
  if (
    month.averageCloudcoverMean <= 40
  ) {
    score += 2
  } else if (
    month.averageCloudcoverMean <= 60
  ) {
    score += 1
  }

  /**
   * Ventos
   */
  if (
    month.averageWindspeedMax <= 20
  ) {
    score += 2
  } else if (
    month.averageWindspeedMax <= 30
  ) {
    score += 1
  }

  /**
   * Dias ideais
   */
  score +=
    month.idealDaysPercentage * 0.02

  /**
   * Limita score final
   */
  return clamp(score, 0, 10)
}

/**
 * Adiciona score nos meses
 */
export function calculateClimateScore(
  monthlyClimateData: MonthlyClimateData[]
): MonthlyClimateScore[] {
  return monthlyClimateData.map(
    (month) => ({
      ...month,

      score:
        calculateMonthScore(month),
    })
  )
}