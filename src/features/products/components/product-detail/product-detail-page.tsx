import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { ProductImageGallery } from './product-image-gallery'
import { AddToCartButton } from './add-to-cart-button'
import { formatPrice } from '@/lib/utils'

const RichText = ({ content }: { content: any[] }) => {
  if (!content) return null
  return (
    <div className="prose dark:prose-invert">
      {content.map((node, i) => {
        if (node.type === 'p' && node.children) {
          return <p key={i}>{node.children.map((leaf: any) => leaf.text).join('')}</p>
        }
        return null
      })}
    </div>
  )
}

type Props = {
  params: {
    slug: string
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = params
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
  })

  const [product] = products

  if (!product) {
    return notFound()
  }

  return (
    <main className="container p-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <ProductImageGallery images={product.images || []} />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-2xl mt-2 text-muted-foreground">{formatPrice(product.price)}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Deskripsi</h2>
            <div className="prose dark:prose-invert max-w-none">{product.description}</div>
          </div>

          <div className="mt-auto">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  )
}
