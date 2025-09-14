'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSnap } from '@/hooks/use-midtrans-snap'
import { useCartStore } from '@/store/cart-store'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { formatPrice } from '@/lib/utils'
import { orderSchema } from '../api/order.schema'
import { createMidtransTransaction } from '../api/create-midtrans-transaction'
import { InputSearchLocation } from '@/components/ui/input-search-location'

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const { snapEmbed } = useSnap()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [transactionToken, setTransactionToken] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      recipientName: '',
      phoneNumber: '',
      fullAddress: '',
      email: '',
    },
  })

  const handlePaymentSuccess = (result: any) => {
    toast.success('Pembayaran berhasil!')
    clearCart()
    // router.push(`/order-confirmation?order_id=${result.order_id}`)
  }

  const handlePaymentPending = (result: any) => {
    toast.info('Menunggu pembayaran Anda.')
    setIsPending(false)
  }

  const handlePaymentError = (result: any) => {
    toast.error('Pembayaran gagal.')
    setIsPending(false)
  }

  const handleModalClose = () => {
    toast.warning('Anda menutup pop-up pembayaran.')
    setIsPending(false)
  }

  const onSubmit = async (values: z.infer<typeof orderSchema>) => {
    setIsPending(true)

    // If a token already exists, the user likely closed the modal. Re-open it.
    if (transactionToken) {
      snapEmbed(transactionToken, {
        onSuccess: handlePaymentSuccess,
        onPending: handlePaymentPending,
        onError: handlePaymentError,
        onClose: handleModalClose,
      })
      return
    }

    try {
      const result = await createMidtransTransaction(items, values)

      if (result.error) {
        toast.error('Gagal memproses checkout.', { description: result.error })
        setIsPending(false)
        return
      }

      if (result.token) {
        setTransactionToken(result.token) // Store the token for retries
        snapEmbed(result.token, {
          onSuccess: handlePaymentSuccess,
          onPending: handlePaymentPending,
          onError: handlePaymentError,
          onClose: handleModalClose,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Terjadi kesalahan saat memproses checkout.')
      setIsPending(false)
    }
  }

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <main className="mt-12 container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Alamat Pengiriman</h2>
            <div className="grid gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Untuk notifikasi pesanan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="recipientName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Penerima</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor HP</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="fullAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Kelurahan / Kode Pos Tujuan</FormLabel>
                <InputSearchLocation
                  onSelect={(location) => {
                    if (location) form.setValue('location', location)
                  }}
                />
              </FormItem>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Ringkasan Pesanan</h2>
            <div className="space-y-4">
              {items.map((item) => {
                const image = item.product.images?.[0]?.image as Media
                return (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={image?.url || ''}
                        alt={image?.alt || item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Jumlah: {item.quantity}</p>
                    </div>
                    <p className="text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                )
              })}
            </div>
            <Separator className="my-6" />
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full mt-6" disabled={isPending}>
              {isPending
                ? transactionToken
                  ? 'Membuka Pembayaran...'
                  : 'Memproses...'
                : 'Bayar Sekarang'}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
