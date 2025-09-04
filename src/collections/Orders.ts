import { isAdmin } from '@/lib/payload-access-control'
import type { CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    description: 'A collection to store customer orders.',
  },
  access: {
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    create: () => true, // Allow anyone (including guests) to create an order
  },
  hooks: {
    // This hook runs before a new order is created
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          const now = new Date()
          const datePart = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`
          const uniqueId = uuidv4().replace(/-/g, '').substring(0, 13).toUpperCase()
          data.orderNumber = `BTK-${datePart}-${uniqueId}`
        }
      },
    ],
  },
  fields: [
    {
      name: 'orderNumber',
      label: 'Nomor Pesanan',
      type: 'text',
      admin: {
        readOnly: true,
      },
      unique: true,
    },
    {
      name: 'user',
      label: 'Pelanggan',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
    {
      name: 'customerEmail',
      label: 'Email Pelanggan (Tamu)',
      type: 'email',
      required: true,
    },
    {
      name: 'items',
      label: 'Barang Pesanan',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
        {
          name: 'productName',
          type: 'text',
          label: 'Nama Produk',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          label: 'Harga',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Jumlah',
          required: true,
        },
      ],
    },
    {
      name: 'total',
      label: 'Total Pesanan',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      label: 'Status Pesanan',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Menunggu Pembayaran', value: 'pending' },
        { label: 'Dibayar', value: 'paid' },
        { label: 'Sedang Diproses', value: 'processing' },
        { label: 'Dikirim', value: 'shipped' },
        { label: 'Selesai', value: 'completed' },
        { label: 'Dibatalkan', value: 'cancelled' },
      ],
      required: true,
    },
    {
      name: 'shippingAddress',
      label: 'Alamat Pengiriman',
      type: 'group',
      fields: [
        { name: 'recipientName', label: 'Nama Penerima', type: 'text', required: true },
        { name: 'phoneNumber', label: 'Nomor HP', type: 'text', required: true },
        { name: 'fullAddress', label: 'Alamat Lengkap', type: 'textarea', required: true },
        { name: 'postalCode', label: 'Kode Pos', type: 'text', required: true },
      ],
    },
    {
      name: 'paymentTransactionId',
      label: 'ID Transaksi Pembayaran',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}
