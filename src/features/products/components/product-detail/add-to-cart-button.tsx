'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Product } from '@/payload-types'
import { Check, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'

export function AddToCartButton({ product }: Readonly<{ product: Product }>) {
  const addItem = useCartStore((state) => state.addItem)
  const items = useCartStore((state) => state.items)

  const [isAdded, setIsAdded] = useState(false)

  const itemInCart = items.some((item) => item.product.id === product.id)

  useEffect(() => {
    if (itemInCart) {
      setIsAdded(true)
      const timer = setTimeout(() => setIsAdded(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [itemInCart, items])

  return (
    <Button onClick={() => addItem(product)} disabled={isAdded}>
      {isAdded ? (
        <>
          <Check className="mr-2 h-5 w-5" /> Added!
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
        </>
      )}
    </Button>
  )
}
