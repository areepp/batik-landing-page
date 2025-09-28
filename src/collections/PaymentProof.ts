import { CollectionConfig } from 'payload'

export const PaymentProofs: CollectionConfig = {
  slug: 'payment-proofs',
  labels: {
    singular: 'Bukti Pembayaran',
    plural: 'Bukti Pembayaran',
  },
  admin: {
    hidden: true,
  },
  access: {
    read: () => true,
    create: () => true,
    // No one should be able to update/delete these directly
    update: () => false,
    delete: () => false,
  },
  upload: {
    allowRestrictedFileTypes: false,
    mimeTypes: ['image/*', 'application/pdf'],
    staticDir: 'payment-proofs',
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const imageMaxSize = 5000 * 1024
        if (data?.mimeType?.startsWith('image/') && data.size > imageMaxSize) {
          throw new Error('Ukuran gambar tidak boleh melebihi 5 MB.')
        }
        // Wajib mengembalikan data di akhir
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Teks Alternatif (Alt Text)',
      type: 'text',
      required: true,
    },
    {
      name: 'prefix',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
  ],
}
