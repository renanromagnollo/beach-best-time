export type BlogCategory = {
  name: string
  slug: string
}

export type BlogAuthor = {
  name: string

  avatar?: {
    url: string
  } | null
}

export type BlogPost = {
  title: string

  slug: string

  excerpt: string

  content: {
    html: string
  }

  seoTitle?: string | null

  seoDescription?: string | null

  publishedDate?: string | null

  featured?: boolean | null

  readingTime?: number | null

  coverImage?: {
    url: string
  } | null

  categories?: BlogCategory[]

  author?: BlogAuthor | null
}