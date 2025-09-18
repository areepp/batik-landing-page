import payload from 'payload'

export const seedStoreManagers = async (houseIdMap: Record<string, number>) => {
  payload.logger.info(`--- Seeding manajer toko... ---`)

  const managersJSON = process.env.INITIAL_STORE_MANAGERS

  if (!managersJSON) {
    payload.logger.info('- Tidak ada data manajer toko')
    return
  }

  const managersData = managersJSON ? JSON.parse(managersJSON) : []

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
