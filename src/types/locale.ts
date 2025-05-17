export enum SupportedLocale {
  PT_BR = 'pt-BR',
  EN_US = 'en-US',
  ES_ES = 'es-ES',
  FR_FR = 'fr-FR',
  IT_IT = 'it-IT'
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