import axios from 'axios';
import { Coords, ClimateData } from "@/domain";

export class StatisticsAPI {
  constructor() { }

  async getCoordsByName(
    locationName: string
  ): Promise<Coords | null> {
    try {
      const query = encodeURIComponent(`${locationName}, Brasil`);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'BeachBestTime/1.0 (renanromagnollo@gmail.com)',
        },
      });

      if (res.data.length === 0) return null;

      const { lat, lon } = res.data[0];
      console.log('latitude, longitude', res.data[0])

      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      };
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      return null;
    }
  }

  async getClimateData({
    latitude,
    longitude,
  }: Coords): Promise<ClimateData[] | null> {
    const ano = new Date().getFullYear() - 2;
    // const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${ano}-01-01&end_date=${ano}-12-31&daily=temperature_2m_max,temperature_2m_min,rain_sum,sunshine_duration,windspeed_10m_max,windgusts_10m_max&timezone=America%2FSao_Paulo`;
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${ano}-01-01&end_date=${ano}-12-31&daily=temperature_2m_max,temperature_2m_min,rain_sum,sunshine_duration,windspeed_10m_max,windgusts_10m_max,cloudcover_mean,precipitation_hours&timezone=America%2FSao_Paulo`;
    // const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${ano}-01-01&end_date=${ano}-12-31&daily=temperature_2m_max,temperature_2m_min,rain_sum,sunshine_duration,windspeed_10m_max,windgusts_10m_max,cloudcover_mean,precipitation_hours,temperature_water_max,temperature_water_min&timezone=America%2FSao_Paulo`;

    try {
      const res = await axios.get(url);
      const days = res.data.daily;
      console.log('days: ', days)

      const months: Record<string, ClimateData> = {};
      const countDays: Record<string, number> = {};

      for (let i = 0; i < days.time.length; i++) {
        const data = new Date(days.time[i]);
        const month = data.toLocaleString('pt-BR', { month: 'long' });

        if (!months[month]) {
          months[month] = {
            month,
            averageTemperature: 0,
            precipitation: 0,
            precipitationHours: 0,
            cloudCover: 0,
            // waterTemperature: 0,
            hourSun: 0,
            windMax: 0,
          };
          countDays[month] = 0;
        }

        const tempMedia = (days.temperature_2m_max[i] + days.temperature_2m_min[i]) / 2;
        // const waterTempMedia = (days.temperature_water_max[i] + days.temperature_water_min[i]) / 2;

        months[month].averageTemperature += tempMedia;
        months[month].precipitation += days.rain_sum[i];
        months[month].hourSun += days.sunshine_duration[i] / 3600;
        months[month].windMax += Math.max(days.windspeed_10m_max[i], days.windgusts_10m_max[i]);
        // months[month].cloudCover += days.cloudcover_mean[i];
        // months[month].precipitationHours += days.precipitation_hours[i];
        // months[month].waterTemperature += waterTempMedia;



        countDays[month]++;
      }

      return Object.values(months).map((m) => {
        const days = countDays[m.month];
        return {
          ...m,
          averageTemperature: parseFloat((m.averageTemperature / days).toFixed(1)),
          precipitation: parseFloat(m.precipitation.toFixed(1)),
          hourSun: parseFloat((m.hourSun / days).toFixed(1)),
          windMax: parseFloat((m.windMax / days).toFixed(1)),
          // cloudCover: parseFloat((m.cloudCover / days).toFixed(1)),
          // precipitationHours: parseFloat((m.precipitationHours / days).toFixed(1)),
          // waterTemperature: parseFloat((m.waterTemperature / days).toFixed(1)),
        };
      });
    } catch (error) {
      console.error('Erro ao buscar dados climáticos:', error);
      return null;
    }
  }
}