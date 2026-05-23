import { MonthlyClimateData } from "./group-climate-data-by-month"


export type MergedMonthlyClimateData = {
  month: number

  averageTemperatureMax: number
  averageTemperatureMin: number

  averageRainSum: number
  averagePrecipitationHours: number

  averageSunshineDuration: number

  averageCloudcoverMean: number

  averageWindspeedMax: number
  averageWindgustsMax: number

  idealDaysPercentage: number
}

function average(values: number[]) {
  if (values.length === 0) {
    return 0
  }

  const total = values.reduce(
    (accumulator, value) => accumulator + value,
    0
  )

  return total / values.length
}

export function mergeYearlyClimateData(
  yearlyData: MonthlyClimateData[][]
) {
  const mergedData: MergedMonthlyClimateData[] = []

  /**
   * 12 meses
   */
  for (let month = 1; month <= 12; month++) {
    /**
     * Dados do mesmo mês em anos diferentes
     */
    const monthData = yearlyData
      .map((year) =>
        year.find(
          (monthData) =>
            monthData.month === month
        )
      )
      .filter(Boolean) as MonthlyClimateData[]

    if (monthData.length === 0) {
      continue
    }

    mergedData.push({
      month,

      averageTemperatureMax: average(
        monthData.map(
          (item) =>
            item.averageTemperatureMax
        )
      ),

      averageTemperatureMin: average(
        monthData.map(
          (item) =>
            item.averageTemperatureMin
        )
      ),

      averageRainSum: average(
        monthData.map(
          (item) => item.averageRainSum
        )
      ),

      averagePrecipitationHours: average(
        monthData.map(
          (item) =>
            item.averagePrecipitationHours
        )
      ),

      averageSunshineDuration: average(
        monthData.map(
          (item) =>
            item.averageSunshineDuration
        )
      ),

      averageCloudcoverMean: average(
        monthData.map(
          (item) =>
            item.averageCloudcoverMean
        )
      ),

      averageWindspeedMax: average(
        monthData.map(
          (item) =>
            item.averageWindspeedMax
        )
      ),

      averageWindgustsMax: average(
        monthData.map(
          (item) =>
            item.averageWindgustsMax
        )
      ),

      idealDaysPercentage: average(
        monthData.map(
          (item) =>
            item.idealDaysPercentage
        )
      ),
    })
  }

  return mergedData
}