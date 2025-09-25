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
          <Link href="/produk">Lanjutkan Belanja</Link>
        </Button>
      </main>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-xl font-bold tracking-tight mb-8">Keranjang Belanja</h1>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-2">
          <div>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 lg:border-l lg:pl-8">
          <h2 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h2>
          <div className="grid gap-4">
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
          </div>
          <Button size="lg" className="w-full mt-6" asChild>
            <Link href="/checkout">Lanjutkan ke Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
