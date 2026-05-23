// src/i18n/request.ts

import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(
  async ({ locale }) => {
    const currentLocale =
      locale &&
        routing.locales.includes(
          locale as 'pt' | 'en'
        )
        ? locale
        : routing.defaultLocale

    return {
      locale: currentLocale,

      messages: (
        await import(
          `./messages/${currentLocale}.json`
        )
      ).default,
    }
  }
)