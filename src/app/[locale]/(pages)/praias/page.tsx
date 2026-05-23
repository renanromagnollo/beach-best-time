import Link from 'next/link'

import {
  getAllBeaches,
} from '@/services/climate/get-all-beaches'

import { BeachCard } from '@/components/beaches/beach-card'

type BeachesPageProps = {
  params: Promise<{
    locale: string
  }>
}

export default async function BeachesPage({
  params,
}: BeachesPageProps) {
  const { locale } = await params

  const beaches =
    await getAllBeaches()

  const totalMonthlyAnalysis =
    beaches.length * 12

  const totalClimateRecords =
    beaches.length * 365 * 3

  return (
    <main>
      {/* HERO */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-cyan-500 to-blue-700" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              Historical Climate Intelligence
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">
              Find The Perfect Beach
            </h1>

            <p className="mt-6 max-w-2xl text-xl text-white/90">
              Compare beaches using
              real historical climate
              data and discover the
              best months to travel.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/${locale}`}
                className="rounded-xl bg-white px-6 py-4 font-semibold text-sky-700 transition hover:scale-105"
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="mx-auto -mt-10 max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
            <div className="text-4xl font-black text-sky-600">
              {beaches.length}
            </div>

            <div className="mt-2 text-zinc-600">
              Beaches Analyzed
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
            <div className="text-4xl font-black text-sky-600">
              {totalMonthlyAnalysis}
            </div>

            <div className="mt-2 text-zinc-600">
              Monthly Climate Analyses
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
            <div className="text-4xl font-black text-sky-600">
              {totalClimateRecords.toLocaleString()}
            </div>

            <div className="mt-2 text-zinc-600">
              Historical Records
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <span className="font-semibold uppercase tracking-wider text-sky-600">
            Destinations
          </span>

          <h2 className="mt-3 text-4xl font-black">
            Explore Beaches
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Every destination is
            analyzed using historical
            weather information,
            including rainfall,
            sunshine duration,
            temperature, cloud cover,
            wind conditions and our
            proprietary climate score.
          </p>
        </div>
      </section>

      {/* BEACHES */}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {beaches.map((beach) => {
            const bestMonth =
              [
                ...beach.climateSummary,
              ].sort(
                (a, b) =>
                  b.averageScore -
                  a.averageScore
              )[0]

            return (
              <BeachCard
                key={
                  beach.beach.slug
                }
                locale={locale}
                beach={
                  beach.beach
                }
                bestMonth={
                  bestMonth
                }
              />
            )
          })}
        </div>
      </section>

      {/* CTA */}

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[32px] bg-gradient-to-r from-sky-600 to-blue-700 p-12 text-center text-white">
          <h2 className="text-4xl font-black">
            Start Planning Your
            Next Beach Vacation
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Discover when each beach
            is at its best and travel
            with confidence using
            historical climate
            intelligence.
          </p>

          <Link
            href={`/${locale}`}
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-4 font-semibold text-sky-700 transition hover:scale-105"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  )
}