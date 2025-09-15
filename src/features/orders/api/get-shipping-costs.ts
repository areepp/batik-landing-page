'use server'

import { z } from 'zod'

const shippingSchema = z.object({
  origin: z.number(),
  destination: z.number(),
  weight: z.number().min(1),
})

export type ShippingOption = {
  service: string
  name: string
  cost: number
  etd: string
}

export async function getShippingCosts(
  data: z.infer<typeof shippingSchema>,
): Promise<{ data?: ShippingOption[]; error?: string }> {
  const validation = shippingSchema.safeParse(data)
  if (!validation.success) {
    return { error: 'Data tidak valid.' }
  }

  const { origin, destination, weight } = validation.data

  try {
    const response = await fetch('https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost', {
      method: 'POST',
      headers: {
        key: process.env.RAJAONGKIR_API_KEY!,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: `origin=${origin}&destination=${destination}&weight=${weight}&courier=jne:jnt:lion`,
    })

    const result = await response.json()

    return result
  } catch (error: any) {
    console.error('RajaOngkir API Error:', error)
    return { error: 'Gagal menghubungi servis pengiriman.' }
  }
}
