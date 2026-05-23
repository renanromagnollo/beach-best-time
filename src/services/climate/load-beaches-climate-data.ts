import fs from 'node:fs/promises'
import path from 'node:path'
import { BeachClimateFile } from 'public/data/beaches/beach-climate-file'



const BEACHES_DIRECTORY = path.resolve(
  process.cwd(),
  'public/data/beaches'
)

export async function loadBeachesClimateData() {
  const files = await fs.readdir(
    BEACHES_DIRECTORY
  )

  const beaches: BeachClimateFile[] = []

  for (const file of files) {
    const filePath = path.join(
      BEACHES_DIRECTORY,
      file
    )

    const fileContent =
      await fs.readFile(filePath, 'utf-8')

    const parsedFile: BeachClimateFile =
      JSON.parse(fileContent)

    beaches.push(parsedFile)
  }

  return beaches
}