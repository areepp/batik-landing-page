import { CollectionConfig } from 'payload'

export const Houses: CollectionConfig = {
  slug: 'houses',
  admin: {
    useAsTitle: 'name',

    description: 'Rumah adalah lini merek atau nama toko.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Rumah',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
      required: false,
    },
  ],
}
