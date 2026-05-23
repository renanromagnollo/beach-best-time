import { Metadata } from 'next'

import { SEO_CONFIG } from './constants'

import { buildOpenGraph } from './open-graph'

type Params = {
  title: string

  description: string

  pathname: string

  locale: string

  image?: string
}

export function buildMetadata({
  title,
  description,
  pathname,
  locale,
  image,
}: Params): Metadata {
  const canonical =
    `${SEO_CONFIG.siteUrl}/${locale}${pathname}`

  return {
    title,

    description,

    metadataBase: new URL(
      SEO_CONFIG.siteUrl
    ),

    alternates: {
      canonical,

      languages: {
        pt: `${SEO_CONFIG.siteUrl}/pt${pathname}`,

        en: `${SEO_CONFIG.siteUrl}/en${pathname}`,
      },
    },

    openGraph: buildOpenGraph({
      title,
      description,
      pathname,
      locale,
      image,
    }),

    twitter: {
      card: 'summary_large_image',

      title,

      description,

      creator:
        SEO_CONFIG.twitter,

      images: image
        ? [image]
        : [],
    },
  }
}