import { gql } from 'graphql-request'

import { hygraphClient } from '../client'

import {
  BlogPost,
} from '@/domain/blog'

const QUERY = gql`
  query GetBlogPost(
    $slug: String!
    $locale: Locale!
  ) {
    blogPost(
      where: {
        slug: $slug
      }

      locales: [$locale]
    ) {
      title

      slug

      excerpt

      content {
        html
      }

      seoTitle

      seoDescription

      publishedDate

      featured

      readingTime

      coverImage {
        url
      }

      categories {
        name
        slug
      }

      author {
        name

        avatar {
          url
        }
      }
    }
  }
`

type Params = {
  slug: string
  locale: string
}

type Response = {
  blogPost: BlogPost
}

export async function getBlogPost({
  slug,
  locale,
}: Params) {
  const response =
    await hygraphClient.request<Response>(
      QUERY,
      {
        slug,
        locale,
      }
    )

  return response.blogPost
}