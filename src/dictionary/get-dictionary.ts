// import 'server-only'
import { Dictionary, Locale, SupportedLocale } from '@/types'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  [SupportedLocale.EN_US]: () =>
    import('@/dictionary/lang/en-us.json').then((m) => m.default as Dictionary),
  [SupportedLocale.PT_BR]: () =>
    import('@/dictionary/lang/pt-br.json').then((m) => m.default as Dictionary),
  [SupportedLocale.ES_ES]: () =>
    import('@/dictionary/lang/es-es.json').then((m) => m.default as Dictionary),
  [SupportedLocale.FR_FR]: () =>
    import('@/dictionary/lang/fr-fr.json').then((m) => m.default as Dictionary),
  [SupportedLocale.IT_IT]: () =>
    import('@/dictionary/lang/it-it.json').then((m) => m.default as Dictionary)
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale]
  if (!loader) throw new Error(`No dictionary for locale: ${locale}`)
  return loader()
}