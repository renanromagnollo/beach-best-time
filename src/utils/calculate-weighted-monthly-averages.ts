import {
  ClimateData,
  ClimateDataWithYear,
} from '@/domain';

import { getSeason } from './get-season';

export function calculateWeightedMonthlyAverages(
  grouped: Record<string, ClimateDataWithYear>,
  currentYear: number
): ClimateData[] {
  const monthMap: Record<
    string,
    {
      values: ClimateDataWithYear[];
      weights: number[];
    }
  > = {};

  const weights = {
    [currentYear - 3]: 1,
    [currentYear - 2]: 1.5,
    [currentYear - 1]: 2,
  };

  for (const [, data] of Object.entries(grouped)) {
    const {
      month,
      monthNumber,
      year,
      count,
      ...climate
    } = data;

    const avgData: ClimateDataWithYear = {
      month,

      monthNumber,

      year,

      season: climate.season,

      averageTemperature:
        climate.averageTemperature / count,

      precipitation:
        climate.precipitation / count,

      precipitationHours:
        climate.precipitationHours / count,

      cloudCover:
        climate.cloudCover / count,

      hourSun:
        climate.hourSun / count,

      windMax:
        climate.windMax / count,

      count,
    };

    if (!monthMap[month]) {
      monthMap[month] = {
        values: [],
        weights: [],
      };
    }

    monthMap[month].values.push(avgData);

    monthMap[month].weights.push(
      weights[year] || 1
    );
  }

  const result: ClimateData[] = Object.entries(
    monthMap
  ).map(([month, { values, weights }]) => {
    const totalWeight = weights.reduce(
      (a, b) => a + b,
      0
    );

    const weightedAverage = (
      key: keyof ClimateData
    ) =>
      values.reduce(
        (sum, val, i) =>
          sum +
          (val[key] as number) * weights[i],
        0
      ) / totalWeight;

    const monthNumber = values[0].monthNumber;

    const referenceDate = new Date(
      `${currentYear}-${String(monthNumber).padStart(2, '0')}-15`
    );

    const season = getSeason(referenceDate);

    return {
      month,

      monthNumber,

      season,

      averageTemperature: Number(
        weightedAverage('averageTemperature').toFixed(1)
      ),

      precipitation: Number(
        weightedAverage('precipitation').toFixed(1)
      ),

      precipitationHours: Number(
        weightedAverage('precipitationHours').toFixed(1)
      ),

      cloudCover: Number(
        weightedAverage('cloudCover').toFixed(1)
      ),

      hourSun: Number(
        weightedAverage('hourSun').toFixed(1)
      ),

      windMax: Number(
        weightedAverage('windMax').toFixed(1)
      ),
    };
  });

  return result.sort(
    (a, b) => a.monthNumber - b.monthNumber
  );
}