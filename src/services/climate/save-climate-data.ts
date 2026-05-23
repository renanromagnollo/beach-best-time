import fs from 'node:fs/promises'

import path from 'node:path'

export async function saveClimateData(
  slug: string,
  locale: string,
  data: unknown
) {
  /**
   * Pasta
   */
  const directoryPath = path.join(
    process.cwd(),
    'public',
    'data',
    'beaches'
  )

  /**
   * Cria pasta se não existir
   */
  await fs.mkdir(directoryPath, {
    recursive: true,
  })

  /**
   * Arquivo final
   */
  const filePath = path.join(
    directoryPath,
    `${slug}.${locale}.json`
  )

  /**
   * Salva JSON
   */
  await fs.writeFile(
    filePath,

    JSON.stringify(data, null, 2),

    'utf-8'
  )

  console.log('')
  console.log(`💾 JSON salvo:`)
  console.log(filePath)
}