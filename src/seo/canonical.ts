import { SEO_CONFIG } from './constants'

type Params = {
  locale: string
  pathname: string
}

export function buildCanonicalUrl({
  locale,
  pathname,
}: Params) {
  return `${SEO_CONFIG.siteUrl}/${locale}${pathname}`
}