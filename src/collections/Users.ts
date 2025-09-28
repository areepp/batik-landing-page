import { isAdmin, isAdminOrSelf } from '@/lib/payload-access-control'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Pengguna',
    plural: 'Daftar Pengguna',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles', 'createdAt'],
    description: 'Koleksi untuk semua jenis pengguna, termasuk admin, admin toko, dan pelanggan.',
    hidden: ({ user }) => !user?.roles.includes('admin'),
  },
  access: {
    admin: ({ req: { user } }) => {
      if (!user) {
        return false
      }
      if (user.roles?.includes('admin')) {
        return true
      }
      return false
    },
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
          label: 'Pelanggan',
          value: 'customer',
        },
        {
          label: 'Admin Toko',
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
      label: 'Toko / Rumah Batik yang Dikelola',
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
