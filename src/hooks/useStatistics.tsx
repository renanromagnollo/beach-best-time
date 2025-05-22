
import { useQuery } from '@tanstack/react-query'
import { StatisticsAPI } from '../../services/api/statistics-api'

async function getStatistics(location: string) {
  const apiStatistics = new StatisticsAPI()

  try {

    const coords = await apiStatistics.getCoordsByName(location)

    if (!coords) {
      throw new Error('Localização inválida ou não encontrada.')
    }

    const climateDate = await apiStatistics.getClimateData(coords)

    if (!climateDate) {
      throw new Error('Não foi possível obter os dados climáticos.')
    }


    return climateDate

  } catch (error) {
    console.error(error)
    throw error
  }
}

export function useStatistics(location: string, revalidate: number = 0, refetchOnFocus = false) {
  // const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: [location],
    queryFn: async () => {
      const data = await getStatistics(location)
      return data
    },
    refetchOnWindowFocus: refetchOnFocus,
    enabled: !!location,
    staleTime: Math.max(1000 * 60 * 60 * revalidate, 1000 * 5)
  })

  return query
}