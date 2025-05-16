export enum SupportedLocale {
  PT_BR = 'pt-br',
  EN_US = 'en-us',
  ES_ES = 'es-es',
  FR_FR = 'fr-fr',
  IT_IT = 'it-it'
}

export const locales = [
  SupportedLocale.PT_BR,
  SupportedLocale.EN_US,
  SupportedLocale.ES_ES,
  SupportedLocale.FR_FR,
  SupportedLocale.IT_IT
]

export const i18n = {
  defaultLocale: SupportedLocale.EN_US,
  locales
} as const

export type Locale = (typeof i18n.locales)[number]