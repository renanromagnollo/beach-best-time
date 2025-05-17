import { TranslationProvider } from "@/context/translation-context"
import { getDictionary } from "@/dictionary/get-dictionary"
import { i18n, Locale } from "@/types"
import { notFound } from "next/navigation"

export default async function LocaleLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {

  const { children, params } = props
  const { locale } = await params

  if (!i18n.locales.includes(locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale)

  return (
    <TranslationProvider dictionary={dictionary}>
      {children}
    </TranslationProvider>
  )
}