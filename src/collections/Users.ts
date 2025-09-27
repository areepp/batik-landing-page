import { isAdmin, isAdminOrSelf } from '@/lib/payload-access-control'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles', 'createdAt'],
    hidden: ({ user }) => !user?.roles.includes('admin'),
  },
  access: {
    create: () => true,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      label: 'Peran',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      required: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Customer',
          value: 'customer',
        },
        {
          label: 'Store Admin',
          value: 'store-admin',
        },
      ],
      access: {
        create: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
        read: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
        update: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
      },
    },
    {
      name: 'house',
      label: 'Rumah / merk yang Dikelola',
      type: 'relationship',
      relationTo: 'houses',
      required: false,
      hasMany: false,
      access: {
        create: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
        read: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
        update: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
      },
    },
  ],
}
