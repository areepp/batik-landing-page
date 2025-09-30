import { type CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    read: () => true,
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
  upload: { allowRestrictedFileTypes: false, mimeTypes: ['image/*', 'video/mp4'] },
}
