import { Metadata } from 'next'

import { SEO_CONFIG } from './constants'

type Params = {
  title: string
  description: string

  pathname: string

  locale: string

  image?: string
}

export function buildOpenGraph({
  title,
  description,
  pathname,
  locale,
  image,
}: Params): Metadata['openGraph'] {
  return {
    title,

    description,

    url:
      `${SEO_CONFIG.siteUrl}/${locale}${pathname}`,

    siteName:
      SEO_CONFIG.siteName,

    locale,

    type: 'website',

    images: image
      ? [
        {
          url: image,
        },
      ]
      : [],
  }
}