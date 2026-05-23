type ArticleSchemaParams = {
  title: string

  description: string

  image: string

  publishedAt: string

  author: string

  url: string
}

export function buildArticleSchema({
  title,
  description,
  image,
  publishedAt,
  author,
  url,
}: ArticleSchemaParams) {
  return {
    '@context':
      'https://schema.org',

    '@type': 'Article',

    headline: title,

    description,

    image,

    author: {
      '@type': 'Person',

      name: author,
    },

    publisher: {
      '@type': 'Organization',

      name: 'Beach Best Time',
    },

    datePublished:
      publishedAt,

    mainEntityOfPage: url,
  }
}