import axios from 'axios';
import { Coords, ClimateData } from "@/domain";
import { groupDailyClimateDataByMonth } from '@/utils/group-daily-climate-data-by-month';
import { calculateWeightedMonthlyAverages } from '@/utils';

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
    const currentYear = new Date().getFullYear();
    // const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${ano}-01-01&end_date=${ano}-12-31&daily=temperature_2m_max,temperature_2m_min,rain_sum,sunshine_duration,windspeed_10m_max,windgusts_10m_max&timezone=America%2FSao_Paulo`;
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${currentYear - 3}-01-01&end_date=${currentYear - 1}-12-31&daily=temperature_2m_max,temperature_2m_min,rain_sum,sunshine_duration,windspeed_10m_max,windgusts_10m_max,cloudcover_mean,precipitation_hours&timezone=America%2FSao_Paulo`;
    // const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${ano}-01-01&end_date=${ano}-12-31&daily=temperature_2m_max,temperature_2m_min,rain_sum,sunshine_duration,windspeed_10m_max,windgusts_10m_max,cloudcover_mean,precipitation_hours,temperature_water_max,temperature_water_min&timezone=America%2FSao_Paulo`;

    try {
      const res = await axios.get(url);
      const days = res.data.daily;
      console.log('data: ', res.data)
      console.log('days: ', days)

      const grouped = groupDailyClimateDataByMonth(days)
      const finalData = calculateWeightedMonthlyAverages(grouped, currentYear);

      return finalData;

    } catch (error) {
      console.error('Erro ao buscar dados climáticos:', error);
      return null;
    }
  }
}