import fs from 'node:fs/promises'
import path from 'node:path'

export async function getBeachBySlug(
  slug: string
) {
  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'beaches',
    `${slug}.json`
  )

  const content = await fs.readFile(
    filePath,
    'utf-8'
  )

  return JSON.parse(content)
}