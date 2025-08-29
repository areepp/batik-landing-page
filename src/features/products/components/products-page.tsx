import { getPayload } from 'payload'
import config from '@/payload.config'
import { ProductCard } from './product-card'
import { notFound } from 'next/navigation'

export default async function ProductsPage() {
  const payload = await getPayload({ config })
  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 10,
  })

  if (!products) {
    return notFound()
  }

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Semua Produk</h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
