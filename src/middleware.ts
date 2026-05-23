// src/middleware.ts

import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'

export default createMiddleware(routing)

export const config = {
  /**
   * Ignora:
   *
   * - api
   * - arquivos internos do Next
   * - arquivos estáticos
   * - imagens
   * - favicon
   */
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}