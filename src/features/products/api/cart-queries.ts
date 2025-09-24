import { MutationConfig, QueryConfig } from '@/lib/tanstack-query'
import { addItemToCart, getCart } from './cart-actions'
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const getCartQueryOptions = () =>
  queryOptions({
    queryKey: ['cart'],
    queryFn: getCart,
  })

export const useGetCart = ({
  queryConfig,
}: {
  queryConfig?: QueryConfig<typeof getCartQueryOptions>
} = {}) => useQuery({ ...getCartQueryOptions(), ...queryConfig })

export const useAddItemToCart = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof addItemToCart>
} = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    mutationFn: addItemToCart,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Produk berhasil ditambahkan ke keranjang')
      onSuccess?.(...args)
    },
    onError: (...args) => {
      console.error(args[0])
      toast.error('Terjadi kesalahan saat menambahkan produk ke keranjang')
      onError?.(...args)
    },
    ...restConfig,
  })
}
