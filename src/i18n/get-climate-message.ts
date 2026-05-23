import { climateMessagesPt } from './messages/pt/climate'

import { climateMessagesEn } from './messages/en/climate'

type Locale = 'pt' | 'en'

const messages = {
  pt: climateMessagesPt,

  en: climateMessagesEn,
}

export function getClimateMessage(
  locale: Locale,
  key: string
) {
  return (
    messages[locale][
    key as keyof typeof messages.pt
    ] ?? key
  )
}