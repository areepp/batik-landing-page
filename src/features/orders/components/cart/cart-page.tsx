'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { CartItem } from './cart-item'

export default function CartPage() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const { items } = useCartStore()

  if (!isClient) {
    return null
  }

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <main className="container flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold tracking-tight">Keranjang Anda Kosong</h1>
        <p className="mt-4 text-muted-foreground">
          Sepertinya Anda belum menambahkan produk apapun.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Lanjutkan Belanja</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="container p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Keranjang Belanja</h1>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="divide-y">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pengiriman</span>
                <span className="text-muted-foreground">Dihitung saat checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full">
                Lanjutkan ke Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
