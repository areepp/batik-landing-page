'use server'

import { z } from 'zod'

export type Location = {
  id: number
  label: string
  province_name: string
  city_name: string
  district_name: string
  subdistrict_name: string
  zip_code: string
}

const searchSchema = z.string().min(3, 'Ketik minimal 3 huruf untuk mencari.')

export async function searchDestinations(
  query: string,
): Promise<{ locations?: Location[]; error?: string }> {
  const validation = searchSchema.safeParse(query)
  if (!validation.success) {
    return { error: validation.error.message }
  }

  const searchQuery = validation.data

  try {
    const url = new URL('https://rajaongkir.komerce.id/api/v1/destination/domestic-destination')
    url.searchParams.append('search', searchQuery)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        key: process.env.RAJAONGKIR_API_KEY!,
      },
    })

    if (!response.ok) {
      throw new Error(`RajaOngkir API responded with status ${response.status}`)
    }

    const result = await response.json()

    if (result.meta.status !== 'success' || !result.data) {
      return { locations: [] } // Return empty array if no results found
    }

    return { locations: result.data }
  } catch (error: any) {
    console.error('RajaOngkir Destination Search Error:', error)
    return { error: 'Gagal mencari lokasi tujuan.' }
  }
}
