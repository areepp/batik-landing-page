import { MutationConfig } from '@/lib/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder } from './create-order-action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useRemoveItem } from '../../cart/api/cart-queries'
import { useSelectedHouseAtom } from '../../cart/hooks/use-selected-cart-items'

export const useCreateOrder = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof createOrder>
} = {}) => {
  const [, setSelectedHouseId] = useSelectedHouseAtom()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    mutationFn: createOrder,
    onSuccess: async (...args) => {
      toast.success('Pesanan Anda berhasil dibuat!')
      setSelectedHouseId(null)
      router.push('/keranjang')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      onSuccess?.(...args)
    },
    onError: (...args) => {
      console.error('Gagal membuat pesanan', args[0])
      toast.error('Gagal membuat pesanan.')
      onError?.(...args)
    },

    ...restConfig,
  })
}
