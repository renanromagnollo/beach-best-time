import {
  generateBeachRanking,
} from '../src/services/climate/generate-beach-ranking'

import {
  generateLowestRainfallRanking,
} from '../src/services/climate/rankings/generate-lowest-rainfall-ranking'

import {
  generateMostSunnyBeachesRanking,
} from '../src/services/climate/rankings/generate-most-sunny-beaches-ranking'

import {
  saveRankingData,
} from '../src/services/climate/save-ranking-data'

async function generate() {
  console.log('')
  console.log(
    '🏆 Gerando rankings climáticos...'
  )

  /**
   * Ranking geral
   */
  const bestBeaches =
    await generateBeachRanking()

  await saveRankingData(
    'best-beaches',
    bestBeaches.slice(0, 100)
  )

  /**
   * Praias mais ensolaradas
   */
  const mostSunnyBeaches =
    await generateMostSunnyBeachesRanking()

  await saveRankingData(
    'most-sunny-beaches',
    mostSunnyBeaches
  )

  /**
   * Praias menos chuvosas
   */
  const lowestRainfall =
    await generateLowestRainfallRanking()

  await saveRankingData(
    'lowest-rainfall-beaches',
    lowestRainfall
  )

  console.log('')

  console.log(
    '🎉 Rankings gerados com sucesso!'
  )
}

generate()