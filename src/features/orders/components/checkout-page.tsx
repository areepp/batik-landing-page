'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { useState } from 'react'
import { createMidtransTransaction } from '../api/create-midtrans-transaction'
import { useSnap } from '@/hooks/use-midtrans-snap'
import { useCartStore } from '@/store/cart-store'
import { orderSchema } from '../api/order.schema'

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const { snapEmbed } = useSnap()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [transactionToken, setTransactionToken] = useState<string | null>(null)

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      recipientName: '',
      phoneNumber: '',
      fullAddress: '',
      postalCode: '',
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
    // router.push(`/order-confirmation?order_id=${result.order_id}`)
  }

  const handlePaymentError = (result: any) => {
    toast.error('Pembayaran gagal.')
    setIsPending(false) // Re-enable button on error
  }

  const handleModalClose = () => {
    toast.warning('Anda menutup pop-up pembayaran.')
    setIsPending(false) // CRITICAL: Re-enable the button when modal is closed
  }

  const onSubmit = async (values: z.infer<typeof orderSchema>) => {
    setIsPending(true)

    // If we already have a token, the user closed the modal. Just re-open it.
    if (transactionToken) {
      snapEmbed(transactionToken, {
        onSuccess: handlePaymentSuccess,
        onPending: handlePaymentPending,
        onError: handlePaymentError,
        onClose: handleModalClose,
      })
      return // Stop execution here
    }

    try {
      const result = await createMidtransTransaction(items, values)

      if (result.error) {
        toast.error('Gagal memproses checkout.', { description: result.error })
        setIsPending(false)
        return
      }

      if (result.token) {
        snapEmbed(result.token, {
          onSuccess: handlePaymentSuccess,
          onPending: handlePaymentPending,
          onError: handlePaymentError,
          onClose: handleModalClose,
        })
      }
    } catch (error) {
      toast.error('Terjadi kesalahan yang tidak terduga.')
    } finally {
      // We don't set isPending to false here because the user is redirected to Midtrans
    }
  }

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <main className="container p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          <Card>
            <CardHeader>
              <CardTitle>Alamat Pengiriman</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
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
              <FormField
                name="postalCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Pos</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Display items here if you want */}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                      subtotal,
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Button type="submit" size="lg" className="w-full mt-6" disabled={isPending}>
              {isPending ? 'Memproses...' : 'Bayar Sekarang'}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
