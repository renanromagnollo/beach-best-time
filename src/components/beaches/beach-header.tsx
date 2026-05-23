import Link from 'next/link'

const MONTHS = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type Props = {
  locale: string

  beach: {
    name: string
    state: string
    slug: string
  }

  bestMonth: {
    month: number
    averageScore: number
    averageTemperatureMax: number
  }
}

export function BeachHeader({
  locale,
  beach,
  bestMonth,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-600 via-cyan-500 to-blue-700 p-10 text-white lg:p-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_30%)]" />

      <div className="relative">
        <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
          Historical Climate Analysis
        </div>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-black lg:text-7xl">
              {beach.name}
            </h1>

            <p className="mt-4 text-xl text-white/90">
              {beach.state}
            </p>

            <p className="mt-6 max-w-2xl text-lg text-white/80">
              Discover the best months
              to visit {beach.name},
              based on historical
              weather conditions,
              sunshine, rainfall and
              climate scores.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
              <div className="text-sm text-white/70">
                Climate Score
              </div>

              <div className="mt-2 text-4xl font-bold">
                {bestMonth.averageScore.toFixed(
                  1
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
              <div className="text-sm text-white/70">
                Best Month
              </div>

              <div className="mt-2 text-2xl font-bold">
                {
                  MONTHS[
                  bestMonth.month
                  ]
                }
              </div>
            </div>

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
              <div className="text-sm text-white/70">
                Avg Temperature
              </div>

              <div className="mt-2 text-2xl font-bold">
                {bestMonth.averageTemperatureMax.toFixed(
                  1
                )}
                °C
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href={`/${locale}/praias`}
            className="inline-flex rounded-xl bg-white px-6 py-4 font-semibold text-sky-700 transition hover:scale-105"
          >
            Explore More Beaches
          </Link>
        </div>
      </div>
    </section>
  )
}