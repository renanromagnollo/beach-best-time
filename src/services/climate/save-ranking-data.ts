import fs from 'node:fs/promises'
import path from 'node:path'

export async function saveRankingData(
  fileName: string,
  data: unknown
) {
  const rankingsDirectory =
    path.resolve(
      process.cwd(),
      'public/data/rankings'
    )

  /**
   * Cria pasta
   */
  await fs.mkdir(rankingsDirectory, {
    recursive: true,
  })

  const filePath = path.join(
    rankingsDirectory,
    `${fileName}.json`
  )

  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    'utf-8'
  )

  console.log('')
  console.log(
    `💾 Ranking salvo: ${filePath}`
  )
}