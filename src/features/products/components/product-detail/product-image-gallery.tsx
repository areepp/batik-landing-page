'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

type Props = {
  images: {
    image: number | Media
  }[]
}

export function ProductImageGallery({ images }: Readonly<Props>) {
  const validImages = images
    .map(({ image }) => (typeof image === 'object' ? image : null))
    .filter(Boolean) as Media[]

  const [selectedImage, setSelectedImage] = useState<Media>(validImages[0])

  if (validImages.length === 0) {
    return (
      <div className="aspect-square relative bg-secondary rounded-lg">
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-muted-foreground">No Image</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full sm:w-4/7 flex gap-4 col-span-2">
      <div className="flex flex-col gap-4 w-32">
        {validImages.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={cn(
              'aspect-square relative transition-all',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              {
                'ring-2 ring-ring ring-offset-2': selectedImage.id === image.id,
                'opacity-75 hover:opacity-100': selectedImage.id !== image.id,
              },
            )}
          >
            <Image
              src={image.url!}
              alt={image.alt || 'Product thumbnail'}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <div className="aspect-3/4 relative bg-secondary overflow-hidden w-full">
        <Image
          src={selectedImage.url!}
          alt={selectedImage.alt || 'Product Image'}
          fill
          className="object-cover transition-all duration-300"
        />
      </div>
    </div>
  )
}
