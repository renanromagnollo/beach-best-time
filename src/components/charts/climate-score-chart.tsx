'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

import { ClimateSummary } from '@/types/climate'
import { getMonthName } from '@/utils/get-month-name'


type ClimateScoreChartProps = {
  data: ClimateSummary[]

  locale: 'pt' | 'en'
}

export function ClimateScoreChart({
  data,
  locale,
}: ClimateScoreChartProps) {
  const chartData = data.map(
    (month) => ({
      month: getMonthName(
        month.month,
        locale
      ).slice(0, 3),

      score:
        month.averageScore.toFixed(1),
    })
  )

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <YAxis domain={[0, 10]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}