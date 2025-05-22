'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { CheckCircle, ThumbsUp, AlertTriangle, XCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ClimateData } from '@/domain';
import { Card, CardContent } from '../ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface WeatherMonthsProps {
  data: ClimateData[];
}



export function WeatherMonths({ data }: WeatherMonthsProps) {

  const t = useTranslation()

  const colorsSituations = {
    excellent: 'bg-green-500',
    good: 'bg-emerald-400',
    unstable: 'bg-yellow-400',
    bad: 'bg-orange-400',
    terrible: 'bg-red-500',
  };

  const iconsSituations = {
    excellent: <CheckCircle className="w-4 h-4 inline-block mr-1" />,
    good: <ThumbsUp className="w-4 h-4 inline-block mr-1" />,
    unstable: <AlertTriangle className="w-4 h-4 inline-block mr-1" />,
    bad: <XCircle className="w-4 h-4 inline-block mr-1" />,
    terrible: <Zap className="w-4 h-4 inline-block mr-1 rotate-180" />,
  };

  return (
    <div className="space-y-8 mt-10">
      <h2 className="text-2xl font-semibold text-center">Avaliação Mês a Mês</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="m" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((m, index) => (
          <motion.div
            key={m.month}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{m.month.toUpperCase()}</h3>
                  <span
                    className={`text-white text-sm px-2 py-1 rounded-xl flex items-center gap-1 ${colorsSituations[m.rating!]}`}
                  >
                    {iconsSituations[m.rating!]} {m.rating}
                  </span>
                </div>
                <p>🌡️ {t.element.air}: {m.averageTemperature}°C</p>
                <p>☀️ {t.element.sun}: {m.hourSun} h/dia</p>
                <p>🌧️ {t.element.rain}: {m.precipitation} mm/mês</p>
                <p>💨 {t.element.wind}: {m.windMax} km/h</p>
                <p>☁️ {t.element.cloudCover}: {m.cloudCover}%</p>
                <p>☔ {t.element.rainHours}: {m.precipitationHours} h/mês</p>
                <p className="text-sm text-blue-600 font-semibold">⭐ Score: {m.score}/100</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
