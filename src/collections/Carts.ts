import { isOwner } from '@/lib/payload-access-control'
import type { CollectionConfig } from 'payload'

export const Carts: CollectionConfig = {
  slug: 'carts',
  labels: {
    singular: 'Keranjang',
    plural: 'Keranjang',
  },
  admin: {
    useAsTitle: 'user',
    description: 'Keranjang belanja milik setiap pelanggan.',
    hidden: true,
  },
  access: {
    create: ({ req: { user } }) => !!user,
    read: isOwner,
    update: isOwner,
    delete: isOwner,
  },
  fields: [
    {
      name: 'user',
      label: 'Pengguna',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true, // Each user can only have one cart
      hasMany: false,
    },
    {
      name: 'items',
      label: 'Isi Keranjang',
      type: 'array',
      fields: [
        {
          name: 'product',
          label: 'Produk',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          label: 'Jumlah',
          type: 'number',
          min: 1,
          required: true,
        },
      ],
    },
  ],
}
