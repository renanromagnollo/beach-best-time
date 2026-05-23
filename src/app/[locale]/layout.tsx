import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

type Props = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params

  const messages =
    await getMessages()

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-zinc-50">
        <NextIntlClientProvider
          messages={messages}
        >
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}