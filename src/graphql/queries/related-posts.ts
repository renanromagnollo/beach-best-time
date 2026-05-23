import { gql } from 'graphql-request'

export const RELATED_POSTS_QUERY = gql`
  query RelatedPosts(
    $slug: String!
    $locale: Locale!
  ) {
    blogPosts(
      where: {
        slug_not: $slug
      }

      first: 3

      locales: [$locale]

      orderBy: publishedDate_DESC
    ) {
      id

      title
      slug
      excerpt

      coverImage {
        url
      }

      publishedDate
      readingTime
    }
  }
`