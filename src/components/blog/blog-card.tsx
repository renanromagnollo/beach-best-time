import { BlogPost } from '@/domain/blog'
import Image from 'next/image'
import Link from 'next/link'

type BlogCardProps = {
  post: BlogPost
  locale: string
}

export function BlogCard({
  post,
  locale,
}: BlogCardProps) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        bg-white
        transition-all
        hover:-translate-y-1
      "
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={post.coverImage.url}
          alt={post.title}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      <div className="p-5">
        <h2
          className="
            text-xl
            font-semibold
            line-clamp-2
          "
        >
          {post.title}
        </h2>

        <p
          className="
            mt-3
            text-sm
            text-zinc-600
            line-clamp-3
          "
        >
          {post.excerpt}
        </p>

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            text-sm
            text-zinc-500
          "
        >
          <span>
            {post.readingTime} min
          </span>

          <span>
            {new Date(
              post.publishedDate
            ).toLocaleDateString(locale)}
          </span>
        </div>
      </div>
    </Link>
  )
}