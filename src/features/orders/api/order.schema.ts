import z from 'zod'

export const orderSchema = z.object({
  recipientName: z.string().min(1, 'Nama penerima wajib diisi'),
  phoneNumber: z.string().min(1, 'Nomor HP wajib diisi'),
  fullAddress: z.string().min(1, 'Alamat lengkap wajib diisi'),
  postalCode: z.string().min(1, 'Kode pos wajib diisi'),
  email: z.email('Email tidak valid'),
})
