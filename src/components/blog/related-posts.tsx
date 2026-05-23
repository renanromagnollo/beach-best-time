import { BlogCard } from './blog-card'

type Props = {
  posts: any[]
  locale: string
}

export function RelatedPosts({
  posts,
  locale,
}: Props) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mt-20">
      <h2
        className="
          mb-8
          text-3xl
          font-bold
        "
      >
        Posts relacionados
      </h2>

      <div
        className="
          grid
          gap-6
          md:grid-cols-3
        "
      >
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            locale={locale}
          />
        ))}
      </div>
    </section>
  )
}