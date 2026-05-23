'use client';

import { useQuery } from '@tanstack/react-query';

import { Beach } from '@/domain/beach';
import { getClimateData } from '@/app/api/statistics-api';


export function useStatistics(
  beach: Beach | null
) {
  return useQuery({
    queryKey: [
      'climate-data',
      beach?.slug,
    ],

    queryFn: async () => {
      if (!beach) {
        return [];
      }

      return await getClimateData(
        beach
      );
    },

    enabled: !!beach,

    staleTime: 1000 * 60 * 60 * 24,
  });
}