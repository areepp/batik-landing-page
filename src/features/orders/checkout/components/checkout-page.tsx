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
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { House, Media, Product } from '@/payload-types'
import { formatPrice } from '@/lib/utils'
import { orderSchema } from '../api/order.schema'
import { InputSearchLocation } from '@/components/ui/input-search-location'
import { getShippingCosts, ShippingOption } from '../api/get-shipping-costs'
import { Location } from '../api/search-destination'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useGetCart } from '../../cart/api/cart-queries'
import LoadingSpinner from '@/components/loading-spinner'
import { UploadProofDialog } from './upload-proof-dialog'

export default function CheckoutPage() {
  const router = useRouter()
  const { data: cartData, isPending } = useGetCart()
  const [openProofDialog, setOpenProofDialog] = useState(false)
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [isFetchingShipping, setIsFetchingShipping] = useState(false)

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      recipientName: '',
      phoneNumber: '',
      fullAddress: '',
      email: '',
    },
  })

  useEffect(() => {
    console.log('cartData', cartData?.items)
    if (!cartData?.items) {
      console.log('here')
      router.push('/keranjang')
    }
  }, [cartData])

  const handleLocationSelect = async (location: Location | null) => {
    if (!location) {
      setShippingOptions([])
      form.setValue('shippingOption', null)
      return
    }

    form.setValue('location', location)
    setIsFetchingShipping(true)
    form.setValue('shippingOption', null)

    const house = (cartData?.items?.[0].product as Product).house as House
    const totalWeight =
      cartData?.items?.reduce(
        (acc, item) => acc + ((item.product as Product).weight || 1) * item.quantity,
        0,
      ) ?? 0

    const result = await getShippingCosts({
      origin: Number(house.originCity),
      destination: location.id,
      weight: totalWeight,
    })

    if (result.error) {
      toast.error('Gagal mengambil ongkir', { description: result.error })
      setShippingOptions([])
    } else if (result.data && result.data.length > 0) {
      setShippingOptions(result.data)
      form.setValue('shippingOption', result.data[0]) // Default to the first option
    } else {
      toast.info('Tidak ada opsi pengiriman yang tersedia untuk lokasi ini.')
      setShippingOptions([])
    }
    setIsFetchingShipping(false)
  }

  const subtotal =
    cartData?.items?.reduce(
      (acc, item) => acc + (item.product as Product).price * item.quantity,
      0,
    ) ?? 0
  const shippingCost = form.watch('shippingOption')?.cost ?? 0

  async function handleProceedCheckout() {
    const allFields = Object.keys(form.getValues())

    const fieldsToValidate = allFields.filter((fieldName) => fieldName !== 'proof_of_file')

    // @ts-expect-error: string[]
    const validated = await form.trigger(fieldsToValidate)

    if (validated) {
      setOpenProofDialog(true)
    } else {
      toast.error('Pastikan form terlah terisi semua.')
    }
  }

  if (isPending) {
    return (
      <div className="container mx-auto flex items-center justify-center w-full max-w-7xl">
        <LoadingSpinner />
      </div>
    )
  }

  if (!cartData?.items) {
    return
  }

  return (
    <div className="mt-12 container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
      <Form {...form}>
        <form className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
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
                <InputSearchLocation onSelect={handleLocationSelect} />
              </FormItem>

              {isFetchingShipping && (
                <p className="text-sm text-muted-foreground">Mencari opsi pengiriman...</p>
              )}
              {shippingOptions.length > 0 && (
                <div className="mt-6">
                  <FormLabel className="mb-3">Pilih Metode Pengiriman</FormLabel>
                  <RadioGroup
                    value={
                      form.watch('shippingOption')
                        ? JSON.stringify(form.watch('shippingOption'))
                        : undefined
                    }
                    onValueChange={(value) => form.setValue('shippingOption', JSON.parse(value))}
                    className="grid gap-4"
                  >
                    {shippingOptions.map((opt) => (
                      <FormItem key={opt.service} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={JSON.stringify(opt)} />
                        </FormControl>
                        <FormLabel className="font-normal w-full flex justify-between cursor-pointer">
                          <span>
                            {opt.name} {opt.service} - {opt.etd}
                          </span>
                          <span>{formatPrice(opt.cost)}</span>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Ringkasan Pesanan</h2>
            <div className="space-y-4">
              {cartData?.items?.map((item) => {
                const product = item.product as Product
                const image = product.images?.[0]?.image as Media
                return (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={image?.url || ''}
                        alt={image?.alt || product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Jumlah: {item.quantity}</p>
                    </div>
                    <p className="text-sm">{formatPrice(product.price * item.quantity)}</p>
                  </div>
                )
              })}
            </div>
            <Separator className="my-6" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos kirim</span>
                <span>
                  {shippingCost ? formatPrice(shippingCost) : 'Lengkapi alamat pengiriman'}
                </span>
              </div>
              <div className="mt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(subtotal + shippingCost)}</span>
              </div>
            </div>
            <Button onClick={handleProceedCheckout} size="lg" className="w-full mt-6">
              Bayar Sekarang
            </Button>
          </div>
        </form>
        <UploadProofDialog isOpen={openProofDialog} onOpenChange={setOpenProofDialog} />
      </Form>
    </div>
  )
}
