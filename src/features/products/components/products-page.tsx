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
    <div className="max-w-11/12 mx-auto px-4">
      <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 gap-y-14">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
