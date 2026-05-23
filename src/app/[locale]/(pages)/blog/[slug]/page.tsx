import Image from 'next/image'


import { notFound } from 'next/navigation'

import { BlogRichText } from '@/components/blog/rich-text'

import { RelatedPosts } from '@/components/blog/related-posts'
import { getBlogPostBySlug } from '@/services/hygraph/blog/get-blog-post-by-slug'
import { getRelatedPosts } from '@/services/hygraph/blog/get-related-posts'
import { buildMetadata } from '@/seo/metadata'
import { buildArticleSchema } from '@/seo/schema'



type Props = {
  params: Promise<{
    locale: 'pt' | 'en'
    slug: string
  }>
}


export async function generateMetadata({
  params,
}: Props) {
  const { locale, slug } =
    await params

  const post =
    await getBlogPostBySlug({
      slug,
      locale,
    })

  if (!post) {
    return {}
  }

  return buildMetadata({
    locale,

    pathname: `/blog/${slug}`,

    title: post.title,

    description:
      post.excerpt,

    image:
      post.coverImage.url,
  })
}

export default async function BlogPostPage({
  params,
}: Props) {
  const { slug, locale } =
    await params

  const post =
    await getBlogPostBySlug({
      slug,
      locale,
    })

  if (!post) {
    notFound()
  }

  const relatedPosts =
    await getRelatedPosts({
      slug,
      locale,
    })

  const jsonLd =
    buildArticleSchema({
      title: post.title,

      description:
        post.excerpt,

      image:
        post.coverImage.url,

      publishedAt:
        post.publishedDate,

      author:
        post.author.name,

      url:
        `https://beachbesttime.com/${locale}/blog/${slug}`,
    })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(jsonLd),
        }}
      />

      <main
        className="
          container
          mx-auto
          max-w-4xl
          px-4
          py-10
        "
      >
        <article>
          <header className="mb-10">
            <div
              className="
                relative
                mb-8
                aspect-[16/9]
                overflow-hidden
                rounded-3xl
              "
            >
              <Image
                src={
                  post.coverImage.url
                }
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <h1
              className="
                text-5xl
                font-bold
                leading-tight
              "
            >
              {post.title}
            </h1>

            <p
              className="
                mt-5
                text-xl
                text-zinc-600
              "
            >
              {post.excerpt}
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-4
                text-sm
                text-zinc-500
              "
            >
              <span>
                {post.author.name}
              </span>

              <span>
                {post.readingTime} min
              </span>

              <span>
                {new Date(
                  post.publishedDate
                ).toLocaleDateString(
                  locale
                )}
              </span>
            </div>
          </header>

          <BlogRichText
            content={
              post.content.raw
            }
          />

          <RelatedPosts
            posts={relatedPosts}
            locale={locale}
          />
        </article>
      </main>
    </>
  )
}