import {
  ClimateInsight,
} from '@/services/climate/generate-climate-insights'

type BeachInsightsProps = {
  insights: ClimateInsight[]
}

export function BeachInsights({
  insights,
}: BeachInsightsProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">
          Insights Climáticos
        </h2>

        <p className="mt-2 text-zinc-600">
          Resumo automático das
          condições climáticas.
        </p>
      </div>

      <div className="grid gap-5">
        {insights.map((insight) => (
          <article
            key={insight.month}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {insight.label}
              </h3>

              <div className="text-lg font-bold text-sky-600">
                {insight.score.toFixed(
                  1
                )}
              </div>
            </div>

            <p className="mt-4 text-zinc-700">
              {insight.summary}
            </p>

            <p className="mt-3 text-sm text-zinc-500">
              {
                insight.recommendation
              }
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}