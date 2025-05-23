export type ClimateData = {
  month: string
  averageTemperature: number
  precipitation: number
  precipitationHours: number
  cloudCover: number
  hourSun: number
  windMax: number
  score?: number
  rating?: 'excellent' | 'good' | 'unstable' | 'bad' | 'terrible'
}

export interface ClimateDataWithYear extends ClimateData {
  year: number;
  count: number;
}