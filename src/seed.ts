import payload, { SanitizedConfig } from 'payload'
import { jenisBatikData } from './seed-data/jenis-kain'
import { jenisKainData } from './seed-data/jenis-batik'
import { getHousesData } from './seed-data/houses'
import { getProductsData } from './seed-data/products'
import { seedStoreManagers } from './seed-data/manajer-toko'
import { jenisProdukData } from './seed-data/jenis-produk'
// import { getArtisansData } from './seed-data/pengrajin-pilihan'
// import { getTestimonialsData } from './seed-data/testimoni'

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
  await seedCollection('jenis-produk', jenisProdukData)

  // Fetch the created categories to get their IDs for relationships
  const allJenisBatik = await payload.find({ collection: 'jenis-batik', limit: 100 })
  const allJenisKain = await payload.find({ collection: 'jenis-kain', limit: 100 })
  const allJenisProduk = await payload.find({ collection: 'jenis-produk', limit: 100 })
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

  const produkIdMap = allJenisProduk.docs.reduce(
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
  await seedStoreManagers(houseIdMap)

  // Seed Produk dengan semua ID yang relevan
  const mediaIds = allMedia.docs.map((doc) => doc.id)
  if (mediaIds.length > 0) {
    const productsData = getProductsData({
      houses: houseIdMap,
      batik: batikIdMap,
      kain: kainIdMap,
      produk: produkIdMap,
      media: mediaIds,
    })
    await seedProducts(productsData)
  } else {
    payload.logger.warn('--- Melewatkan seeding produk karena tidak ada media yang ditemukan. ---')
  }

  // // Seed Pengrajin Pilihan
  // const artisans = getArtisansData(mediaIds)
  // const homePageGlobal = await payload.findGlobal({ slug: 'home-page' })
  // await payload.updateGlobal({
  //   slug: 'home-page',
  //   data: {
  //     ...homePageGlobal,
  //     artisanSection: {
  //       ...(homePageGlobal.artisanSection || {}), // Keep judul/subjudul yang ada
  //       featuredArtisans: artisans,
  //     },
  //   },
  // })
  // payload.logger.info('- Berhasil memperbarui Halaman Beranda dengan data pengrajin unggulan.')

  // // Seed Testimonials
  // const testimonials = getTestimonialsData()
  // await payload.updateGlobal({
  //   slug: 'home-page',
  //   data: {
  //     ...homePageGlobal,
  //     testimonialSection: {
  //       ...(homePageGlobal.testimonialSection || {}),
  //       testimonials: testimonials,
  //     },
  //   },
  // })
  // payload.logger.info('- Berhasil memperbarui Halaman Beranda dengan data testimoni.')

  payload.logger.info('\nDatabase seed completed successfully!')
  process.exit(0)
}
