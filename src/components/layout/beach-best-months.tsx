import { ClimateSummary } from '@/types/climate'
import { getMonthName } from '@/utils/get-month-name'


type BeachBestMonthsProps = {
  months: ClimateSummary[]

  locale: 'pt' | 'en'
}

export function BeachBestMonths({
  months,
  locale,
}: BeachBestMonthsProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">
        {locale === 'pt'
          ? 'Melhores meses'
          : 'Best months'}
      </h2>

      <div className="flex flex-wrap gap-3">
        {months.map((month) => {
          return (
            <div
              key={month.month}
              className="rounded-full border px-4 py-2"
            >
              {getMonthName(
                month.month,
                locale
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}