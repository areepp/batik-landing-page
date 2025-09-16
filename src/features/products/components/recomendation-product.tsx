import { House, JenisBatik, JenisKain, Product } from '@/payload-types'
import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { ProductCarouselClient } from '@/features/home/components/product-carousel-client'

type IProps = {
  currentProduct: Product
}

export default async function RecomendationProduct({ currentProduct }: IProps) {
  if (!currentProduct) {
    return null
  }

  const payload = await getPayload({ config })

  const houseId = (currentProduct.house as House)?.id
  const jenisBatikItems = currentProduct.jenisBatik as (number | JenisBatik)[] | undefined
  const jenisKainItems = currentProduct.jenisKain as (number | JenisKain)[] | undefined

  const jenisBatikIds =
    jenisBatikItems?.map((item) => (typeof item === 'object' ? item.id : item)) || []
  const jenisKainIds =
    jenisKainItems?.map((item) => (typeof item === 'object' ? item.id : item)) || []

  const orConditions: Where[] = []

  if (houseId) {
    orConditions.push({ house: { equals: houseId } })
  }
  if (jenisBatikIds.length > 0) {
    orConditions.push({ jenisBatik: { in: jenisBatikIds } })
  }
  if (jenisKainIds.length > 0) {
    orConditions.push({ jenisKain: { in: jenisKainIds } })
  }

  if (orConditions.length == 0) {
    return null
  }

  const where: Where = {
    and: [
      {
        id: {
          not_equals: currentProduct.id,
        },
      },
      {
        or: orConditions,
      },
    ],
  }

  const { docs: products } = await payload.find({
    collection: 'products',
    where,
    depth: 1,
    limit: 8,
  })

  if (!products || products.length == 0) {
    return null
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 justify-between mb-8">
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">Anda Mungkin Juga Suka</h2>
          <Link
            href={'/products'}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Lihat Semua &rarr;
          </Link>
        </div>
        <ProductCarouselClient products={products} />
      </div>
    </section>
  )
}
