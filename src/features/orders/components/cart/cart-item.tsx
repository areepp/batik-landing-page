'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'
import { X } from 'lucide-react'
import { useCartStore, type CartItem as TCartItem } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const CartItem = ({ item }: { item: TCartItem }) => {
  const removeItem = useCartStore((state) => state.removeItem)
  const image = item.product.images?.[0]?.image as Media

  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || item.product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary" />
          )}
        </div>
        <div>
          <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline">
            {item.product.name}
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            {formatPrice(item.product.price)} x {item.quantity}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="mt-1 h-8 w-8 text-muted-foreground"
          onClick={() => removeItem(item.product.id)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  )
}
