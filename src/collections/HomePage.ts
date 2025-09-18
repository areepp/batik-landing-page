import { isAdmin } from '@/lib/payload-access-control'
import { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Halaman Utama',
  admin: {
    hidden: ({ user }) => !user?.roles.includes('admin'),
  },
  fields: [
    {
      name: 'heroSection',
      label: 'Tampilan Utama',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'title',
          label: 'Judul Utama',
          type: 'text',
          required: true,
          defaultValue: 'Mahakarya Batik Sragen',
        },
        {
          name: 'subtitle',
          label: 'Subjudul',
          type: 'text',
          required: true,
          defaultValue: 'Setiap goresan canting menceritakan sebuah kisah warisan budaya.',
        },
        {
          name: 'backgroundVideo',
          label: 'Video Latar Belakang',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'aboutSection',
      label: 'Bagian Tentang Kami',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Judul',
          type: 'text',
          required: true,
          defaultValue: 'Warisan Budaya yang Hidup',
        },
        {
          name: 'paragraph',
          label: 'Paragraf Penjelasan',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          label: 'Gambar',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'artisanSection',
      label: 'Section Carousel Pengrajin',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Judul',
          type: 'text',
          required: true,
          defaultValue: 'Temui Para Pengrajin Kami',
        },
        {
          name: 'subtitle',
          label: 'Subjudul',
          type: 'textarea',
          required: true,
          defaultValue:
            'Berkenalan dengan para maestro di balik setiap karya indah yang Anda temukan di sini.',
        },
        {
          name: 'featuredArtisans',
          label: 'Pengrajin Pilihan (5 Pengrajin)',
          type: 'array',
          minRows: 1,
          maxRows: 5,
          required: true,
          admin: {
            description:
              'Masukkan 5 data pengrajin yang akan ditampilkan di carousel halaman beranda.',
          },
          fields: [
            {
              name: 'name',
              label: 'Nama Pengrajin',
              type: 'text',
              required: true,
            },
            {
              name: 'specialty',
              label: 'Spesialisasi',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              label: 'Foto',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'description',
              label: 'Deskripsi Singkat',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'testimonialSection',
      label: 'Section Testimoni',
      type: 'group',
      fields: [
        {
          name: 'testimonials',
          label: 'Daftar Testimoni (3 testimoni)',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          required: true,
          fields: [
            {
              name: 'name',
              label: 'Nama Pelanggan',
              type: 'text',
              required: true,
            },
            {
              name: 'location',
              label: 'Lokasi',
              type: 'text',
            },
            {
              name: 'rating',
              label: 'Rating (1-5)',
              type: 'number',
              min: 1,
              max: 5,
              required: true,
              defaultValue: 5,
            },
            {
              name: 'comment',
              label: 'Komentar',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
