import { Locale } from './config'

import { Dictionary } from './types'

export async function getDictionary(
  locale: Locale
): Promise<Dictionary> {
  return (
    await import(
      `./dictionaries/${locale}.json`
    )
  ).default
}