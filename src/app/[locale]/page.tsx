import Link from 'next/link'

import { getTranslations } from 'next-intl/server'

import { BeachCard } from '@/components/beaches/beach-card'

import {
  getAllBeaches,
} from '@/services/climate/get-all-beaches'

type HomePageProps = {
  params: Promise<{
    locale: string
  }>
}

export default async function HomePage({
  params,
}: HomePageProps) {
  const { locale } = await params

  const t =
    await getTranslations('home')

  const beaches =
    await getAllBeaches()

  const featuredBeaches =
    beaches
      .map((beach) => ({
        beach: beach.beach,

        bestMonth: [
          ...beach.climateSummary,
        ].sort(
          (a, b) =>
            b.averageScore -
            a.averageScore
        )[0],
      }))
      .slice(0, 6)

  return (
    <main>
      {/* HERO */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-cyan-500 to-blue-700" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              Historical Climate Analysis
            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white md:text-7xl">
              Discover the Best Time
              to Visit Any Beach
            </h1>

            <p className="mt-8 max-w-2xl text-xl text-white/90">
              Compare sunshine,
              rainfall, temperature
              and weather conditions
              using real historical
              climate data.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/praias`}
                className="rounded-xl bg-white px-6 py-4 font-semibold text-sky-700 transition hover:scale-105"
              >
                Explore Beaches
              </Link>

              <Link
                href={`/${locale}/blog`}
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Read Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="mx-auto -mt-12 max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
            <div className="text-4xl font-bold text-sky-600">
              {beaches.length}+
            </div>

            <div className="mt-2 text-zinc-600">
              Beaches
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
            <div className="text-4xl font-bold text-sky-600">
              3
            </div>

            <div className="mt-2 text-zinc-600">
              Years of Historical Data
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
            <div className="text-4xl font-bold text-sky-600">
              12
            </div>

            <div className="mt-2 text-zinc-600">
              Monthly Climate Scores
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
            <div className="text-4xl font-bold text-sky-600">
              100%
            </div>

            <div className="mt-2 text-zinc-600">
              Data Driven Analysis
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BEACHES */}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12">
          <span className="font-medium text-sky-600">
            DESTINATIONS
          </span>

          <h2 className="mt-2 text-4xl font-bold">
            Featured Beaches
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-zinc-600">
            Explore some of the most
            popular beaches and
            discover their best months
            based on historical
            climate conditions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredBeaches.map(
            ({
              beach,
              bestMonth,
            }) => (
              <BeachCard
                key={beach.slug}
                locale={locale}
                beach={beach}
                bestMonth={
                  bestMonth
                }
              />
            )
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <span className="font-medium text-sky-600">
              METHODOLOGY
            </span>

            <h2 className="mt-2 text-4xl font-bold">
              How We Calculate
              Climate Scores
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-4 text-4xl">
                ☀️
              </div>

              <h3 className="text-xl font-bold">
                Historical Weather
              </h3>

              <p className="mt-4 text-zinc-600">
                We analyze years of
                temperature, sunshine,
                rainfall and wind data.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-4 text-4xl">
                📊
              </div>

              <h3 className="text-xl font-bold">
                Climate Scoring
              </h3>

              <p className="mt-4 text-zinc-600">
                Every month receives a
                score based on ideal
                beach conditions.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-4 text-4xl">
                🏆
              </div>

              <h3 className="text-xl font-bold">
                Best Months Ranking
              </h3>

              <p className="mt-4 text-zinc-600">
                We identify the best
                periods to visit each
                destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[32px] bg-gradient-to-r from-sky-600 to-blue-700 p-12 text-center text-white">
          <h2 className="text-4xl font-bold">
            Plan Your Next Beach Trip
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Discover the best months,
            compare destinations and
            travel with confidence
            using historical climate
            insights.
          </p>

          <Link
            href={`/${locale}/praias`}
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-4 font-semibold text-sky-700 transition hover:scale-105"
          >
            Explore Beaches
          </Link>
        </div>
      </section>
    </main>
  )
}