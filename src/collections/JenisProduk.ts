import { CollectionConfig } from 'payload'

export const JenisProduk: CollectionConfig = {
  slug: 'jenis-produk',
  labels: {
    singular: 'Jenis Produk',
    plural: 'Jenis Produk',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Jenis produk batik (misal: Kain, Kemeja, Celana, Tas, dsb).',
    hidden: ({ user }) => !user?.roles.includes('admin'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Jenis Produk',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
