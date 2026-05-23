import { ClimateAnalysis, ClimateData } from '@/domain';

export function calcScore(data: ClimateData): ClimateAnalysis {
  const {
    averageTemperature,
    cloudCover,
    hourSun,
    precipitation,
    precipitationHours,
    season,
    windMax,
  } = data;

  const reasons: string[] = [];

  let weightTemp = 1;
  let weightSun = 1;
  let weightRain = 1;
  let weightCloud = 1;
  let weightWind = 1;

  const weightPrecipHours = 0.8;

  switch (season) {
    case 'verão':
      weightSun = 1.5;
      weightRain = 1.2;
      weightTemp = 1.3;
      break;

    case 'inverno':
      weightSun = 1.3;
      weightCloud = 0.8;
      weightTemp = 0.8;
      break;

    case 'outono':
      weightRain = 1.2;
      weightWind = 0.9;
      break;

    case 'primavera':
      weightSun = 1.1;
      weightRain = 1.1;
      break;
  }

  // 🌡️ Temperatura
  const tempScore = Math.max(
    0,
    10 - Math.abs(26 - averageTemperature)
  );

  if (tempScore < 7) {
    reasons.push('Temperatura fora do ideal');
  }

  // 🌧️ Chuva
  const rainScore =
    precipitation <= 1
      ? 10
      : precipitation <= 3
        ? 8
        : precipitation <= 5
          ? 6
          : precipitation <= 8
            ? 4
            : 2;

  if (precipitation > 5) {
    reasons.push('Alta precipitação');
  }

  // ☔ Horas de chuva
  const rainHourScore = Math.max(
    0,
    10 - precipitationHours * 2
  );

  if (precipitationHours > 3) {
    reasons.push('Muitas horas de chuva');
  }

  // ☁️ Nuvens
  const cloudScore = Math.max(
    0,
    10 - cloudCover / 10
  );

  if (cloudCover > 60) {
    reasons.push('Muita nebulosidade');
  }

  // ☀️ Sol
  const sunScore = Math.min(
    (hourSun / 8) * 10,
    10
  );

  if (hourSun < 5) {
    reasons.push('Poucas horas de sol');
  }

  // 💨 Vento
  const windScore =
    windMax <= 15
      ? 10
      : windMax <= 25
        ? 8
        : windMax <= 35
          ? 5
          : 2;

  if (windMax > 30) {
    reasons.push('Vento muito forte');
  }

  const totalScore =
    (
      tempScore * weightTemp +
      rainScore * weightRain +
      rainHourScore * weightPrecipHours +
      cloudScore * weightCloud +
      sunScore * weightSun +
      windScore * weightWind
    ) /
    (
      weightTemp +
      weightRain +
      weightPrecipHours +
      weightCloud +
      weightSun +
      weightWind
    );

  let rating: ClimateAnalysis['rating'];

  if (totalScore >= 8.5) {
    rating = 'excellent';
  } else if (totalScore >= 7) {
    rating = 'good';
  } else if (totalScore >= 5.5) {
    rating = 'unstable';
  } else if (totalScore >= 4) {
    rating = 'bad';
  } else {
    rating = 'terrible';
  }

  return {
    ...data,

    score: Number((totalScore * 10).toFixed(1)),

    rating,

    reasons,
  };
}