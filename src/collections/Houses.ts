import { CollectionConfig } from 'payload'

export const Houses: CollectionConfig = {
  slug: 'houses',
  admin: {
    useAsTitle: 'name',
    description: 'Rumah adalah lini merek atau nama toko.',
    hidden: ({ user }) => !user?.roles.includes('admin'),
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
    {
      name: 'originCity',
      label: 'ID Kota Asal Pengiriman',
      type: 'text',
      required: true,
      defaultValue: '62640',
      admin: {
        readOnly: true,
        description:
          'Dapatkan ID Kota dari dokumentasi RajaOngkir. Contact Developer untuk mendapatkan ID daerah asal.',
      },
    },
  ],
}
