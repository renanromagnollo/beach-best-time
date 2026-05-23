type ClimateSummaryItem = {
  month: number

  score: number

  label: string

  summary: string
}

type BeachData = {
  beach: string

  state: string

  climateSummary: ClimateSummaryItem[]
}

type GenerateSeasonRankingParams = {
  beaches: BeachData[]

  months: number[]
}

export type SeasonRankingItem = {
  beach: string

  state: string

  averageScore: number
}

function average(values: number[]) {
  if (values.length === 0) {
    return 0
  }

  const total = values.reduce(
    (accumulator, value) =>
      accumulator + value,
    0
  )

  return total / values.length
}

export function generateSeasonRanking({
  beaches,
  months,
}: GenerateSeasonRankingParams) {
  const ranking: SeasonRankingItem[] =
    []

  for (const beach of beaches) {
    const scores =
      beach.climateSummary
        .filter((item) =>
          months.includes(item.month)
        )
        .map((item) => item.score)

    ranking.push({
      beach: beach.beach,

      state: beach.state,

      averageScore:
        average(scores),
    })
  }

  ranking.sort(
    (a, b) =>
      b.averageScore -
      a.averageScore
  )

  return ranking
}