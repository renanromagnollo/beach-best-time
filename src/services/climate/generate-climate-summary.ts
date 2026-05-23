import { ClimateSummary } from '@/types/climate'
import {
  MonthlyClimateScore,
} from './calculate-climate-score'

export type BeachClimateYear = {
  year: number

  monthlyData: MonthlyClimateScore[]
}



/**
 * Calcula média
 */
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

/**
 * Gera resumo climático consolidado
 */
export function generateClimateSummary(
  beachClimateData: BeachClimateYear[]
) {
  const summary: ClimateSummary[] = []

  /**
   * Percorre 12 meses
   */
  for (let month = 1; month <= 12; month++) {
    const monthData =
      beachClimateData.flatMap((year) =>
        year.monthlyData.filter(
          (data) =>
            data.month === month
        )
      )

    if (monthData.length === 0) {
      continue
    }

    summary.push({
      month,

      averageScore: average(
        monthData.map(
          (data) => data.score
        )
      ),

      averageTemperatureMax:
        average(
          monthData.map(
            (data) =>
              data.averageTemperatureMax
          )
        ),

      averageTemperatureMin:
        average(
          monthData.map(
            (data) =>
              data.averageTemperatureMin
          )
        ),

      averageRainSum: average(
        monthData.map(
          (data) =>
            data.averageRainSum
        )
      ),

      averageSunshineDuration:
        average(
          monthData.map(
            (data) =>
              data.averageSunshineDuration
          )
        ),

      averageCloudcoverMean:
        average(
          monthData.map(
            (data) =>
              data.averageCloudcoverMean
          )
        ),

      averageWindspeedMax:
        average(
          monthData.map(
            (data) =>
              data.averageWindspeedMax
          )
        ),

      idealDaysPercentage:
        average(
          monthData.map(
            (data) =>
              data.idealDaysPercentage
          )
        ),
    })
  }

  /**
   * Ordena meses
   */
  summary.sort(
    (currentMonth, nextMonth) =>
      currentMonth.month -
      nextMonth.month
  )

  return summary
}