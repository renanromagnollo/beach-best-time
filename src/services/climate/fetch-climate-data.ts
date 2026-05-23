import dns from 'node:dns'

dns.setDefaultResultOrder('ipv4first')

const OPEN_METEO_BASE_URL =
  'https://archive-api.open-meteo.com/v1/archive'

const REQUEST_TIMEOUT = 120000
const MAX_RETRIES = 5
const RETRY_DELAY = 5000
const REQUEST_INTERVAL = 3000

const DAILY_METRICS = [
  'temperature_2m_max',
  'temperature_2m_min',
  'rain_sum',
  'precipitation_hours',
  'sunshine_duration',
  'cloudcover_mean',
  'windspeed_10m_max',
  'windgusts_10m_max',
]

type FetchClimateDataParams = {
  latitude: number
  longitude: number
  year: number
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function buildClimateUrl(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string,
) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    start_date: startDate,
    end_date: endDate,
    daily: DAILY_METRICS.join(','),
    timezone: 'America/Sao_Paulo',
  })

  return `${OPEN_METEO_BASE_URL}?${params.toString()}`
}

async function fetchWithTimeout(url: string) {
  const controller = new AbortController()

  const timeout = setTimeout(() => {
    controller.abort()
  }, REQUEST_TIMEOUT)

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()

      throw new Error(
        `HTTP ${response.status} - ${errorText}`
      )
    }

    return response.json()
  } finally {
    clearTimeout(timeout)
  }
}

async function requestWithRetry(
  url: string,
  retries = MAX_RETRIES,
) {
  let lastError: unknown

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log('')
      console.log(`🚀 Tentativa ${attempt}/${retries}`)
      console.log('🌐 Fazendo requisição...')
      console.log(url)

      const data = await fetchWithTimeout(url)

      console.log('✅ Requisição concluída')

      return data
    } catch (error) {
      lastError = error

      console.log('⚠️ Falha na requisição')
      console.log(error)

      const hasNextAttempt = attempt < retries

      if (!hasNextAttempt) {
        break
      }

      const retryDelay = RETRY_DELAY * attempt

      console.log(
        `⏳ Nova tentativa em ${retryDelay / 1000}s`,
      )

      await sleep(retryDelay)
    }
  }

  throw lastError
}

export async function fetchClimateData({
  latitude,
  longitude,
  year,
}: FetchClimateDataParams) {
  console.log('')
  console.log(`🌎 Processando ano ${year}`)

  const startDate = `${year}-01-01`
  const endDate = `${year}-12-31`

  const url = buildClimateUrl(
    latitude,
    longitude,
    startDate,
    endDate,
  )

  const data = await requestWithRetry(url)
  console.log(JSON.stringify(data, null, 2))

  console.log(
    `😴 Aguardando ${REQUEST_INTERVAL / 1000}s antes da próxima requisição...`,
  )

  await sleep(REQUEST_INTERVAL)

  return data
}