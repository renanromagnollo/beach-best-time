export type Season = 'verão' | 'outono' | 'inverno' | 'primavera';

export type ClimateRating =
  | 'excellent'
  | 'good'
  | 'unstable'
  | 'bad'
  | 'terrible';

export type ClimateData = {
  month: string;
  monthNumber: number;

  season: Season;

  averageTemperature: number;

  precipitation: number;

  precipitationHours: number;

  cloudCover: number;

  hourSun: number;

  windMax: number;
};

export type ClimateAnalysis = ClimateData & {
  score: number;

  rating: ClimateRating;

  reasons: string[];
};

export interface ClimateDataWithYear extends ClimateData {
  year: number;

  count: number;
}