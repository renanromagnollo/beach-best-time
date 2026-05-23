'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

type Props = {
  summary: {
    month: number
    averageScore: number
    averageTemperatureMax: number
    averageRainSum: number
  }[]
}

export function BeachClimateChart({
  summary,
}: Props) {
  const chartData = summary.map(
    (month) => ({
      month:
        MONTHS[
        month.month - 1
        ],

      score:
        Number(
          month.averageScore.toFixed(
            1
          )
        ),

      temperature:
        Number(
          month.averageTemperatureMax.toFixed(
            1
          )
        ),

      rain:
        Number(
          month.averageRainSum.toFixed(
            1
          )
        ),
    })
  )

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Climate Overview
        </h2>

        <p className="mt-2 text-zinc-600">
          Historical climate analysis
          throughout the year.
        </p>
      </div>

      <div className="h-[450px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              name="Climate Score"
              stroke="#0284c7"
              strokeWidth={4}
              dot={{
                r: 5,
              }}
            />

            <Line
              type="monotone"
              dataKey="temperature"
              name="Temperature"
              stroke="#f97316"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}