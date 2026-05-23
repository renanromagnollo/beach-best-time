import { ClimateSummary } from "@/types/climate"


export type BestMonth = {
  month: number

  score: number

  label: string
}

export type BestMonthsResult = {
  bestMonths: BestMonth[]

  worstMonths: BestMonth[]
}

function getMonthLabel(score: number) {
  if (score >= 9) {
    return 'Perfeito'
  }

  if (score >= 8) {
    return 'Excelente'
  }

  if (score >= 7) {
    return 'Muito Bom'
  }

  if (score >= 6) {
    return 'Bom'
  }

  if (score >= 5) {
    return 'Regular'
  }

  return 'Ruim'
}

export function generateBestMonths(
  summaries: ClimateSummary[]
): BestMonthsResult {
  const sortedMonths = [...summaries].sort(
    (currentMonth, nextMonth) =>
      nextMonth.averageScore -
      currentMonth.averageScore
  )

  const bestMonths = sortedMonths
    .slice(0, 3)
    .map((month) => ({
      month: month.month,

      score: Number(
        month.averageScore.toFixed(1)
      ),

      label: getMonthLabel(
        month.averageScore
      ),
    }))

  const worstMonths = [...sortedMonths]
    .reverse()
    .slice(0, 3)
    .map((month) => ({
      month: month.month,

      score: Number(
        month.averageScore.toFixed(1)
      ),

      label: getMonthLabel(
        month.averageScore
      ),
    }))

  return {
    bestMonths,

    worstMonths,
  }
}