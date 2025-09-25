'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Product } from '@/payload-types'
import { Check, Loader2, ShoppingCart } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { LoginDialog } from './login-dialog'
import { useAddItemToCart, useGetCart } from '@/features/orders/cart/api/cart-queries'
import Link from 'next/link'

export function AddToCartButton({ product }: Readonly<{ product: Product }>) {
  const { data: userData, isPending: isUserLoading } = useUser()
  const { data: cartData, isPending: isCartLoading } = useGetCart()
  const { mutate, isPending } = useAddItemToCart()
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)

  const isItemInCart = cartData?.items?.some((item) => (item.product as Product)?.id === product.id)

  const handleAddToCart = () => {
    if (!userData) {
      setIsLoginDialogOpen(true)
    } else {
      mutate(product.id)
    }
  }

  if (isUserLoading || isCartLoading) {
    return (
      <Button size="lg" className="w-full" disabled>
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Memuat...
      </Button>
    )
  }

  if (isItemInCart) {
    return (
      <Button asChild size="lg" className="w-full" variant="secondary">
        <Link href="/keranjang">
          <Check className="mr-2 h-5 w-5" />
          Lihat Keranjang
        </Link>
      </Button>
    )
  }

  return (
    <>
      <Button onClick={handleAddToCart} disabled={isPending}>
        {isPending ? (
          'Menambahkan ke keranjang...'
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </>
        )}
      </Button>
      <LoginDialog isOpen={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
    </>
  )
}
