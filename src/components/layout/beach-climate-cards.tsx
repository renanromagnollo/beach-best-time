import { ClimateSummary } from '@/types/climate'

type BeachClimateCardsProps = {
  summary: ClimateSummary[]
}

export function BeachClimateCards({
  summary,
}: BeachClimateCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summary.map((month) => {
        return (
          <div
            key={month.month}
            className="rounded-2xl border p-5"
          >
            <div className="space-y-2">
              <h3 className="font-semibold">
                Mês {month.month}
              </h3>

              <p>
                ☀️ Score:{' '}
                {month.averageScore.toFixed(1)}
              </p>

              <p>
                🌡️ Temp Máx:{' '}
                {month.averageTemperatureMax.toFixed(
                  1
                )}
                °C
              </p>

              <p>
                🌧️ Chuva:{' '}
                {month.averageRainSum.toFixed(
                  1
                )}
                mm
              </p>

              <p>
                😎 Dias ideais:{' '}
                {month.idealDaysPercentage.toFixed(
                  0
                )}
                %
              </p>
            </div>
          </div>
        )
      })}
    </section>
  )
}