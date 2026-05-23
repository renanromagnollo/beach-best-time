import { gql } from 'graphql-request'

export const BLOG_POST_BY_SLUG_QUERY = gql`
  query BlogPostBySlug(
    $slug: String!
    $locale: Locale!
  ) {
    blogPost(
      where: {
        slug: $slug
      }

      locales: [$locale]
    ) {
      id

      title
      slug
      excerpt

      publishedDate
      readingTime

      content {
        raw
      }

      coverImage {
        url
      }

      author {
        name

        avatar {
          url
        }
      }

      categories {
        name
        slug
      }

      beach {
        name
        slug
      }
    }
  }
`