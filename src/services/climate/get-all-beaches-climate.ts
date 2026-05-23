import fs from 'node:fs/promises'
import path from 'node:path'

import { BeachClimateResult } from '@/types/climate'

export async function getAllBeachesClimate() {
  const directoryPath = path.join(
    process.cwd(),
    'public',
    'data',
    'beaches'
  )

  const files =
    await fs.readdir(directoryPath)

  const beaches = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(
        directoryPath,
        file
      )

      const content =
        await fs.readFile(
          filePath,
          'utf-8'
        )

      return JSON.parse(
        content
      ) as BeachClimateResult
    })
  )

  return beaches
}