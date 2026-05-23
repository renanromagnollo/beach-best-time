import { ClimateInsight } from '@/types/climate'

type BeachInsightsProps = {
  insights: ClimateInsight[]
}

export function BeachInsights({
  insights,
}: BeachInsightsProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">
        Insights Climáticos
      </h2>

      <div className="grid gap-4">
        {insights.map((insight) => {
          return (
            <div
              key={insight.month}
              className="rounded-2xl border p-5"
            >
              <div className="space-y-2">
                <h3 className="font-semibold">
                  {insight.label}
                </h3>

                <p>{insight.summary}</p>

                <p className="text-sm text-zinc-500">
                  {
                    insight.recommendation
                  }
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}