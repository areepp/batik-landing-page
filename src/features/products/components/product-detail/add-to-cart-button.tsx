'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Product } from '@/payload-types'
import { Check, ShoppingCart } from 'lucide-react'

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart!`)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full" disabled={added}>
      {added ? (
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
