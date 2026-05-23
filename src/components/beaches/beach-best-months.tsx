type BeachBestMonthsProps = {
  locale: string

  months: Array<{
    month: number
    averageScore: number
  }>
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

export function BeachBestMonths({
  locale,
  months,
}: BeachBestMonthsProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">
          Melhores Meses
        </h2>

        <p className="mt-2 text-zinc-600">
          Meses com melhor clima
          histórico para praia.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {months.map((month) => (
          <div
            key={month.month}
            className="rounded-2xl border border-zinc-200 bg-white p-5"
          >
            <div className="text-lg font-semibold capitalize">
              {getMonthName(
                month.month,
                locale
              )}
            </div>

            <div className="mt-2 text-3xl font-bold text-sky-600">
              {month.averageScore.toFixed(
                1
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}