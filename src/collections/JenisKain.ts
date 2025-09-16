import { CollectionConfig } from 'payload'

export const JenisKain: CollectionConfig = {
  slug: 'jenis-kain',
  admin: {
    useAsTitle: 'name',
    description: 'Jenis kain yang digunakan untuk batik (misal: Katun, Sutra).',
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
