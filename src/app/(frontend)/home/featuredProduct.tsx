import Link from 'next/link'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { Product } from '@/payload-types'
import { ProductCarouselClient } from '@/features/home/components/ProductCarouselClient'

export default async function ProductCarousel() {
  const payload = await getPayload({ config })
  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 8,
  })

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Produk Teratas</h2>
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
