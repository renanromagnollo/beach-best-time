import { ClimateData, ClimateDataWithYear } from "@/domain";

export function calculateWeightedMonthlyAverages(
  grouped: Record<string, ClimateDataWithYear>,
  currentYear: number
): ClimateData[] {
  const monthMap: Record<string, { values: ClimateData[]; weights: number[] }> = {};

  const weights = {
    [currentYear - 3]: 1,
    [currentYear - 2]: 1.5,
    [currentYear - 1]: 2,
  };

  for (const [, data] of Object.entries(grouped)) {
    const { month, year, count, ...climate } = data;

    const avgData: ClimateData & { year: number } = {
      month,
      year,
      averageTemperature: climate.averageTemperature / count,
      precipitation: climate.precipitation,
      precipitationHours: climate.precipitationHours / count,
      cloudCover: climate.cloudCover / count,
      hourSun: climate.hourSun / count,
      windMax: climate.windMax / count,
    };

    if (!monthMap[month]) {
      monthMap[month] = { values: [], weights: [] };
    }

    monthMap[month].values.push(avgData);
    monthMap[month].weights.push(weights[year] || 1);
  }

  const result: ClimateData[] = Object.entries(monthMap).map(([month, { values, weights }]) => {
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    const weightedAverage = (key: keyof ClimateData) =>
      values.reduce((sum, val, i) => sum + (val[key] as number) * weights[i], 0) /
      totalWeight;

    return {
      month,
      averageTemperature: parseFloat(weightedAverage('averageTemperature').toFixed(1)),
      precipitation: parseFloat(weightedAverage('precipitation').toFixed(1)),
      precipitationHours: parseFloat(weightedAverage('precipitationHours').toFixed(1)),
      cloudCover: parseFloat(weightedAverage('cloudCover').toFixed(1)),
      hourSun: parseFloat(weightedAverage('hourSun').toFixed(1)),
      windMax: parseFloat(weightedAverage('windMax').toFixed(1)),
    };
  });

  return result;
}
