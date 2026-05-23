import Link from 'next/link'

type Props = {
  locale: string
}

export function Navbar({
  locale,
}: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}`}
          className="text-xl font-black text-sky-600"
        >
          Beach Best Time
        </Link>

        <nav className="flex gap-6">
          <Link
            href={`/${locale}`}
            className="font-medium text-zinc-700 hover:text-sky-600"
          >
            Home
          </Link>

          <Link
            href={`/${locale}/praias`}
            className="font-medium text-zinc-700 hover:text-sky-600"
          >
            Beaches
          </Link>

          <Link
            href={`/${locale}/blog`}
            className="font-medium text-zinc-700 hover:text-sky-600"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  )
}