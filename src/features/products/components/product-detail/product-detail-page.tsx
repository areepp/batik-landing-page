import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { ProductImageGallery } from './product-image-gallery'
import { formatPrice } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params

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

  const house = typeof product.house === 'object' ? product.house : null

  return (
    <div className="max-w-11/12 mx-auto px-4">
      <div className="mt-12 flex gap-8 lg:gap-12">
        <ProductImageGallery images={product.images || []} />

        <div className="flex flex-col gap-6 flex-1 max-w-[30rem]">
          <div>
            <div>
              <p className="text-sm">{house?.name}</p>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-muted-foreground">{formatPrice(product.price)}</p>
            </div>
          </div>

          <div className="mt-4 prose dark:prose-invert max-w-none">{product.description}</div>

          {product.details && product.details.length > 0 && (
            <div className="mt-6">
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-semibold">
                    Detail Produk
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {product.details.map((detail, index) => (
                        <li key={index}>{detail.detailItem}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
