import { generateUniqueSlug } from '@/lib/utils'
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
      name: 'slug',
      label: 'Slug Rumah',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [generateUniqueSlug('houses')],
      },
    },
    {
      name: 'logo',
      label: 'Logo Toko',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
      required: false,
    },
    {
      name: 'phoneNumber',
      label: 'Nomor HP (WhatsApp)',
      type: 'text',
      required: true,
    },
    {
      name: 'availableBatikTypes',
      label: 'Jenis Batik yang Dijual',
      type: 'relationship',
      relationTo: 'jenis-batik',
      hasMany: true,
      required: true,
    },
    {
      name: 'availableFabricTypes',
      label: 'Jenis Kain yang Dijual',
      type: 'relationship',
      relationTo: 'jenis-kain',
      hasMany: true,
      required: true,
    },
    {
      name: 'socialMedia',
      label: 'Media Sosial',
      type: 'group',
      fields: [
        {
          name: 'instagramUrl',
          label: 'Link Akun Instagram',
          type: 'text',
        },
        {
          name: 'tiktokUrl',
          label: 'Link Akun TikTok',
          type: 'text',
        },
      ],
    },
    {
      name: 'marketplaces',
      label: 'Marketplace',
      type: 'group',
      fields: [
        {
          name: 'shopeeUrl',
          label: 'Link Toko Shopee',
          type: 'text',
        },
        {
          name: 'tokopediaUrl',
          label: 'Link Toko Tokopedia',
          type: 'text',
        },
      ],
    },
    {
      name: 'originCity',
      label: 'ID Kota Asal Pengiriman',
      type: 'text',
      required: false,
      defaultValue: '62640',
      admin: {
        readOnly: true,
        description:
          'Dapatkan ID Kota dari dokumentasi RajaOngkir. Contact Developer untuk mendapatkan ID daerah asal.',
      },
    },
  ],
}
