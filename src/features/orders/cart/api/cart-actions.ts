'use server'

import { headers as getHeaders } from 'next/headers'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { Cart, Product } from '@/payload-types'
import { revalidateTag } from 'next/cache'

const getUser = async () => {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  return user
}

export async function getCart(): Promise<Cart | null> {
  const user = await getUser()
  if (!user) {
    return null
  }
  const payload = await getPayload({ config })

  const { docs: carts } = await payload.find({
    collection: 'carts',
    where: {
      user: {
        equals: user.id,
      },
    },
    depth: 2, // 'depth: 2' is important to get product details and images
  })

  return carts[0] || null
}

export async function addItemToCart(productId: number) {
  const user = await getUser()
  if (!user) throw new Error('You must be logged in to add items.')

  const payload = await getPayload({ config })
  const { docs: carts } = await payload.find({
    collection: 'carts',
    where: { user: { equals: user.id } },
  })
  const [cart] = carts

  if (cart) {
    const existingItemIndex =
      cart.items?.findIndex((item) => (item.product as Product).id === productId) ?? -1

    if (existingItemIndex > -1) {
      const newItems = [...(cart.items || [])]
      newItems[existingItemIndex].quantity += 1
      await payload.update({
        collection: 'carts',
        id: cart.id,
        data: { items: newItems },
      })
    } else {
      const newItems = [...(cart.items || []), { product: productId, quantity: 1 }]
      await payload.update({
        collection: 'carts',
        id: cart.id,
        data: { items: newItems },
      })
    }
  } else {
    await payload.create({
      collection: 'carts',
      data: {
        user: user.id,
        items: [{ product: productId, quantity: 1 }],
      },
    })
  }
  revalidateTag('cart')
}

export async function updateItemQuantity({
  productId,
  quantity,
}: {
  productId: number
  quantity: number
}) {
  const user = await getUser()
  if (!user) throw new Error('You must be logged in to update items.')

  const payload = await getPayload({ config })
  const { docs: carts } = await payload.find({
    collection: 'carts',
    where: { user: { equals: user.id } },
  })

  const [cart] = carts
  if (!cart) return

  const itemIndex =
    cart.items?.findIndex((item) => (item.product as Product).id === productId) ?? -1

  if (itemIndex > -1) {
    const newItems = [...(cart.items || [])]
    if (quantity > 0) {
      newItems[itemIndex].quantity = quantity
    } else {
      // If quantity is 0 or less, remove the item
      newItems.splice(itemIndex, 1)
    }

    await payload.update({
      collection: 'carts',
      id: cart.id,
      data: { items: newItems },
    })
    revalidateTag('cart')
  }
}

export async function removeItem(productId: number) {
  const user = await getUser()
  if (!user) throw new Error('You must be logged in to remove items.')

  const payload = await getPayload({ config })
  const { docs: carts } = await payload.find({
    collection: 'carts',
    where: { user: { equals: user.id } },
  })

  const [cart] = carts
  if (!cart) return

  const newItems = cart.items?.filter((item) => (item.product as Product).id !== productId) || []

  await payload.update({
    collection: 'carts',
    id: cart.id,
    data: { items: newItems },
  })
  revalidateTag('cart')
}
