import fs from 'node:fs/promises'
import path from 'node:path'

export type BeachListItem = {
  beach: {
    name: string
    slug: string
    state: string
    latitude: number
    longitude: number
  }

  climateSummary: Array<{
    month: number
    averageScore: number
  }>
}

/**
 * Verifica se é JSON válido
 */
function isJsonFile(file: string) {
  return file.endsWith('.json')
}

export async function getAllBeaches() {
  const beachesDirectory = path.join(
    process.cwd(),
    'public',
    'data',
    'beaches'
  )

  /**
   * Lista arquivos
   */
  const files = await fs.readdir(
    beachesDirectory
  )

  /**
   * Filtra apenas JSON
   */
  const jsonFiles = files.filter(
    isJsonFile
  )

  /**
   * Lê todos os JSONs
   */
  const beaches = await Promise.all(
    jsonFiles.map(async (file) => {
      const filePath = path.join(
        beachesDirectory,
        file
      )

      const content =
        await fs.readFile(
          filePath,
          'utf-8'
        )

      return JSON.parse(
        content
      ) as BeachListItem
    })
  )

  return beaches
}