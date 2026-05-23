import {
  loadBeachesClimateData,
} from '../load-beaches-climate-data'

export type SunnyBeachRanking = {
  beach: {
    name: string
    slug: string
    state: string
  }

  averageSunshineDuration: number

  averageScore: number
}

export async function generateMostSunnyBeachesRanking() {
  const beaches =
    await loadBeachesClimateData()

  const rankings: SunnyBeachRanking[] =
    beaches.map((beach) => {
      const summaries =
        beach.climateSummary

      const totalSunshine =
        summaries.reduce(
          (accumulator, currentMonth) =>
            accumulator +
            currentMonth.averageSunshineDuration,
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

        averageSunshineDuration:
          totalSunshine /
          summaries.length,

        averageScore:
          totalScore / summaries.length,
      }
    })

  rankings.sort(
    (currentBeach, nextBeach) =>
      nextBeach.averageSunshineDuration -
      currentBeach.averageSunshineDuration
  )

  return rankings
}