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


type ClimateTemperatureChartProps =
  {
    data: ClimateSummary[]

    locale: 'pt' | 'en'
  }

export function ClimateTemperatureChart({
  data,
  locale,
}: ClimateTemperatureChartProps) {
  const chartData = data.map(
    (month) => ({
      month: getMonthName(
        month.month,
        locale
      ).slice(0, 3),

      max:
        month.averageTemperatureMax.toFixed(
          1
        ),

      min:
        month.averageTemperatureMin.toFixed(
          1
        ),
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

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="max"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="min"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}