import payload from 'payload'

export const seedStoreManagers = async (
  managersData: any[],
  houseIdMap: Record<string, number>,
) => {
  payload.logger.info(`--- Seeding manajer toko... ---`)
  payload.logger.info('Menggunakan email dan password dari file manajer-toko.ts:')

  for (const manager of managersData) {
    const { toko, email, password } = manager
    const houseId = houseIdMap[toko]

    if (!houseId) {
      payload.logger.warn(
        `- Peringatan: Tidak ditemukan Rumah (House) dengan nama "${toko}". Akun manajer dilewati.`,
      )
      continue
    }

    console.log(`- Toko: ${toko}, Email: ${email}, Password: ${password}`)

    try {
      const { docs } = await payload.find({
        collection: 'users',
        where: { email: { equals: email } },
        limit: 1,
      })

      if (docs.length === 0) {
        await payload.create({
          collection: 'users',
          data: {
            email,
            password,
            roles: ['store-admin'],
            house: houseId,
          },
        })
        payload.logger.info(`  - Akun manajer dibuat untuk: ${toko}`)
      } else {
        payload.logger.info(`  - Akun manajer dilewati (sudah ada): ${toko}`)
      }
    } catch (e) {
      payload.logger.error(`  Error saat membuat akun manajer untuk ${toko}: ${e}`)
    }
  }
}

export const dataManajerToko = [
  {
    toko: 'Batik Welasasih',
    email: 'batikwelasasih@batikpungsari.com',
    password: 'WelasasihBatik8341',
  },
  {
    toko: 'Batik Cahaya Sari',
    email: 'batikcahayasari@batikpungsari.com',
    password: 'SariCahaya2957',
  },
  {
    toko: 'Batik Tresno Kuncoro',
    email: 'batiktresnokuncoro@batikpungsari.com',
    password: 'KuncoroTresno6482',
  },
  {
    toko: 'Batik Nurhasida',
    email: 'batiknurhasida@batikpungsari.com',
    password: 'BatikNurhasida4175',
  },
  {
    toko: 'Batik Dewi Andini',
    email: 'batikdewiandini@batikpungsari.com',
    password: 'AndiniDewi9023',
  },
  {
    toko: 'Batik Batarakresna',
    email: 'batikbatarakresna@batikpungsari.com',
    password: 'BatarakresnaBatik5811',
  },
  {
    toko: 'Batik Lestari',
    email: 'batiklestari@batikpungsari.com',
    password: 'LestariBatik3498',
  },
  {
    toko: 'Batik Sri Mulyani',
    email: 'batiksrimulyani@batikpungsari.com',
    password: 'MulyaniSri7652',
  },
  {
    toko: 'Batik Widowati',
    email: 'batikwidowati@batikpungsari.com',
    password: 'WidowatiBatik2387',
  },
  {
    toko: 'Batik Vivi',
    email: 'batikvivi@batikpungsari.com',
    password: 'ViviBatik6543',
  },
  {
    toko: 'Batik Sea',
    email: 'batiksea@batikpungsari.com',
    password: 'SeaBatik8891',
  },
  {
    toko: 'Batik Murni Asih',
    email: 'batikmurniasih@batikpungsari.com',
    password: 'AsihMurni4732',
  },
  {
    toko: 'Batik Asha',
    email: 'batikasha@batikpungsari.com',
    password: 'AshaBatik1290',
  },
  {
    toko: 'Batik Miyayi',
    email: 'batikmiyayi@batikpungsari.com',
    password: 'MiyayiBatik7854',
  },
]
