import { ClimateSummary } from '@/types/climate'

type BeachSummaryTableProps = {
  locale: string
  summary: ClimateSummary[]
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

function getScoreColor(
  score: number
) {
  if (score >= 8.5) {
    return {
      bg: 'bg-emerald-50',
      border:
        'border-emerald-200',
      text:
        'text-emerald-700',
    }
  }

  if (score >= 7) {
    return {
      bg: 'bg-sky-50',
      border:
        'border-sky-200',
      text: 'text-sky-700',
    }
  }

  if (score >= 5) {
    return {
      bg: 'bg-amber-50',
      border:
        'border-amber-200',
      text:
        'text-amber-700',
    }
  }

  return {
    bg: 'bg-red-50',
    border:
      'border-red-200',
    text: 'text-red-700',
  }
}

export function BeachSummaryTable({
  locale,
  summary,
}: BeachSummaryTableProps) {
  const sortedSummary =
    [...summary].sort(
      (a, b) =>
        b.averageScore -
        a.averageScore
    )

  const topMonths =
    sortedSummary
      .slice(0, 3)
      .map((m) => m.month)

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-black">
          Climate By Month
        </h2>

        <p className="mt-2 text-zinc-600">
          Historical weather
          conditions throughout
          the year.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {summary.map((month) => {
          const color =
            getScoreColor(
              month.averageScore
            )

          const isTopMonth =
            topMonths.includes(
              month.month
            )

          return (
            <div
              key={month.month}
              className={`
                relative
                overflow-hidden
                rounded-[28px]
                border
                p-6
                transition
                hover:-translate-y-1
                hover:shadow-lg
                ${color.bg}
                ${color.border}
              `}
            >
              {isTopMonth && (
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                    TOP MONTH
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black capitalize">
                  {getMonthName(
                    month.month,
                    locale
                  )}
                </h3>

                <p className="mt-2 text-zinc-500">
                  Historical climate
                  analysis
                </p>
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-zinc-500">
                  Climate Score
                </div>

                <div
                  className={`mt-1 text-5xl font-black ${color.text}`}
                >
                  {month.averageScore.toFixed(
                    1
                  )}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs text-zinc-500">
                  <span>
                    Beach Conditions
                  </span>

                  <span>
                    {Math.round(
                      month.averageScore *
                      10
                    )}
                    %
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-500"
                    style={{
                      width: `${month.averageScore * 10}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/70 p-4 backdrop-blur">
                  <div className="text-xs text-zinc-500">
                    🌡 Temperature
                  </div>

                  <div className="mt-1 text-lg font-bold">
                    {month.averageTemperatureMax.toFixed(
                      1
                    )}
                    °C
                  </div>
                </div>

                <div className="rounded-2xl bg-white/70 p-4 backdrop-blur">
                  <div className="text-xs text-zinc-500">
                    🌧 Rain
                  </div>

                  <div className="mt-1 text-lg font-bold">
                    {month.averageRainSum.toFixed(
                      1
                    )}
                    mm
                  </div>
                </div>

                <div className="rounded-2xl bg-white/70 p-4 backdrop-blur">
                  <div className="text-xs text-zinc-500">
                    ☀ Ideal Days
                  </div>

                  <div className="mt-1 text-lg font-bold">
                    {month.idealDaysPercentage.toFixed(
                      0
                    )}
                    %
                  </div>
                </div>

                <div className="rounded-2xl bg-white/70 p-4 backdrop-blur">
                  <div className="text-xs text-zinc-500">
                    ☁ Clouds
                  </div>

                  <div className="mt-1 text-lg font-bold">
                    {month.averageCloudcoverMean.toFixed(
                      0
                    )}
                    %
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}