import { ClimateSummary } from '@/types/climate'

import { ClimateScoreChart } from '../charts/climate-score-chart'

import { ClimateTemperatureChart } from '../charts/climate-temperature-chart'

import { ClimateRainChart } from '../charts/climate-rain-chart'

type BeachClimateOverviewProps = {
  climateSummary: ClimateSummary[]

  locale: 'pt' | 'en'
}

export function BeachClimateOverview({
  climateSummary,
  locale,
}: BeachClimateOverviewProps) {
  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">
          {locale === 'pt'
            ? 'Visão Climática'
            : 'Climate Overview'}
        </h2>

        <p className="text-zinc-600">
          {locale === 'pt'
            ? 'Análise climática completa durante o ano.'
            : 'Complete climate analysis throughout the year.'}
        </p>
      </div>

      <div className="grid gap-8">
        <div className="rounded-3xl border p-6">
          <h3 className="mb-4 text-xl font-semibold">
            {locale === 'pt'
              ? 'Score Climático'
              : 'Climate Score'}
          </h3>

          <ClimateScoreChart
            data={climateSummary}
            locale={locale}
          />
        </div>

        <div className="rounded-3xl border p-6">
          <h3 className="mb-4 text-xl font-semibold">
            {locale === 'pt'
              ? 'Temperaturas'
              : 'Temperatures'}
          </h3>

          <ClimateTemperatureChart
            data={climateSummary}
            locale={locale}
          />
        </div>

        <div className="rounded-3xl border p-6">
          <h3 className="mb-4 text-xl font-semibold">
            {locale === 'pt'
              ? 'Chuvas'
              : 'Rainfall'}
          </h3>

          <ClimateRainChart
            data={climateSummary}
            locale={locale}
          />
        </div>
      </div>
    </section>
  )
}