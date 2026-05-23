import { MetadataRoute } from 'next'

import { beaches } from '@/data/beaches'

import { SEO_CONFIG } from '@/seo/constants'

export default function sitemap():
  MetadataRoute.Sitemap {
  const routes =
    SEO_CONFIG.locales.flatMap(
      (locale) => [
        {
          url:
            `${SEO_CONFIG.siteUrl}/${locale}`,

          lastModified:
            new Date(),
        },

        {
          url:
            `${SEO_CONFIG.siteUrl}/${locale}/blog`,

          lastModified:
            new Date(),
        },

        {
          url:
            `${SEO_CONFIG.siteUrl}/${locale}/praias`,

          lastModified:
            new Date(),
        },

        ...beaches.map((beach) => ({
          url:
            `${SEO_CONFIG.siteUrl}/${locale}/praias/${beach.slug}`,

          lastModified:
            new Date(),
        })),
      ]
    )

  return routes
}