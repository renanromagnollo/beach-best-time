import { MetadataRoute } from 'next'

import { beaches } from '@/data/beaches'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000'

const locales = ['pt', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = []

  /**
   * Páginas principais
   */
  const staticRoutes = [
    '',
    '/praias',
  ]

  /**
   * Rotas estáticas com i18n
   */
  for (const locale of locales) {
    for (const route of staticRoutes) {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,

        lastModified: new Date(),

        changeFrequency: 'weekly',

        priority: route === ''
          ? 1
          : 0.8,
      })
    }
  }

  /**
   * Rotas dinâmicas de praias
   */
  for (const beach of beaches) {
    for (const locale of locales) {
      routes.push({
        url:
          `${baseUrl}/${locale}/praias/${beach.slug}`,

        lastModified: new Date(),

        changeFrequency: 'weekly',

        priority: 0.9,
      })
    }
  }

  return routes
}