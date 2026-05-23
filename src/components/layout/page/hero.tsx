import { ClimateSummary } from '@/types/climate'
import { getMonthName } from '@/utils/get-month-name'

type BeachHeroProps = {
  name: string
  state: string

  bestMonth: ClimateSummary

  locale: 'pt' | 'en'
}


export function Hero({
  name,
  state,
  bestMonth,
  locale,
}: BeachHeroProps) {
  return (
    <section className="rounded-3xl border p-8">
      <div className="space-y-4">
        <span className="text-sm text-zinc-500">
          {state}
        </span>

        <h1 className="text-4xl font-bold">
          {name}
        </h1>

        <p className="max-w-2xl text-zinc-600">
          {locale === 'pt'
            ? `Os melhores meses para visitar ${name} são principalmente ${getMonthName(
              bestMonth.month,
              locale
            )}.`
            : `The best month to visit ${name} is mainly ${getMonthName(
              bestMonth.month,
              locale
            )}.`}
        </p>
      </div>
    </section>
  )
}