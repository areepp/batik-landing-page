import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from '@/payload-types'

export type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  clearCart: () => void
  totalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const { items } = get()
        const existingItemIndex = items.findIndex((item) => item.product.id === product.id)

        if (existingItemIndex !== -1) {
          // If item already exists, update its quantity
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          // Otherwise, add the new item
          set({ items: [...items, { product, quantity }] })
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        })
      },

      increaseQuantity: (productId) => {
        const { items } = get()
        const updatedItems = items.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        )
        set({ items: updatedItems })
      },

      decreaseQuantity: (productId) => {
        const { items } = get()
        const existingItem = items.find((item) => item.product.id === productId)
        // If quantity is more than 1, decrease it. Otherwise, remove the item.
        if (existingItem && existingItem.quantity > 1) {
          const updatedItems = items.map((item) =>
            item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
          )
          set({ items: updatedItems })
        } else {
          set({ items: items.filter((item) => item.product.id !== productId) })
        }
      },

      clearCart: () => {
        set({ items: [] })
      },

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'guest-cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
