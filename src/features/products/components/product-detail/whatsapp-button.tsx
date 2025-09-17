'use client'

import { Button } from '@/components/ui/button'
import { House, Product } from '@/payload-types'
import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  product: Product
}

export function WhatsappButton({ product }: Readonly<Props>) {
  const [productUrl, setProductUrl] = useState('')

  useEffect(() => {
    setProductUrl(window.location.href)
  }, [])

  const house = product.house as House

  if (!house?.phoneNumber) {
    return null
  }

  const cleanedPhoneNumber = house.phoneNumber.replace(/\D/g, '')

  const message = `Halo, saya tertarik dengan produk "${product.name}".\n\nBisa berikan info lebih lanjut?\n\nLink produk: ${productUrl}`

  const whatsappUrl = `https://wa.me/${cleanedPhoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <Button asChild className="w-full">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-2 h-4 w-4" />
        Tanyakan tentang produk ini
      </a>
    </Button>
  )
}
