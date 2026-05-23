import axios from 'axios';

import { Beach } from '@/domain/beach';

import {
  calculateWeightedMonthlyAverages,
  calcScore,
  groupDailyClimateDataByMonth,
} from '@/utils';

export async function getClimateData(
  beach: Beach
) {
  const {
    latitude,
    longitude,
  } = beach;

  const endDate = new Date();

  const startDate = new Date();

  startDate.setFullYear(
    endDate.getFullYear() - 3
  );

  const params = new URLSearchParams({
    latitude: latitude.toString(),

    longitude: longitude.toString(),

    start_date: startDate
      .toISOString()
      .split('T')[0],

    end_date: endDate
      .toISOString()
      .split('T')[0],

    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'rain_sum',
      'sunshine_duration',
      'windspeed_10m_max',
      'windgusts_10m_max',
      'cloudcover_mean',
      'precipitation_hours',
    ].join(','),

    timezone: 'America/Sao_Paulo',
  });

  const url =
    `https://archive-api.open-meteo.com/v1/archive?${params.toString()}`;

  try {
    const response = await axios.get(url, {
      timeout: 30000,
    });

    if (!response.data?.daily?.time) {
      throw new Error(
        'Dados climáticos inválidos'
      );
    }

    const grouped =
      groupDailyClimateDataByMonth(
        response.data.daily
      );

    const averages =
      calculateWeightedMonthlyAverages(
        grouped,
        endDate.getFullYear()
      );

    return averages.map(calcScore);

  } catch (error) {
    console.error(
      'Erro ao buscar dados climáticos:',
      error
    );

    throw new Error(
      'Não foi possível obter os dados climáticos.'
    );
  }
}