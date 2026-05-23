import { BeachBestMonths, BeachClimateCards, BeachInsights } from '@/components/layout'
import { Hero } from '@/components/layout/page'
import { getAllBeachesSlugs } from '@/services/climate/get-all-beaches-slugs'
import { getBeachClimate } from '@/services/climate/get-beach-climate'
import { notFound } from 'next/navigation'

type BeachPageProps = {
  params: Promise<{
    locale: 'pt' | 'en'
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs =
    await getAllBeachesSlugs()

  const locales = ['pt', 'en']

  return slugs.flatMap((slug) =>
    locales.map((locale) => ({
      slug,
      locale,
    }))
  )
}

export default async function BeachPage({
  params,
}: BeachPageProps) {
  const { slug, locale } =
    await params

  let data

  try {
    data = await getBeachClimate(slug)
  } catch {
    notFound()
  }

  /**
   * JSON-LD SEO
   */
  const structuredData = {
    '@context': 'https://schema.org',

    '@type': 'TouristDestination',

    name: data.beach.name,

    description:
      locale === 'pt'
        ? `Análise climática da praia ${data.beach.name}`
        : `Climate analysis of ${data.beach.name}`,

    geo: {
      '@type': 'GeoCoordinates',

      latitude:
        data.beach.latitude,

      longitude:
        data.beach.longitude,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData
          ),
        }}
      />

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-10">
        <Hero
          name={data.beach.name}
          state={data.beach.state}
          bestMonth={
            data.bestMonths[0]
          }
          locale={locale}
        />

        <BeachBestMonths
          months={data.bestMonths}
          locale={locale}
        />

        <BeachClimateCards
          summary={
            data.climateSummary
          }
        />

        <BeachInsights
          insights={
            data.climateInsights
          }
        />
      </main>
    </>
  )
}