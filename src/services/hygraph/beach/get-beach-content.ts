import { gql } from 'graphql-request'

import { hygraph } from '@/lib/hygraph'

const QUERY = gql`
  query GetBeach(
    $slug: String!
    $locale: Locale!
  ) {
    beach(
      where: {
        slug: $slug
      }

      locales: [$locale]
    ) {
      name
      slug

      seoTitle
      seoDescription

      shortDescription

      state
      country

      latitude
      longitude

      coverImage {
        url
      }
    }
  }
`

type GetBeachContentParams = {
  slug: string
  locale: string
}

export async function getBeachContent({
  slug,
  locale,
}: GetBeachContentParams) {
  const response =
    await hygraph.request(
      QUERY,
      {
        slug,
        locale,
      }
    )

  return response.beach
}