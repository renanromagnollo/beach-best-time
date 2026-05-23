'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

import { ClimateSummary } from '@/types/climate'
import { getMonthName } from '@/utils/get-month-name'


type ClimateRainChartProps = {
  data: ClimateSummary[]

  locale: 'pt' | 'en'
}

export function ClimateRainChart({
  data,
  locale,
}: ClimateRainChartProps) {
  const chartData = data.map(
    (month) => ({
      month: getMonthName(
        month.month,
        locale
      ).slice(0, 3),

      rain:
        month.averageRainSum.toFixed(1),
    })
  )

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="rain" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}