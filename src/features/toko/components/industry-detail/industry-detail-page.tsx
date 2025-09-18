import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { House, Product } from '@/payload-types'
import { ProductCard } from '@/features/products/components/product-list/product-card'
import { TokoHeader } from './industry-header'
import { PaginationControls } from '@/features/products/components/product-list/products-pagination'

type Props = {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function IndustryDetailPage({ params, searchParams }: Readonly<Props>) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const searchQuery = (await searchParams)?.search as string
  const page = Number((await searchParams)?.page) || 1

  const { docs: houses } = await payload.find({
    collection: 'houses',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const house = houses[0]

  if (!house) {
    return notFound()
  }

  const {
    docs: products,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = await payload.find({
    collection: 'products',
    where: {
      house: {
        equals: house.id,
      },
    },
    limit: 12,
    depth: 1,
  })

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TokoHeader house={house} />

      <div className="mt-12">
        <h2 className="text-xl font-bold tracking-tight mb-8">Koleksi dari {house.name}</h2>
        {products.length === 0 ? (
          <div className="text-center py-16 bg-muted rounded-lg">
            <p className="text-muted-foreground">Toko ini belum memiliki produk.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12">
              <PaginationControls
                totalPages={totalPages}
                currentPage={page}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
