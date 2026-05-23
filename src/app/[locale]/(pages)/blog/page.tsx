

import { BlogCard } from '@/components/blog/blog-card'
import { getBlogPosts } from '@/services/hygraph/blog/get-blog-posts'
import { buildMetadata } from '@/seo/metadata'

type Props = {
  params: Promise<{
    locale: 'pt' | 'en'
  }>
}


export async function generateMetadata({
  params,
}: Props) {
  const { locale } = await params

  return buildMetadata({
    locale,

    pathname: '/blog',

    title:
      locale === 'pt'
        ? 'Blog de Praias e Viagens'
        : 'Travel and Beaches Blog',

    description:
      locale === 'pt'
        ? 'Descubra praias, destinos e melhores épocas para viajar.'
        : 'Discover beaches, destinations and best travel seasons.',
  })
}

export default async function BlogPage({
  params,
}: Props) {
  const { locale } = await params

  const posts =
    await getBlogPosts(locale)

  const featuredPosts = posts.filter(
    (post: any) => post.featured
  )

  const regularPosts = posts.filter(
    (post: any) => !post.featured
  )

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-10">
        <h1
          className="
            text-4xl
            font-bold
          "
        >
          {locale === 'pt'
            ? 'Blog'
            : 'Blog'}
        </h1>

        <p
          className="
            mt-3
            text-zinc-600
          "
        >
          {locale === 'pt'
            ? 'Conteúdos sobre praias, viagens e clima ideal.'
            : 'Content about beaches, travel and climate.'}
        </p>
      </header>

      {featuredPosts.length > 0 && (
        <section className="mb-14">
          <h2
            className="
              mb-6
              text-2xl
              font-semibold
            "
          >
            Destaques
          </h2>

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
            "
          >
            {featuredPosts.map(
              (post: any) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  locale={locale}
                />
              )
            )}
          </div>
        </section>
      )}

      <section>
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {regularPosts.map(
            (post: any) => (
              <BlogCard
                key={post.id}
                post={post}
                locale={locale}
              />
            )
          )}
        </div>
      </section>
    </main>
  )
}