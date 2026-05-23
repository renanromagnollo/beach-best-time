import {
  loadBeachesClimateData,
} from '../load-beaches-climate-data'

export type LowestRainfallRanking = {
  beach: {
    name: string
    slug: string
    state: string
  }

  averageRainSum: number

  averageScore: number
}

export async function generateLowestRainfallRanking() {
  const beaches =
    await loadBeachesClimateData()

  const rankings: LowestRainfallRanking[] =
    beaches.map((beach) => {
      const summaries =
        beach.climateSummary

      const totalRain =
        summaries.reduce(
          (accumulator, currentMonth) =>
            accumulator +
            currentMonth.averageRainSum,
          0
        )

      const totalScore =
        summaries.reduce(
          (accumulator, currentMonth) =>
            accumulator +
            currentMonth.averageScore,
          0
        )

      return {
        beach: {
          name: beach.beach.name,

          slug: beach.beach.slug,

          state: beach.beach.state,
        },

        averageRainSum:
          totalRain / summaries.length,

        averageScore:
          totalScore / summaries.length,
      }
    })

  /**
   * Menor chuva primeiro
   */
  rankings.sort(
    (currentBeach, nextBeach) =>
      currentBeach.averageRainSum -
      nextBeach.averageRainSum
  )

  return rankings
}