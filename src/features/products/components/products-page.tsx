import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import { ProductCard } from '@/features/products/components/product-card'
import { House } from '@/payload-types'
import { ProductControls } from './product-controls'
import { SearchBar } from './search-bar'

type ProductsPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const payload = await getPayload({ config })

  const searchQuery = searchParams?.search as string
  const housesQuery = searchParams?.houses as string
  const sortQuery = searchParams?.sort as string

  const where: Where = {}
  if (searchQuery) {
    where.or = [
      {
        name: {
          contains: searchQuery,
        },
      },
    ]
  }

  if (housesQuery) {
    where.house = {
      in: housesQuery.split(','),
    }
  }

  let sort = '-createdAt'
  if (sortQuery) {
    const [field, order] = sortQuery.split('-')
    sort = order === 'desc' ? `-${field}` : field
  }

  const { docs: products } = await payload.find({
    collection: 'products',
    where,
    sort,
    depth: 1,
    limit: 12,
  })

  const { docs: houses } = (await payload.find({
    collection: 'houses',
    depth: 0,
  })) as { docs: House[] }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Katalog Produk</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Jelajahi semua karya otentik dari para pengrajin Batik Sragen.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sticky top-16 bg-background/95 backdrop-blur-sm py-4 z-40">
        <div className="w-full md:flex-1">
          <SearchBar />
        </div>
        <div className="flex-shrink-0">
          <ProductControls houses={houses} />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">Produk Tidak Ditemukan</h3>
          <p className="text-muted-foreground mt-2">
            Coba ubah kata kunci pencarian atau filter Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
