import { CollectionConfig } from 'payload'

export const JenisBatik: CollectionConfig = {
  slug: 'jenis-batik',
  labels: {
    singular: 'Jenis Batik',
    plural: 'Jenis Batik',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Jenis atau teknik pembuatan batik (misal: Tulis, Cap, Printing).',
    hidden: ({ user }) => !user?.roles.includes('admin'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Jenis Batik',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
