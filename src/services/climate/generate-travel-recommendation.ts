import {
  ClimateSummary,
} from './generate-climate-summary'

export type RecommendationPeriod = {
  months: number[]

  score: number
}

export type TravelRecommendation = {
  bestPeriod: RecommendationPeriod

  worstPeriod: RecommendationPeriod

  rainiestPeriod: RecommendationPeriod

  sunniestPeriod: RecommendationPeriod

  recommendationKeys: string[]
}

function average(numbers: number[]) {
  if (numbers.length === 0) {
    return 0
  }

  const total = numbers.reduce(
    (accumulator, value) =>
      accumulator + value,
    0
  )

  return total / numbers.length
}

export function generateTravelRecommendation(
  summaries: ClimateSummary[]
): TravelRecommendation {
  /**
   * Ordena por score
   */
  const sortedByScore = [...summaries].sort(
    (currentMonth, nextMonth) =>
      nextMonth.averageScore -
      currentMonth.averageScore
  )

  /**
   * Ordena por chuva
   */
  const sortedByRain = [...summaries].sort(
    (currentMonth, nextMonth) =>
      nextMonth.averageRainSum -
      currentMonth.averageRainSum
  )

  /**
   * Ordena por sol
   */
  const sortedBySun = [...summaries].sort(
    (currentMonth, nextMonth) =>
      nextMonth.averageSunshineDuration -
      currentMonth.averageSunshineDuration
  )

  /**
   * Melhores meses
   */
  const bestMonths = sortedByScore.slice(
    0,
    3
  )

  /**
   * Piores meses
   */
  const worstMonths = [...sortedByScore]
    .reverse()
    .slice(0, 3)

  /**
   * Mais chuvosos
   */
  const rainiestMonths =
    sortedByRain.slice(0, 3)

  /**
   * Mais ensolarados
   */
  const sunniestMonths =
    sortedBySun.slice(0, 3)

  const recommendationKeys: string[] =
    []

  /**
   * Média score melhores meses
   */
  const bestAverageScore = average(
    bestMonths.map(
      (month) => month.averageScore
    )
  )

  /**
   * Média chuva
   */
  const averageRain = average(
    rainiestMonths.map(
      (month) => month.averageRainSum
    )
  )

  /**
   * Média sol
   */
  const averageSunshine = average(
    sunniestMonths.map(
      (month) =>
        month.averageSunshineDuration
    )
  )

  /**
   * Excelente clima
   */
  if (bestAverageScore >= 8) {
    recommendationKeys.push(
      'travel.recommendation.excellent_beach_weather'
    )
  }

  /**
   * Muito sol
   */
  if (averageSunshine >= 7 * 3600) {
    recommendationKeys.push(
      'travel.recommendation.sunny_destination'
    )
  }

  /**
   * Chuva elevada
   */
  if (averageRain >= 8) {
    recommendationKeys.push(
      'travel.recommendation.rainy_season_attention'
    )
  }

  /**
   * Dias ideais
   */
  const idealDaysAverage = average(
    bestMonths.map(
      (month) =>
        month.idealDaysPercentage
    )
  )

  if (idealDaysAverage >= 70) {
    recommendationKeys.push(
      'travel.recommendation.great_for_outdoor_activities'
    )
  }

  return {
    bestPeriod: {
      months: bestMonths.map(
        (month) => month.month
      ),

      score: Number(
        bestAverageScore.toFixed(1)
      ),
    },

    worstPeriod: {
      months: worstMonths.map(
        (month) => month.month
      ),

      score: Number(
        average(
          worstMonths.map(
            (month) =>
              month.averageScore
          )
        ).toFixed(1)
      ),
    },

    rainiestPeriod: {
      months: rainiestMonths.map(
        (month) => month.month
      ),

      score: Number(
        averageRain.toFixed(1)
      ),
    },

    sunniestPeriod: {
      months: sunniestMonths.map(
        (month) => month.month
      ),

      score: Number(
        averageSunshine.toFixed(1)
      ),
    },

    recommendationKeys,
  }
}