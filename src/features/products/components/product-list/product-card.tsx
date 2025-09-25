import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/payload-types'
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
    <Link href={`/produk/${product.slug}`} className="group">
      <div className="aspect-3/4 bg-[#fff4f4] p-8">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={imageAlt || product.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg/25"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-start mt-3">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-muted-foreground text-base">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
