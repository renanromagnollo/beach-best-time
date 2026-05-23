import { beaches } from '@/data/beaches';

export function getBeachBySlug(slug: string) {
  return beaches.find((beach) => beach.slug === slug);
}