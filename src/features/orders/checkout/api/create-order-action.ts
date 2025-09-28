'use server'

import { z } from 'zod'
import { Cart, House, Product } from '@/payload-types'
import { newOrderEmail } from '../components/order-email-template'
import { revalidatePath, revalidateTag } from 'next/cache'
import { orderSchema } from './order.schema'
import { getUserOnServer } from '@/features/auth/user/api/user-actions'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function createOrder({
  cartItems,
  shippingDetails,
}: {
  cartItems: Cart['items']
  shippingDetails: z.infer<typeof orderSchema>
}) {
  const user = await getUserOnServer()
  const payload = await getPayload({ config })

  const validatedOrderDetails = orderSchema.safeParse(shippingDetails)
  if (!validatedOrderDetails.success) {
    throw new Error(validatedOrderDetails.error.message)
  }

  if (!cartItems || cartItems.length === 0) {
    throw new Error('Keranjang Anda masih kosong.')
  }

  const file = validatedOrderDetails.data.proof_file
  const fileBuffer = Buffer.from(await file.arrayBuffer())

  // upload the payment proof file
  const proofMedia = await payload.create({
    collection: 'payment-proofs',
    data: {
      alt: `Bukti Pembayaran untuk pesanan`,
    },
    file: {
      data: fileBuffer,
      mimetype: file.type,
      name: file.name,
      size: file.size,
    },
  })

  const house = (cartItems[0].product as Product).house as House
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.product as Product).price * item.quantity,
    0,
  )
  const total = subtotal + (validatedOrderDetails.data.shippingOption?.cost ?? 0)

  // create the order and link it to the uploaded proof
  const order = await payload.create({
    collection: 'orders',
    data: {
      house: house.id,
      user: user?.id,
      customerEmail: validatedOrderDetails.data.email,
      items: cartItems.map((item) => ({
        product: (item.product as Product).id,
        productName: (item.product as Product).name,
        price: (item.product as Product).price,
        quantity: item.quantity,
      })),
      subtotal,
      shippingDetails: {
        cost: validatedOrderDetails.data.shippingOption?.cost ?? 0,
        service: `${validatedOrderDetails.data.shippingOption?.name} ${validatedOrderDetails.data.shippingOption?.service}`,
      },
      total,
      status: 'pending', // Status is now 'waiting-confirmation'
      shippingAddress: {
        recipientName: validatedOrderDetails.data.recipientName,
        phoneNumber: validatedOrderDetails.data.phoneNumber,
        fullAddress: validatedOrderDetails.data.fullAddress,
        postalCode: validatedOrderDetails.data.location.zip_code,
      },
      proof_of_payment: proofMedia.id, // Link to the new media
    },
  })

  const { docs: carts } = await payload.find({
    collection: 'carts',
    where: { user: { equals: user?.id } },
  })
  const [userCart] = carts

  if (userCart) {
    const checkedOutProductIds = cartItems.map((item) => (item.product as Product).id)

    const newCartItems = userCart.items?.filter(
      (item) => !checkedOutProductIds.includes((item.product as Product).id),
    )

    await payload.update({
      collection: 'carts',
      id: userCart.id,
      data: {
        items: newCartItems,
      },
    })
  }

  const orderHtml = await newOrderEmail({ house, order })
  await payload.sendEmail({
    to: house.emailPengelola,
    subject: `Pesanan baru diterima: ${order.id}`,
    html: orderHtml,
  })

  revalidatePath('/orders')
  revalidateTag('cart')
}
