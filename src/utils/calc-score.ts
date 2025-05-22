import { ClimateData } from "@/domain";

export function calcScore(data: ClimateData[]): ClimateData[] {
  return data.map((month) => {
    let score = 0;

    // Temperatura ideal: entre 24 e 32°C
    if (month.averageTemperature >= 24 && month.averageTemperature <= 32) {
      score += 40;
    } else if (month.averageTemperature >= 21 && month.averageTemperature < 24) {
      score += 20;
    } else {
      score += 5;
    }

    // Precipitação total
    const chuvaScore = Math.max(0, 30 - (month.precipitation / 150) * 30);
    score += chuvaScore;

    // Sol: mais de 7 horas/dia é excelente
    if (month.hourSun >= 7) {
      score += 20;
    } else if (month.hourSun >= 4) {
      score += 10;
    }

    // Vento: ideal abaixo de 25 km/h
    if (month.windMax <= 25) {
      score += 10;
    } else if (month.windMax <= 35) {
      score += 5;
    }

    // 🌥️ Cobertura de nuvens
    const cloudCoverScore = Math.max(0, 20 - (month.cloudCover / 100) * 20);
    score += cloudCoverScore;

    // 🌧️ Horas de precipitação
    const precipitationHoursScore = Math.max(0, 10 - (month.precipitationHours / 6) * 10);
    score += precipitationHoursScore;

    // 🌊 Temperatura da água
    // let waterTempScore = 0;
    // if (month.waterTemperature >= 24 && month.waterTemperature <= 28) {
    //   waterTempScore = 10;
    // } else if (month.waterTemperature >= 22 && month.waterTemperature < 24) {
    //   waterTempScore = 5;
    // } else if (month.waterTemperature > 28 && month.waterTemperature <= 30) {
    //   waterTempScore = 5;
    // }
    // score += waterTempScore;

    // Avaliação com base na pontuação
    let rating: 'excellent' | 'good' | 'unstable' | 'bad' | 'terrible';

    if (score >= 90) {
      rating = 'excellent';
    } else if (score >= 70) {
      rating = 'good';
    } else if (score >= 50) {
      rating = 'unstable';
    } else if (score >= 30) {
      rating = 'bad';
    } else {
      rating = 'terrible';
    }

    return {
      ...month,
      score: parseFloat(score.toFixed(1)),
      rating,
    };
  });
}
