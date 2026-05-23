import { gql } from 'graphql-request'

export const BLOG_POSTS_QUERY = gql`
  query BlogPosts($locale: Locale!) {
    blogPosts(
      locales: [$locale]
      orderBy: publishedDate_DESC
    ) {
      id

      title
      slug
      excerpt

      publishedDate
      readingTime
      featured

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