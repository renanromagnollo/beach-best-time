export type OpenMeteoClimateResponse = {
  daily: {
    time: string[]

    temperature_2m_max: number[]
    temperature_2m_min: number[]

    rain_sum: number[]
    precipitation_hours: number[]

    sunshine_duration: number[]

    cloudcover_mean: number[]

    windspeed_10m_max: number[]
    windgusts_10m_max: number[]
  }
}

export type NormalizedClimateData = {
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

export function normalizeClimateData(
  data: OpenMeteoClimateResponse
) {
  const normalizedData: NormalizedClimateData[] = []

  /**
   * Segurança básica
   */
  if (!data?.daily?.time) {
    return normalizedData
  }

  const totalDays = data.daily.time.length

  for (let index = 0; index < totalDays; index++) {
    const normalizedDay: NormalizedClimateData = {
      date:
        data.daily.time[index] ?? '',

      temperatureMax:
        data.daily.temperature_2m_max?.[index] ?? null,

      temperatureMin:
        data.daily.temperature_2m_min?.[index] ?? null,

      rainSum:
        data.daily.rain_sum?.[index] ?? null,

      precipitationHours:
        data.daily.precipitation_hours?.[index] ?? null,

      sunshineDuration:
        data.daily.sunshine_duration?.[index] ?? null,

      cloudcoverMean:
        data.daily.cloudcover_mean?.[index] ?? null,

      windspeedMax:
        data.daily.windspeed_10m_max?.[index] ?? null,

      windgustsMax:
        data.daily.windgusts_10m_max?.[index] ?? null,
    }

    normalizedData.push(normalizedDay)
  }

  return normalizedData
}