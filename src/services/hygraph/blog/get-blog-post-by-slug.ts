import { hygraph } from '@/lib/hygraph'

import { BLOG_POST_BY_SLUG_QUERY } from '@/graphql/queries/blog-post-by-slug'

type Locale = 'pt' | 'en'

type Params = {
  slug: string
  locale: Locale
}

export async function getBlogPostBySlug({
  slug,
  locale,
}: Params) {
  const response = await hygraph.request(
    BLOG_POST_BY_SLUG_QUERY,
    {
      slug,
      locale,
    }
  )

  return response.blogPost
}