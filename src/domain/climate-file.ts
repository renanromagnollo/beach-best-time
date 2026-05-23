import { ClimateAnalysis } from './climate-data';

export type ClimateFile = {
  slug: string;

  generatedAt: string;

  basedOnYears: number[];

  months: ClimateAnalysis[];
};