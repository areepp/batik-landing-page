'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Cart, Media, Product } from '@/payload-types'
import { Minus, Plus, X } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useRemoveItem, useUpdateItemQuantity } from '../api/cart-queries'

export const CartItem = ({ item }: { item: NonNullable<Cart['items']>[number] }) => {
  const { mutate: updateQuantity, isPending: isUpdatingQuantity } = useUpdateItemQuantity()
  const { mutate: removeItem, isPending: isRemovingItem } = useRemoveItem()
  const product = item.product as Product

  const image = product.images?.[0]?.image as Media

  const isMutating = isUpdatingQuantity || isRemovingItem

  return (
    <div className="flex items-start justify-between gap-4 py-6 border-b">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
          {image?.url ? (
            <Image src={image.url} alt={image.alt || product.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary" />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Link href={`/products/${product.slug}`} className="font-semibold hover:underline">
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
          <div className="flex items-center border rounded-md w-fit mt-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity({ productId: product.id, quantity: item.quantity - 1 })}
              disabled={isMutating}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity({ productId: product.id, quantity: item.quantity + 1 })}
              disabled={isMutating}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between self-stretch">
        <p className="font-semibold">{formatPrice(product.price * item.quantity)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={() => removeItem(product.id)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  )
}
