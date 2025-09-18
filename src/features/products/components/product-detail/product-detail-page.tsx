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
import RecomendationProduct from './recomendation-product'
import { JenisBatik, JenisKain } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { WhatsappButton } from './whatsapp-button'

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
  const jenisKain =
    typeof product.jenisKain === 'object'
      ? (product.jenisKain as JenisKain[]).map((item) => item.name)
      : null
  const jenisBatik =
    typeof product.jenisBatik === 'object'
      ? (product.jenisBatik as JenisBatik[]).map((item) => item.name)
      : null

  return (
    <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-20 flex flex-col md:flex-row gap-8 lg:gap-12">
        <ProductImageGallery images={product.images || []} />

        <div className="flex flex-col gap-6 flex-1 max-w-[30rem]">
          <div>
            {house?.slug && (
              <Link href={`/toko/${house.slug}`} className="text-sm hover:underline">
                {house.name}
              </Link>
            )}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{product.name}</h1>
          </div>

          <div className="mt-4 prose dark:prose-invert max-w-none text-lg">
            {product.description}
          </div>

          {Object.values(product.marketplaceLinks || {}).some((value) => value) && (
            <div className="flex flex-row gap-3 flex-wrap">
              {product.marketplaceLinks?.shopeeUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={product.marketplaceLinks.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src="/shopee.png" alt="Shopee" width={63} height={20} />
                  </a>
                </Button>
              )}
              {product.marketplaceLinks?.tokopediaUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={product.marketplaceLinks.tokopediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src="/tokopedia.png" alt="Tokopedia" width={73} height={16} />
                  </a>
                </Button>
              )}
              {product.marketplaceLinks?.tiktokUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={product.marketplaceLinks.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src="/tiktok.png" alt="TikTok" width={67} height={16} />
                  </a>
                </Button>
              )}
            </div>
          )}

          <WhatsappButton product={product} />

          {product.details && product.details.length > 0 && (
            <div className="mt-6">
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-semibold">
                    Detail Produk
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {jenisBatik && <li>Jenis batik: {jenisBatik.join(', ')}</li>}
                      {jenisKain && <li>Jenis kain: {jenisKain.join(', ')}</li>}
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
      <RecomendationProduct currentProduct={product} />
    </div>
  )
}
