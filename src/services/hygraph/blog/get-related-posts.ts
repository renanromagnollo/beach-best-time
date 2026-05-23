import { hygraph } from '@/lib/hygraph'

import { RELATED_POSTS_QUERY } from '@/graphql/queries/related-posts'

type Params = {
  slug: string
  locale: 'pt' | 'en'
}

export async function getRelatedPosts({
  slug,
  locale,
}: Params) {
  const response = await hygraph.request(
    RELATED_POSTS_QUERY,
    {
      slug,
      locale,
    }
  )

  return response.blogPosts
}