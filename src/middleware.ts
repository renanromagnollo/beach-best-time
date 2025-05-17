import { NextRequest, NextResponse } from 'next/server'
import { i18n, SupportedLocale } from '@/types'

function getLocaleFromHeader(request: NextRequest): SupportedLocale {
  const acceptLanguage = request.headers.get('accept-language')

  if (!acceptLanguage) {
    return i18n.defaultLocale
  }

  const supportedLocales = i18n.locales
  const preferredLocales = acceptLanguage.split(',').map((lang) => lang.split(';')[0].trim().toLowerCase())

  const matched = preferredLocales.find((locale) => supportedLocales.includes(locale as SupportedLocale))

  return (matched || i18n.defaultLocale) as SupportedLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isLanguageInUrl = i18n.locales.some((locale) => pathname.startsWith(`/${locale}`))
  if (isLanguageInUrl) {
    return NextResponse.next()
  }

  const detectedLocaleInBrowser = getLocaleFromHeader(request)

  return NextResponse.redirect(new URL(`/${detectedLocaleInBrowser}${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}