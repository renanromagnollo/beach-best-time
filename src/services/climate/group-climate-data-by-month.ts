import {
  NormalizedClimateData,
} from './normalize-climate-data'

export type MonthlyClimateData = {
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

/**
 * Calcula média
 */
function calculateAverage(
  values: number[]
) {
  if (values.length === 0) {
    return 0
  }

  const total = values.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue,
    0
  )

  return total / values.length
}

/**
 * Extrai apenas valores válidos
 */
function getValidNumbers(
  values: Array<number | null>
) {
  return values.filter(
    (
      value
    ): value is number => value !== null
  )
}

/**
 * Calcula percentual de dias ideais
 */
function calculateIdealDaysPercentage(
  days: NormalizedClimateData[]
) {
  const idealDays = days.filter((day) => {
    const hasGoodTemperature =
      day.temperatureMax !== null &&
      day.temperatureMax >= 26 &&
      day.temperatureMax <= 32

    const hasLowRain =
      day.rainSum !== null &&
      day.rainSum <= 3

    const hasLowCloudCover =
      day.cloudcoverMean !== null &&
      day.cloudcoverMean <= 60

    const hasLowWind =
      day.windspeedMax !== null &&
      day.windspeedMax <= 25

    return (
      hasGoodTemperature &&
      hasLowRain &&
      hasLowCloudCover &&
      hasLowWind
    )
  })

  if (days.length === 0) {
    return 0
  }

  return (
    (idealDays.length / days.length) * 100
  )
}

/**
 * Agrupa dados climáticos por mês
 */
export function groupClimateByMonth(
  climateData: NormalizedClimateData[]
) {
  const groupedMonths = new Map<
    number,
    NormalizedClimateData[]
  >()

  /**
   * Agrupa dias por mês
   */
  for (const day of climateData) {
    const month =
      new Date(day.date).getMonth() + 1

    if (!groupedMonths.has(month)) {
      groupedMonths.set(month, [])
    }

    groupedMonths.get(month)?.push(day)
  }

  const monthlyClimateData: MonthlyClimateData[] =
    []

  /**
   * Calcula métricas mensais
   */
  for (const [month, days] of groupedMonths) {
    const monthlyData: MonthlyClimateData = {
      month,

      averageTemperatureMax:
        calculateAverage(
          getValidNumbers(
            days.map(
              (day) => day.temperatureMax
            )
          )
        ),

      averageTemperatureMin:
        calculateAverage(
          getValidNumbers(
            days.map(
              (day) => day.temperatureMin
            )
          )
        ),

      averageRainSum:
        calculateAverage(
          getValidNumbers(
            days.map((day) => day.rainSum)
          )
        ),

      averagePrecipitationHours:
        calculateAverage(
          getValidNumbers(
            days.map(
              (day) =>
                day.precipitationHours
            )
          )
        ),

      averageSunshineDuration:
        calculateAverage(
          getValidNumbers(
            days.map(
              (day) =>
                day.sunshineDuration
            )
          )
        ),

      averageCloudcoverMean:
        calculateAverage(
          getValidNumbers(
            days.map(
              (day) =>
                day.cloudcoverMean
            )
          )
        ),

      averageWindspeedMax:
        calculateAverage(
          getValidNumbers(
            days.map(
              (day) =>
                day.windspeedMax
            )
          )
        ),

      averageWindgustsMax:
        calculateAverage(
          getValidNumbers(
            days.map(
              (day) =>
                day.windgustsMax
            )
          )
        ),

      idealDaysPercentage:
        calculateIdealDaysPercentage(
          days
        ),
    }

    monthlyClimateData.push(
      monthlyData
    )
  }

  /**
   * Ordena meses
   */
  monthlyClimateData.sort(
    (currentMonth, nextMonth) =>
      currentMonth.month -
      nextMonth.month
  )

  return monthlyClimateData
}