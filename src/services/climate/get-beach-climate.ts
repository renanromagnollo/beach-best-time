import fs from 'node:fs/promises'
import path from 'node:path'

import { BeachClimateResult } from '@/types/climate'

export async function getBeachClimate(
  slug: string
): Promise<BeachClimateResult> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'beaches',
    `${slug}.json`
  )

  const file = await fs.readFile(
    filePath,
    'utf-8'
  )

  return JSON.parse(file)
}