import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/payload-types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'

type Props = {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  const firstImage = product.images?.[0]?.image

  const imageUrl = typeof firstImage === 'object' && firstImage !== null ? firstImage.url : null
  const imageAlt =
    typeof firstImage === 'object' && firstImage !== null ? firstImage.alt : 'Product image'

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg dark:group-hover:shadow-white/10">
        <CardContent className="p-0">
          <div className="aspect-square relative overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt || product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-muted-foreground">{formatPrice(product.price)}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
