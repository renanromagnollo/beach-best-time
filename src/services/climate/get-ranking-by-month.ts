import { getAllBeachesClimate } from './get-all-beaches-climate'

export async function getRankingByMonth(
  month: number
) {
  const beaches =
    await getAllBeachesClimate()

  const ranking = beaches
    .map((beach) => {
      const summary =
        beach.climateSummary.find(
          (item) =>
            item.month === month
        )

      if (!summary) {
        return null
      }

      return {
        beach: beach.beach,
        summary,
      }
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        b!.summary.averageScore -
        a!.summary.averageScore
    )

  return ranking
}