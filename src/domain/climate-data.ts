export type ClimateData = {
  month: string
  averageTemperature: number
  precipitation: number
  hourSun: number
  windMax: number
  score?: number
  rating?: 'excellent' | 'good' | 'unstable' | 'bad' | 'terrible'
}