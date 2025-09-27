// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig, Plugin } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Carts } from './collections/Carts'
import { Houses } from './collections/Houses'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'
import { JenisBatik } from './collections/JenisBatik'
import { JenisKain } from './collections/JenisKain'
import { HomePage } from './collections/HomePage'
import { PaymentProofs } from './collections/PaymentProof'
import { JenisProduk } from './collections/JenisProduk'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const plugins: Plugin[] = [payloadCloudPlugin()]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    s3Storage({
      collections: {
        media: true,
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET || '',
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
      },
      bucket: process.env.S3_BUCKET || '',
    }),
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  bin: [
    {
      scriptPath: path.resolve(dirname, 'seed.ts'),
      key: 'seed',
    },
  ],
  collections: [
    Users,
    Media,
    Houses,
    Products,
    Carts,
    Orders,
    JenisBatik,
    JenisKain,
    JenisProduk,
    PaymentProofs,
  ],
  globals: [HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins,
  email: resendAdapter({
    defaultFromAddress: 'noreply@notifications.sentrabatikpungsari.com',
    defaultFromName: 'Website Sentra Batik Pungsari',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
})
