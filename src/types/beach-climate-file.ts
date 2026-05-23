export type BeachClimateInsight = {
  month: number

  score: number

  label: string

  summary: string

  recommendation: string
}

export type BeachClimateSummary = {
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

export type BeachClimateFile = {
  beach: {
    name: string
    slug: string
    state: string

    latitude: number
    longitude: number
  }

  climateSummary: BeachClimateSummary[]

  climateInsights: BeachClimateInsight[]
}