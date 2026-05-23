import { hygraph } from '@/lib/hygraph'

import { BLOG_POSTS_QUERY } from '@/graphql/queries/blog-posts'

type Locale = 'pt' | 'en'

export async function getBlogPosts(
  locale: Locale
) {
  const response = await hygraph.request(
    BLOG_POSTS_QUERY,
    {
      locale,
    }
  )

  return response.blogPosts
}