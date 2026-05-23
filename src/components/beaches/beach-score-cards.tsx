type Props = {
  summary: {
    averageScore: number
    averageTemperatureMax: number
    averageRainSum: number
    idealDaysPercentage: number
  }[]
}

export function BeachScoreCards({
  summary,
}: Props) {
  const averageScore =
    summary.reduce(
      (acc, month) =>
        acc + month.averageScore,
      0
    ) / summary.length

  const averageTemperature =
    summary.reduce(
      (acc, month) =>
        acc +
        month.averageTemperatureMax,
      0
    ) / summary.length

  const averageRain =
    summary.reduce(
      (acc, month) =>
        acc + month.averageRainSum,
      0
    ) / summary.length

  const idealDays =
    summary.reduce(
      (acc, month) =>
        acc +
        month.idealDaysPercentage,
      0
    ) / summary.length

  const cards = [
    {
      label: 'Climate Score',
      value:
        averageScore.toFixed(1),
    },

    {
      label: 'Temperature',
      value:
        averageTemperature.toFixed(
          1
        ) + '°C',
    },

    {
      label: 'Rainfall',
      value:
        averageRain.toFixed(1) +
        ' mm',
    },

    {
      label: 'Ideal Days',
      value:
        idealDays.toFixed(0) + '%',
    },
  ]

  return (
    <section>
      <div className="grid gap-6 md:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border bg-white p-8 shadow-sm"
          >
            <div className="text-sm text-zinc-500">
              {card.label}
            </div>

            <div className="mt-3 text-4xl font-bold">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}