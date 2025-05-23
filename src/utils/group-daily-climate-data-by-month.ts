import { ClimateDataWithYear } from "@/domain";
import { TRawDailyData } from "@/types";

export function groupDailyClimateDataByMonth(days: TRawDailyData): Record<string, ClimateDataWithYear> {
  const grouped: Record<string, ClimateDataWithYear> = {};

  for (let i = 0; i < days.time.length; i++) {
    const date = new Date(days.time[i]);
    const year = date.getFullYear();
    const month = date.toLocaleString('pt-BR', { month: 'long' });
    const key = `${year}-${month}`;

    const tempMax = Number(days.temperature_2m_max[i]) || 0;
    const tempMin = Number(days.temperature_2m_min[i]) || 0;
    const rain = Number(days.rain_sum[i]) || 0;
    const sunshine = Number(days.sunshine_duration[i]) || 0;
    const wind = Number(days.windspeed_10m_max[i]) || 0;
    const gust = Number(days.windgusts_10m_max[i]) || 0;
    const cloud = Number(days.cloudcover_mean[i]) || 0;
    const precipHours = Number(days.precipitation_hours[i]) || 0;

    const tempAvg = (tempMax + tempMin) / 2;

    if (!grouped[key]) {
      grouped[key] = {
        month,
        year,
        averageTemperature: 0,
        precipitation: 0,
        precipitationHours: 0,
        cloudCover: 0,
        hourSun: 0,
        windMax: 0,
        count: 0,
      };
    }

    grouped[key].averageTemperature += tempAvg;
    grouped[key].precipitation += rain;
    grouped[key].precipitationHours += precipHours;
    grouped[key].cloudCover += cloud;
    grouped[key].hourSun += sunshine / 3600;
    grouped[key].windMax += Math.max(wind, gust);
    grouped[key].count += 1;
  }

  return grouped;
}
