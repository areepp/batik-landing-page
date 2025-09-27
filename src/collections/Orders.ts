import { isCustomer, isHouseOwner, isHouseOwnerFieldAccess } from '@/lib/payload-access-control'
import type { CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    description: 'A collection to store customer orders.',
  },
  access: {
    read: isHouseOwner || isCustomer,
    update: isHouseOwner,
    delete: () => false,
    create: () => true,
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
      hooks: {
        beforeChange: [
          async ({ operation }) => {
            if (operation === 'create') {
              const now = new Date()
              const datePart = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`
              const uniqueId = uuidv4().replace(/-/g, '').substring(0, 13).toUpperCase()
              return `BTK-${datePart}-${uniqueId}`
            }
          },
        ],
      },
    },
    {
      name: 'user',
      label: 'Pelanggan',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'customerEmail',
      label: 'Email Pelanggan',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subtotal',
      label: 'Subtotal',
      type: 'number',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'total',
      label: 'Total Pesanan',
      type: 'number',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      label: 'Status Pesanan',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Menunggu Konfirmasi', value: 'pending' },
        { label: 'Sedang Diproses', value: 'processing' },
        { label: 'Dikirim', value: 'shipped' },
        { label: 'Selesai', value: 'completed' },
        { label: 'Dibatalkan', value: 'cancelled' },
      ],
      required: true,
    },
    {
      name: 'proof_of_payment',
      label: 'Bukti Pembayaran',
      type: 'upload',
      relationTo: 'payment-proofs',
      admin: {
        readOnly: true,
      },
      access: {
        read: ({ req: { user } }) => {
          // If a user has permission to read the parent Order document,
          // they should also have permission to read this field.
          return Boolean(user)
        },
        update: ({ req: { user }, doc }) => {
          if (!user || !doc) return false
          // This check ensures ONLY the customer associated with this specific order
          // can upload or change the proof of payment.
          const customerId = typeof doc.user === 'object' ? doc.user.id : doc.user
          return user.id === customerId
        },
      },
    },
    {
      name: 'trackingNumber',
      label: 'Nomor Resi',
      type: 'text',
      access: {
        read: () => true,
        create: isHouseOwnerFieldAccess,
        update: isHouseOwnerFieldAccess,
      },
    },
    {
      name: 'house',
      label: 'Rumah Penjual',
      type: 'relationship',
      relationTo: 'houses',
      required: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          async ({ data, req, operation, value }) => {
            if (operation === 'create') {
              if (data?.items && data.items.length > 0) {
                const firstProductId =
                  typeof data.items[0].product === 'object'
                    ? data.items[0].product.id
                    : data.items[0].product

                if (firstProductId) {
                  try {
                    const product = await req.payload.findByID({
                      collection: 'products',
                      id: firstProductId,
                      depth: 1,
                    })

                    if (product && typeof product.house === 'object' && product.house !== null) {
                      return product.house.id
                    }
                  } catch (error) {
                    console.error('Error fetching product to set default house:', error)
                    return null
                  }
                }
              }
            }

            return data?.house ?? value
          },
        ],
      },
    },

    {
      name: 'items',
      label: 'Barang Pesanan',
      type: 'array',
      required: true,
      admin: {
        readOnly: true,
      },
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
      name: 'shippingDetails',
      label: 'Detail Pengiriman',
      type: 'group',
      fields: [
        {
          name: 'service',
          label: 'Layanan',
          type: 'text',
          required: true,
        },
        {
          name: 'cost',
          label: 'Biaya',
          type: 'number',
          required: true,
        },
      ],
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'shippingAddress',
      label: 'Alamat Pengiriman',
      type: 'group',
      admin: {
        readOnly: true,
      },
      fields: [
        { name: 'recipientName', label: 'Nama Penerima', type: 'text', required: true },
        { name: 'phoneNumber', label: 'Nomor HP', type: 'text', required: true },
        { name: 'fullAddress', label: 'Alamat Lengkap', type: 'textarea', required: true },
        { name: 'postalCode', label: 'Kode Pos', type: 'text', required: true },
      ],
    },
  ],
}
