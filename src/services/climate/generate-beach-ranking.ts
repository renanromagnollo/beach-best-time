import { BeachRanking } from '@/types/beach-ranking'
import fs from 'node:fs/promises'
import path from 'node:path'


type BeachClimateFile = {
  beach: {
    name: string
    slug: string
    state: string
  }

  climateInsights: Array<{
    month: number

    score: number

    label: string

    recommendation: string
  }>
}

/**
 * Diretório dos JSONs das praias
 */
const BEACHES_DIRECTORY = path.resolve(
  process.cwd(),
  'public/data/beaches'
)

/**
 * Gera ranking global das praias
 */
export async function generateBeachRanking() {
  const files = await fs.readdir(
    BEACHES_DIRECTORY
  )

  const rankings: BeachRanking[] = []

  /**
   * Percorre JSONs
   */
  for (const file of files) {
    const filePath = path.join(
      BEACHES_DIRECTORY,
      file
    )

    const fileContent =
      await fs.readFile(filePath, 'utf-8')

    const beachData: BeachClimateFile =
      JSON.parse(fileContent)

    /**
     * Percorre insights
     */
    for (const insight of beachData.climateInsights) {
      rankings.push({
        beach: beachData.beach,

        month: insight.month,

        score: insight.score,

        label: insight.label,

        recommendation:
          insight.recommendation,
      })
    }
  }

  /**
   * Ordena maior score
   */
  rankings.sort(
    (currentBeach, nextBeach) =>
      nextBeach.score -
      currentBeach.score
  )

  return rankings
}