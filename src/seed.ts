import payload, { SanitizedConfig } from 'payload'
import path from 'path'
import dotenv from 'dotenv'
import { jenisBatikData } from './seed-data/jenis-kain'
import { jenisKainData } from './seed-data/jenis-batik'
import { getHousesData } from './seed-data/houses'
import { getProductsData } from './seed-data/products'
import { dataManajerToko, seedStoreManagers } from './seed-data/manajer-toko'

// Fungsi pembantu agar proses seeding tidak berulang (DRY)
const seedCollection = async (slug: string, data: any[]) => {
  console.log(`\n--- Seeding ${slug}... ---`)
  for (const item of data) {
    try {
      const { docs } = await payload.find({
        collection: slug as any,
        where: { name: { equals: item.name } },
        limit: 1,
      })

      if (docs.length === 0) {
        await payload.create({
          collection: slug as any,
          data: item,
        })
        console.log(`- Dibuat: ${item.name}`)
      } else {
        console.log(`- Dilewati (sudah ada): ${item.name}`)
      }
    } catch (e) {
      console.error(`Error saat seeding ${item.name} di ${slug}:`, e)
    }
  }
}

const seedProducts = async (data: any[]) => {
  payload.logger.info(`--- Seeding products... ---`)
  for (const item of data) {
    try {
      const { docs } = await payload.find({
        collection: 'products',
        where: { name: { equals: item.name }, house: { equals: item.house } },
        limit: 1,
      })

      if (docs.length === 0) {
        await payload.create({ collection: 'products', data: item })
        payload.logger.info(`- Dibuat: ${item.name} untuk rumah ID ${item.house}`)
      } else {
        payload.logger.info(`- Dilewati (sudah ada): ${item.name}`)
      }
    } catch (e) {
      payload.logger.error(`Error saat seeding produk ${item.name}: ${e}`)
    }
  }
}

export const script = async (config: SanitizedConfig) => {
  // Initialize Payload
  await payload.init({ config })
  payload.logger.info('Starting database seed...')

  // Seed categories from separate files
  await seedCollection('jenis-batik', jenisBatikData)
  await seedCollection('jenis-kain', jenisKainData)

  // Fetch the created categories to get their IDs for relationships
  const allJenisBatik = await payload.find({ collection: 'jenis-batik', limit: 100 })
  const allJenisKain = await payload.find({ collection: 'jenis-kain', limit: 100 })
  const allMedia = await payload.find({ collection: 'media', limit: 100 })

  // Create a map of name to ID for easy lookup
  const batikIdMap = allJenisBatik.docs.reduce(
    (acc, doc) => {
      acc[doc.name] = doc.id
      return acc
    },
    {} as Record<string, number>,
  )

  const kainIdMap = allJenisKain.docs.reduce(
    (acc, doc) => {
      acc[doc.name] = doc.id
      return acc
    },
    {} as Record<string, number>,
  )

  // Seed the houses collection
  const housesData = getHousesData({ batik: batikIdMap, kain: kainIdMap })
  await seedCollection('houses', housesData)

  // Ambil ID dari Rumah yang baru dibuat
  const allHouses = await payload.find({ collection: 'houses', limit: 100 })
  const houseIdMap = allHouses.docs.reduce((acc, doc) => ({ ...acc, [doc.name]: doc.id }), {})

  // Seed Manajer Toko
  await seedStoreManagers(dataManajerToko, houseIdMap)

  // Seed Produk dengan semua ID yang relevan
  const mediaIds = allMedia.docs.map((doc) => doc.id)
  if (mediaIds.length > 0) {
    const productsData = getProductsData({
      houses: houseIdMap,
      batik: batikIdMap,
      kain: kainIdMap,
      media: mediaIds,
    })
    await seedProducts(productsData)
  } else {
    payload.logger.warn('--- Melewatkan seeding produk karena tidak ada media yang ditemukan. ---')
  }

  payload.logger.info('\nDatabase seed completed successfully!')
  process.exit(0)
}
