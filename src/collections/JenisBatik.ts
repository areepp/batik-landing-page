import { CollectionConfig } from 'payload'

export const JenisBatik: CollectionConfig = {
  slug: 'jenis-batik',
  admin: {
    useAsTitle: 'name',
    description: 'Jenis atau teknik pembuatan batik (misal: Tulis, Cap, Printing).',
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
