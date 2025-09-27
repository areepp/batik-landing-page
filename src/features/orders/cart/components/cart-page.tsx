'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn, formatPrice } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { CartItem } from './cart-item'
import { useGetCart } from '../api/cart-queries'
import { Product } from '@/payload-types'
import { Loader2, TriangleAlert } from 'lucide-react'
import { useGetSelectedCartItems, useSelectedHouseAtom } from '../hooks/use-selected-cart-items'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGetUser } from '@/features/auth/user/api/get-user'

export default function CartPage() {
  const { data, isPending } = useGetCart()
  const [selectedHouseId, setSelectedHouseId] = useSelectedHouseAtom()
  const { groupedItems, subtotal, selectedItems } = useGetSelectedCartItems()
  const router = useRouter()

  useEffect(() => {
    if (!selectedHouseId && groupedItems) {
      const firstHouseId = Object.keys(groupedItems ?? {})[0]
      setSelectedHouseId(firstHouseId ? Number(firstHouseId) : null)
    }
  }, [groupedItems])

  if (isPending) {
    return (
      <div className="container mx-auto flex items-center justify-center w-full min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!data?.items || data.items.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight">Keranjang Anda Kosong</h1>
        <p className="mt-4 text-muted-foreground">
          Sepertinya Anda belum menambahkan produk apapun.
        </p>
        <Button asChild className="mt-6">
          <Link href="/produk">Lanjutkan Belanja</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl p-8">
      <h1 className="text-xl font-bold tracking-tight">Keranjang Belanja</h1>
      <p className="flex items-center mb-8 mt-3">
        <TriangleAlert className="w-4 h-4 mr-3" /> Anda hanya dapat checkout dari satu toko dalam
        satu transaksi.
      </p>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          {Object.values(groupedItems ?? []).map(({ house, items: houseItems }) => (
            <div
              key={house.id}
              className={cn('px-3 pt-3', selectedHouseId === house.id && 'bg-muted')}
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="house-selection"
                  id={`house-${house.id}`}
                  checked={selectedHouseId === house.id}
                  onChange={() => setSelectedHouseId(house.id)}
                  className="h-5 w-5 accent-primary"
                />
                <label htmlFor={`house-${house.id}`} className="font-bold text-lg cursor-pointer">
                  {house.name}
                </label>
              </div>
              <div className="divide-y">
                {houseItems?.map((item) => (
                  <CartItem key={(item.product as Product).id} item={item} />
                ))}
              </div>
            </div>
          ))}
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
          <Button
            size="lg"
            className="w-full mt-6"
            disabled={!selectedItems || selectedItems.length === 0}
            onClick={() => router.push('/pembayaran')}
          >
            Lanjutkan ke Pembayaran
          </Button>
        </div>
      </div>
    </div>
  )
}
