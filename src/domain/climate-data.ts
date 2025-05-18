export type ClimateData = {
  month: string
  averageTemperature: number
  precipitation: number
  precipitationHours: number
  cloudCover: number
  hourSun: number
  windMax: number
  waterTemperature: number
  score?: number
  rating?: 'excellent' | 'good' | 'unstable' | 'bad' | 'terrible'
}