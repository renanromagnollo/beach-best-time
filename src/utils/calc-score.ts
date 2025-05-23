import { ClimateData } from "@/domain";

export function calcScore(data: ClimateData[]): ClimateData[] {
  const WEIGHTS = {
    temperature: 40,
    precipitation: 30,
    sun: 20,
    wind: 10,
    cloudCover: 20,
    precipitationHours: 10,
  };

  return data.map((month) => {
    let score = 0;

    // 🌡️ Temperatura ideal
    if (month.averageTemperature >= 24 && month.averageTemperature <= 32) {
      score += WEIGHTS.temperature;
    } else if (month.averageTemperature >= 21 && month.averageTemperature < 24) {
      score += WEIGHTS.temperature * 0.5;
    } else {
      score += WEIGHTS.temperature * 0.125;
    }

    // 🌧️ Precipitação total (quanto menos, melhor)
    const chuvaScore = Math.max(
      0,
      WEIGHTS.precipitation - (month.precipitation / 150) * WEIGHTS.precipitation
    );
    score += chuvaScore;

    // ☀️ Horas de sol por dia
    if (month.hourSun >= 7) {
      score += WEIGHTS.sun;
    } else if (month.hourSun >= 4) {
      score += WEIGHTS.sun * 0.5;
    }

    // 💨 Vento
    if (month.windMax <= 25) {
      score += WEIGHTS.wind;
    } else if (month.windMax <= 35) {
      score += WEIGHTS.wind * 0.5;
    }

    // ☁️ Cobertura de nuvens (quanto menos, melhor)
    const cloudCoverScore = Math.max(
      0,
      WEIGHTS.cloudCover - (month.cloudCover / 100) * WEIGHTS.cloudCover
    );
    score += cloudCoverScore;

    // 🌧️ Horas de precipitação (quanto menos, melhor)
    const precipitationHoursScore = Math.max(
      0,
      WEIGHTS.precipitationHours - (month.precipitationHours / 6) * WEIGHTS.precipitationHours
    );
    score += precipitationHoursScore;

    // 🏷️ Avaliação final
    let rating: ClimateData["rating"];
    if (score >= 90) rating = "excellent";
    else if (score >= 70) rating = "good";
    else if (score >= 50) rating = "unstable";
    else if (score >= 30) rating = "bad";
    else rating = "terrible";

    return {
      ...month,
      score: parseFloat(score.toFixed(1)),
      rating,
    };
  });
}
