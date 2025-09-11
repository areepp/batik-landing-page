'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import midtransClient from 'midtrans-client'
import { z } from 'zod'
import { orderSchema } from './order.schema'
import { Product } from '@/payload-types'

type CartItem = { product: Product; quantity: number }

export async function createMidtransTransaction(
  cartItems: CartItem[],
  shippingDetails: z.infer<typeof orderSchema>,
) {
  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  if (!cartItems || cartItems.length === 0) {
    return { error: 'Keranjang belanja Anda kosong.' }
  }

  // Determine the single house for this order from the first item
  const firstItemHouse = cartItems[0].product.house
  const houseId = typeof firstItemHouse === 'object' ? firstItemHouse.id : firstItemHouse

  if (!houseId) {
    return { error: 'Produk dalam keranjang tidak memiliki informasi toko yang valid.' }
  }

  // Business Rule: Ensure all items in the cart are from the SAME house
  const allItemsFromSameHouse = cartItems.every((item) => {
    const itemHouseId =
      typeof item.product.house === 'object' ? item.product.house.id : item.product.house
    return itemHouseId === houseId
  })

  if (!allItemsFromSameHouse) {
    return { error: 'Anda hanya dapat membeli produk dari satu Rumah dalam satu checkout.' }
  }

  // TODO: Fetch the House to get its Midtrans keys
  // const house = await payload.findByID({
  //   collection: 'houses',
  //   id: houseId,
  // })

  // if (!house || !house.midtransServerKey || !house.midtransClientKey) {
  //   return { error: 'Konfigurasi pembayaran untuk toko ini tidak ditemukan.' }
  // }

  const validatedOrderDetails = orderSchema.safeParse(shippingDetails)
  if (!validatedOrderDetails.success) {
    return {
      error: 'Data pengiriman tidak valid.',
      details: z.treeifyError(validatedOrderDetails.error),
    }
  }

  const productIds = cartItems.map((item) => item.product.id)
  const { docs: products } = await payload.find({
    collection: 'products',
    where: { id: { in: productIds } },
    limit: productIds.length,
  })

  const total = cartItems.reduce((acc, cartItem) => {
    const product = products.find((p) => p.id === cartItem.product.id)
    if (!product) throw new Error('Produk tidak ditemukan')
    return acc + product.price * cartItem.quantity
  }, 0)

  const order = await payload.create({
    collection: 'orders',
    data: {
      house: houseId,
      user: user?.id,
      customerEmail: !user ? validatedOrderDetails.data.email : '',
      items: cartItems.map((item) => {
        const product = products.find((p) => p.id === item.product.id)!
        return {
          product: product.id,
          productName: product.name,
          price: product.price,
          quantity: item.quantity,
        }
      }),
      total,
      status: 'pending',
      shippingAddress: {
        recipientName: validatedOrderDetails.data.recipientName,
        phoneNumber: validatedOrderDetails.data.phoneNumber,
        fullAddress: validatedOrderDetails.data.fullAddress,
        postalCode: validatedOrderDetails.data.postalCode,
      },
    },
  })

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
  })

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: order.orderNumber!,
      gross_amount: total,
    },
  })
  return { token: transaction.token, orderId: order.id }
}
