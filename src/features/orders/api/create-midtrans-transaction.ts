'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import midtransClient from 'midtrans-client'
import { z } from 'zod'
import { orderSchema } from './order.schema'

type CartItem = { product: { id: number }; quantity: number }

export async function createMidtransTransaction(
  cartItems: CartItem[],
  shippingDetails: z.infer<typeof orderSchema>,
) {
  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  const validatedShipping = orderSchema.safeParse(shippingDetails)
  if (!validatedShipping.success) {
    return { error: 'Data pengiriman tidak valid.', details: validatedShipping.error.flatten() }
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
      user: user?.id,
      customerEmail: !user ? validatedShipping.data.email : '',
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
        recipientName: validatedShipping.data.recipientName,
        phoneNumber: validatedShipping.data.phoneNumber,
        fullAddress: validatedShipping.data.fullAddress,
        postalCode: validatedShipping.data.postalCode,
      },
    },
  })

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
  })

  const parameter = {
    transaction_details: {
      order_id: order.orderNumber!,
      gross_amount: total,
    },
    customer_details: {
      first_name: validatedShipping.data.recipientName,
      email: user?.email || validatedShipping.data.email,
      phone: validatedShipping.data.phoneNumber,
      shipping_address: {
        first_name: validatedShipping.data.recipientName,
        address: validatedShipping.data.fullAddress,
        postal_code: validatedShipping.data.postalCode,
      },
    },
  }

  const transaction = await snap.createTransaction(parameter)
  return { token: transaction.token, orderId: order.id }
}
