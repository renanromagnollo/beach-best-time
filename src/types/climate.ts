export type BeachClimateYear = {
  year: number

  dailyData: DailyClimateData[]

  monthlyData: MonthlyClimateScore[]
}

export type DailyClimateData = {
  date: string

  temperatureMax: number | null
  temperatureMin: number | null

  rainSum: number | null
  precipitationHours: number | null

  sunshineDuration: number | null

  cloudcoverMean: number | null

  windspeedMax: number | null
  windgustsMax: number | null
}

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

export type MonthlyClimateScore =
  MonthlyClimateData & {
    score: number
  }

export type ClimateSummary = {
  month: number

  averageScore: number

  averageTemperatureMax: number
  averageTemperatureMin: number

  averageRainSum: number

  averageSunshineDuration: number

  averageCloudcoverMean: number

  averageWindspeedMax: number

  idealDaysPercentage: number
}

export type ClimateInsight = {
  month: number

  score: number

  label: string

  summary: string

  recommendation: string
}

export type BeachClimateResult = {
  beach: {
    name: string
    slug: string
    state: string

    latitude: number
    longitude: number
  }

  years: BeachClimateYear[]

  climateSummary: ClimateSummary[]

  climateInsights: ClimateInsight[]

  bestMonths: ClimateSummary[]
}