import { MutationConfig, QueryConfig } from '@/lib/react-query'
import { addItemToCart, getCart, removeItem, updateItemQuantity } from './cart-actions'
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Cart, Product } from '@/payload-types'

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

export const useUpdateItemQuantity = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof updateItemQuantity>
} = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    mutationFn: updateItemQuantity,
    // @ts-expect-error: return type unknown
    onMutate: async ({ productId, quantity }) => {
      // Optimistically update the UI before the server call
      await queryClient.cancelQueries({ queryKey: ['cart'] })
      const previousCart = queryClient.getQueryData<Cart>(['cart'])

      queryClient.setQueryData<Cart | null>(['cart'], (old) => {
        if (!old) return null
        const newItems = old.items?.map((item) =>
          (item.product as Product).id === productId ? { ...item, quantity } : item,
        )
        return { ...old, items: newItems }
      })
      return { previousCart }
    },
    onSuccess: (...args) => {
      toast.success('Produk berhasil ditambahkan ke keranjang')
      onSuccess?.(...args)
    },
    onError: (...args) => {
      queryClient.setQueryData(['cart'], args[2]?.previousCart)
      toast.error('Gagal memperbarui jumlah.')
      onError?.(...args)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    ...restConfig,
  })
}

export const useRemoveItem = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof removeItem>
} = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    mutationFn: removeItem,
    // @ts-expect-error: return type unknown
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] })
      const previousCart = queryClient.getQueryData<Cart>(['cart'])

      queryClient.setQueryData<Cart | null>(['cart'], (old) => {
        if (!old) return null
        const newItems = old.items?.filter((item) => (item.product as Product).id !== productId)
        return { ...old, items: newItems }
      })

      return { previousCart }
    },
    onError: (...args) => {
      queryClient.setQueryData(['cart'], args[2]?.previousCart)
      toast.error('Gagal menghapus produk.')
      onError?.(...args)
    },
    onSuccess: (...args) => {
      toast.success('Produk berhasil dihapus dari keranjang')
      onSuccess?.(...args)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    ...restConfig,
  })
}
