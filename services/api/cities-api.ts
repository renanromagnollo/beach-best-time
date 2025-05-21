"server-only"

export class CitiesAPI {
  constructor() { }

  async getCities(location: string): Promise<string[]> {

    try {
      const response = await fetch(
        'https://servicodados.ibge.gov.br/api/v1/localidades/municipios',
        {
          next: {
            revalidate: 60 * 60 * 24 * 30 * 6, //6 meses
          }
        }
      )
      const allCities = await response.json()

      const filtered = allCities
        .filter((city: any) => city.nome.toLowerCase().includes(location))
        .slice(0, 10)

      const cityNames = filtered.map((city: any) => city.nome)

      return cityNames

    } catch (error) {
      console.error('Erro ao buscar cidades: ', error)
      return []
    }
  }
}