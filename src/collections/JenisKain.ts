import { CollectionConfig } from 'payload'

export const JenisKain: CollectionConfig = {
  slug: 'jenis-kain',
  labels: {
    singular: 'Jenis Kain',
    plural: 'Jenis Kain',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Jenis kain yang digunakan untuk batik (misal: Katun, Sutra).',
    hidden: ({ user }) => !user?.roles.includes('admin'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Jenis Kain',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
