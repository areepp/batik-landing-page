import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useGetCart } from '../api/cart-queries'
import { House, Product, Cart } from '@/payload-types'

const selectedHouseAtom = atomWithStorage<number | null>('selectedHouse', null)
export const useSelectedHouseAtom = () => useAtom(selectedHouseAtom)

export const useGetSelectedCartItems = () => {
  const [selectedHouseId] = useSelectedHouseAtom()
  const query = useGetCart()

  const groupedItems = query.data?.items?.reduce(
    (acc, item) => {
      const house = (item.product as Product).house as House
      if (!acc[house.id]) {
        acc[house.id] = { house, items: [] }
      }
      acc[house.id].items?.push(item)
      return acc
    },
    {} as Record<number, { house: House; items: Cart['items'] }>,
  )

  const selectedItems = selectedHouseId ? groupedItems?.[selectedHouseId]?.items || [] : []
  const subtotal =
    selectedItems.reduce((acc, item) => acc + (item.product as Product).price * item.quantity, 0) ??
    0

  return { groupedItems, selectedItems, subtotal, isPending: query.isPending }
}
