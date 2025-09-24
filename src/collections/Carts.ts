import { isOwner } from '@/lib/payload-access-control'
import type { CollectionConfig } from 'payload'

export const Carts: CollectionConfig = {
  slug: 'carts',
  admin: {
    useAsTitle: 'user',
    description: "Users' shopping carts.",
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
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true, // Each user can only have one cart
      hasMany: false,
    },
    {
      name: 'items',
      label: 'Cart Items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          required: true,
        },
      ],
    },
  ],
}
