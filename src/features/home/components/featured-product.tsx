import Link from 'next/link'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { ProductCarouselClient } from '@/features/home/components/product-carousel-client'
import { Product } from '@/payload-types'

export default async function ProductCarousel() {
  const payload = await getPayload({ config })
  const LIMIT = 8

  const productCount = await payload.count({
    collection: 'products',
  })

  let products: Array<Product> = []

  if (productCount.totalDocs > 0) {
    if (productCount.totalDocs <= LIMIT) {
      const { docs } = await payload.find({
        collection: 'products',
        depth: 1,
        limit: productCount.totalDocs,
      })
      products = docs
    } else {
      const totalPages = Math.ceil(productCount.totalDocs / LIMIT)
      const randomPage = Math.floor(Math.random() * totalPages) + 1

      const { docs } = await payload.find({
        collection: 'products',
        depth: 1,
        limit: LIMIT,
        page: randomPage,
      })
      products = docs
    }
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8" id="produk-teratas">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Produk Teratas</h2>
          <Link
            href={'/produk'}
            className="font-semibold text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Lihat Semua &rarr;
          </Link>
        </div>
        <ProductCarouselClient products={products} />
      </div>
    </section>
  )
}
