'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const carouselSlides = [
  {
    type: 'video',
    src: '/video-batik.mp4',
    title: 'Mahakarya Batik Sragen Asli',
    description: 'Setiap goresan canting menceritakan sebuah kisah warisan budaya.',
    ctaText: 'Lihat Koleksi Tulis',
    ctaLink: '/products/batik-tulis',
  },
  {
    type: 'image',
    src: '/cutting-batik.jpg',
    title: 'Lihat Proses Pembuatannya',
    description: 'Saksikan ketelitian dan kesabaran di balik selembar kain batik.',
    ctaText: 'Pelajari Lebih Lanjut',
    ctaLink: '/process',
  },
  {
    type: 'image',
    src: '/costume.jpg',
    title: 'Keindahan Praktis Batik Sragen',
    description: 'Motif tradisional yang presisi, sempurna untuk gaya sehari-hari.',
    ctaText: 'Jelajahi Batik Cap',
    ctaLink: '/products/batik-cap',
  },
  {
    type: 'image',
    src: '/kain-batik.jpg',
    title: 'Inovasi dalam Tradisi',
    description: 'Temukan produk fashion modern yang terinspirasi dari keagungan batik.',
    ctaText: 'Belanja Sekarang',
    ctaLink: '/products',
  },
  {
    type: 'image',
    src: '/toko-batik.jpg',
    title: 'Dukung Pengrajin Lokal',
    description: 'Pembelian Anda memberdayakan para seniman di jantung Sragen.',
    ctaText: 'Tentang Kami',
    ctaLink: '/about',
  },
]

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const startAutoplay = React.useCallback(() => {
    stopAutoplay()
    intervalRef.current = setInterval(() => {
      api?.scrollNext()
    }, 5000)
  }, [api])

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  React.useEffect(() => {
    if (!api) {
      return
    }

    const handleVideoEnd = () => {
      api?.scrollNext()
    }

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap()
      const isVideoSlide = carouselSlides[selectedIndex]?.type === 'video'

      stopAutoplay()

      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd)
      }

      if (isVideoSlide && videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
        videoRef.current.addEventListener('ended', handleVideoEnd)
      } else {
        startAutoplay()
      }
    }

    api.on('select', onSelect)

    api.on('pointerDown', () => {
      stopAutoplay()
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd)
      }
    })

    onSelect()

    return () => {
      stopAutoplay()
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd)
      }
      api.off('select', onSelect)
    }
  }, [api, startAutoplay])

  return (
    <section className="w-full h-screen">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        className="w-full"
      >
        <CarouselContent>
          {carouselSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-screen w-full">
                {slide.type === 'image' ? (
                  <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" />
                ) : (
                  <video
                    ref={videoRef}
                    src={slide.src}
                    autoPlay
                    loop={false}
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg md:text-xl max-w-2xl mb-8">{slide.description}</p>
                  <Link href={slide.ctaLink}>
                    <Button size="lg">{slide.ctaText}</Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-none" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-none" />
      </Carousel>
    </section>
  )
}
