'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import { orderSchema } from '../api/order.schema'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useCreateOrder } from '../api/create-order-queries'
import LoadingSpinner from '@/components/loading-spinner'
import { formatPrice } from '@/lib/utils'
import { House, Product } from '@/payload-types'
import { useGetSelectedCartItems } from '../../cart/hooks/use-selected-cart-items'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadProofDialog({ isOpen, onOpenChange }: Readonly<Props>) {
  const form = useFormContext<z.infer<typeof orderSchema>>()
  const { selectedItems, subtotal } = useGetSelectedCartItems()

  const { mutate, isPending } = useCreateOrder()

  const onSubmit = (data: z.infer<typeof orderSchema>) => {
    mutate(
      { cartItems: selectedItems || [], shippingDetails: data },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      },
    )
  }

  if (!selectedItems || selectedItems.length === 0) return

  const total = subtotal + (form.getValues('shippingOption.cost') ?? 0)

  const house = (selectedItems?.[0].product as Product).house as House

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Pembayaran</DialogTitle>
          <DialogDescription>
            Silakan transfer sesuai nominal ke rekening di bawah ini dan upload bukti transfer Anda.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full items-center gap-2 mt-4">
          <p>
            {house.bankDetails.bankName} - {house.bankDetails.accountNumber}
          </p>
          <p>a.n. {house.bankDetails.accountHolderName}</p>
          <p className="text-xl font-bold">{formatPrice(total)}</p>
          <FormField
            name="proof_file"
            control={form.control}
            render={({ field }) => {
              const { value, ...restOfField } = field
              return (
                <FormItem className="mt-6">
                  <FormLabel>Bukti Transfer</FormLabel>
                  <FormControl>
                    <Input
                      {...restOfField}
                      type="file"
                      accept="image/*, application/pdf"
                      onChange={(event) => field.onChange(event.target.files?.[0])}
                    />
                  </FormControl>
                </FormItem>
              )
            }}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full mt-4"
            disabled={isPending}
          >
            {isPending ? <LoadingSpinner /> : 'Buat Pesanan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
