'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { CartItem } from './cart-item'
import { useGetCart } from '../api/cart-queries'
import { Product } from '@/payload-types'
import { Loader2 } from 'lucide-react'

export default function CartPage() {
  const { data, isPending } = useGetCart()

  const subtotal =
    data?.items?.reduce((acc, item) => acc + (item.product as Product).price * item.quantity, 0) ??
    0

  if (isPending) {
    return (
      <div className="container mx-auto flex items-center justify-center w-full min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!data?.items || data.items.length === 0) {
    return (
      <main className="container flex flex-col items-center justify-center min-h-[60vh] text-center mx-auto max-w-7xl">
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
    <div className="container mx-auto max-w-7xl p-8">
      <h1 className="text-xl font-bold tracking-tight mb-8">Keranjang Belanja</h1>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-2">
          <div>
            {data?.items?.map((item) => (
              <CartItem key={(item.product as Product).id} item={item} />
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
              <span className="text-muted-foreground">Dihitung saat pembayaran</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
          <Button size="lg" className="w-full mt-6" asChild>
            <Link href="/pembayaran">Lanjutkan ke Pembayaran</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
