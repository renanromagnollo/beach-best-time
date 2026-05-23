import { notFound } from 'next/navigation'

import {
  getAllBeaches,
} from '@/services/climate/get-all-beaches'

import {
  getBeachBySlug,
} from '@/services/climate/get-beach-by-slug'

import { BeachHeader } from '@/components/beaches/beach-header'

import { BeachBestMonths } from '@/components/beaches/beach-best-months'

import { BeachInsights } from '@/components/beaches/beach-insights'

import { BeachSummaryTable } from '@/components/beaches/beach-summary-table'

import { BeachScoreCards }
  from '@/components/beaches/beach-score-cards'

import {
  BeachClimateChart,
} from '@/components/beaches/beach-climate-chart'
type BeachPageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const beaches =
    await getAllBeaches()

  return beaches.map((beach) => ({
    slug: beach.beach.slug,
  }))
}

export async function generateMetadata({
  params,
}: BeachPageProps) {
  const { slug } = await params

  const beach =
    await getBeachBySlug(slug)

  return {
    title: `${beach.beach.name} - Melhor época para viajar`,

    description: `Descubra os melhores meses para viajar para ${beach.beach.name}.`,
  }
}

export default async function BeachPage({
  params,
}: BeachPageProps) {
  const { locale, slug } =
    await params

  let beach

  try {
    beach =
      await getBeachBySlug(slug)
  } catch {
    notFound()
  }

  const bestMonths = [
    ...beach.climateSummary,
  ]
    .sort(
      (a, b) =>
        b.averageScore -
        a.averageScore
    )
    .slice(0, 3)

  return (
    <main className="pb-24">
      <div className="mx-auto max-w-7xl space-y-12 px-6 py-12">
        <BeachHeader
          beach={beach.beach}
          bestMonth={bestMonths[0]}
          locale={locale}
        />

        <BeachScoreCards
          summary={
            beach.climateSummary
          }
        />

        <BeachInsights
          insights={
            beach.climateInsights
          }
        />

        <BeachClimateChart
          summary={
            beach.climateSummary
          }
        />

        <BeachBestMonths
          locale={locale}
          months={bestMonths}
        />

        <BeachSummaryTable
          locale={locale}
          summary={
            beach.climateSummary
          }
        />
      </div>

      <section className="mx-auto mt-20 max-w-5xl px-6">
        <div className="rounded-[32px] bg-gradient-to-r from-sky-600 to-blue-700 p-12 text-center text-white">
          <h2 className="text-4xl font-black">
            Ready To Plan Your Trip?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Use historical climate
            intelligence to choose
            the perfect month for
            your next beach vacation.
          </p>

          <div className="mt-8">
            <a
              href={`/${locale}/praias`}
              className="inline-flex rounded-xl bg-white px-6 py-4 font-semibold text-sky-700 transition hover:scale-105"
            >
              Explore More Beaches
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}