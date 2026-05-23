import Link from 'next/link'

import { BeachScoreBadge } from './beach-score-badge'

type BeachCardProps = {
  locale: string

  beach: {
    name: string
    slug: string
    state: string
  }

  bestMonth: {
    month: number
    averageScore: number
  }
}

function getMonthName(
  month: number,
  locale: string
) {
  return new Intl.DateTimeFormat(
    locale,
    {
      month: 'long',
    }
  ).format(
    new Date(2025, month - 1)
  )
}

export function BeachCard({
  locale,
  beach,
  bestMonth,
}: BeachCardProps) {
  const score =
    bestMonth.averageScore

  const scorePercentage =
    Math.min(
      (score / 10) * 100,
      100
    )

  return (
    <Link
      href={`/${locale}/praias/${beach.slug}`}
      className="
        group
        block
        overflow-hidden
        rounded-[28px]
        border
        border-zinc-200
        bg-white
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-sky-300
        hover:shadow-2xl
      "
    >
      {/* TOP AREA */}

      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_30%)]" />

        <div className="absolute left-5 top-5">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            Historical Analysis
          </span>
        </div>

        <div className="absolute bottom-5 left-5 text-white">
          <h2 className="text-2xl font-black">
            {beach.name}
          </h2>

          <p className="text-white/80">
            {beach.state}
          </p>
        </div>
      </div>

      {/* CONTENT */}

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500">
              Climate Score
            </div>

            <div className="mt-1 text-4xl font-black text-zinc-900">
              {score.toFixed(1)}
            </div>
          </div>

          <BeachScoreBadge
            score={score}
          />
        </div>

        {/* SCORE BAR */}

        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
            <span>
              Beach Conditions
            </span>

            <span>
              {scorePercentage.toFixed(
                0
              )}
              %
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-sky-500
                to-cyan-500
              "
              style={{
                width: `${scorePercentage}%`,
              }}
            />
          </div>
        </div>

        {/* BEST MONTH */}

        <div className="rounded-2xl bg-sky-50 p-4">
          <div className="text-xs uppercase tracking-wider text-sky-700">
            Best Month
          </div>

          <div className="mt-1 text-lg font-bold text-sky-900">
            {getMonthName(
              bestMonth.month,
              locale
            )}
          </div>
        </div>

        {/* CTA */}

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-zinc-500">
            View detailed climate
            analysis
          </span>

          <span
            className="
              text-sm
              font-semibold
              text-sky-600
              transition
              group-hover:translate-x-1
            "
          >
            Explore →
          </span>
        </div>
      </div>
    </Link>
  )
}