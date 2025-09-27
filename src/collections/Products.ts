import { isHouseOwner, isHouseOwnerOrPublic } from '@/lib/payload-access-control'
import { generateUniqueSlug } from '@/lib/utils'
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    description: 'Produk batik yang akan dijual di situs.',
  },
  access: {
    read: isHouseOwnerOrPublic,
    create: isHouseOwner,
    update: isHouseOwner,
    delete: isHouseOwner,
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Produk',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug Produk',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [generateUniqueSlug('products')],
      },
    },
    {
      name: 'house',
      label: 'Rumah / Lini Merek',
      type: 'relationship',
      relationTo: 'houses',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      defaultValue: ({ user }) => {
        if (user && !user.roles?.includes('admin') && user.house) {
          return typeof user.house === 'object' ? user.house.id : user.house
        }
        return null
      },
      access: {
        update: () => false,
      },
    },
    {
      name: 'price',
      label: 'Harga (dalam IDR)',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'Masukkan harga dalam Rupiah.',
      },
    },
    {
      name: 'description',
      label: 'Deskripsi Produk',
      type: 'textarea',
      required: true,
    },
    {
      name: 'details',
      label: 'Detail Produk',
      type: 'array',
      minRows: 1,
      admin: {
        description: 'Tambahkan detail penting seperti Bahan, Asal, Petunjuk Perawatan, dll.',
      },
      fields: [
        {
          name: 'detailItem',
          label: 'Detail',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'jenisBatik',
      label: 'Jenis Batik',
      type: 'relationship',
      relationTo: 'jenis-batik',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'jenisKain',
      label: 'Jenis Kain',
      type: 'relationship',
      relationTo: 'jenis-kain',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'marketplaceLinks',
      label: 'Link Marketplace',
      type: 'group',
      admin: {
        description: '(Opsional) Tambahkan link jika produk ini dijual di marketplace',
      },
      fields: [
        {
          name: 'shopeeUrl',
          label: 'Link produk di Shopee',
          type: 'text',
        },
        {
          name: 'tokopediaUrl',
          label: 'Link produk di Tokopedia',
          type: 'text',
        },
        {
          name: 'tiktokUrl',
          label: 'Link produk di TikTok',
          type: 'text',
        },
      ],
    },
    {
      name: 'weight',
      label: 'Berat (gram)',
      type: 'number',
      required: true,
      min: 1,
      defaultValue: 300,
      admin: {
        position: 'sidebar',
        description:
          'Masukkan berat produk dalam satuan gram. Akan digunakan saat menghitung ongkir.',
      },
    },
    {
      name: 'images',
      label: 'Gambar Produk',
      type: 'array',
      minRows: 1,
      required: true,
      labels: {
        singular: 'Gambar',
        plural: 'Gambar',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
