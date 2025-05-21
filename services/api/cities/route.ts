import { NextResponse } from "next/server";
import { CitiesAPI } from "./cities-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query || query.length < 3) {
    return NextResponse.json([])
  }

  const api = new CitiesAPI()
  const cities = await api.getCities(query.toLowerCase())

  return NextResponse.json(cities)
}