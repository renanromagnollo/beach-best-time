import fs from 'node:fs/promises'
import path from 'node:path'

export async function getAllBeachesSlugs() {
  const beachesDirectory = path.join(
    process.cwd(),
    'public',
    'data',
    'beaches'
  )

  const files =
    await fs.readdir(beachesDirectory)

  return files.map((file) =>
    file.replace('.json', '')
  )
}