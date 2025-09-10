'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import Image from 'next/image'

// Data untuk para pengrajin/toko
const artisans = [
  {
    id: 1,
    name: 'Ibu Sari Wulandari',
    specialty: 'Motif Parang & Kawung',
    image: '/indonesian-batik-artisan-woman-portrait.png',
    description: 'Ahli dalam motif klasik dengan teknik tulis tradisional.',
  },
  {
    id: 2,
    name: 'Pak Bambang Sutrisno',
    specialty: 'Motif Mega Mendung',
    image: '/indonesian-batik-artisan-man-portrait.png',
    description: 'Spesialis motif awan dengan gradasi warna yang memukau.',
  },
  {
    id: 3,
    name: 'Ibu Dewi Kartika',
    specialty: 'Motif Truntum & Sido Mukti',
    image: '/indonesian-batik-artisan-woman-working.png',
    description: 'Kreator motif pernikahan dan upacara adat yang legendaris.',
  },
  {
    id: 4,
    name: 'Sanggar Batik Cipto',
    specialty: 'Pewarnaan Alam',
    image: '/happy-customer-portrait.png',
    description: 'Fokus pada penggunaan pewarna alami dari tumbuhan lokal.',
  },
  {
    id: 5,
    name: 'Galeri Batik Wiradesa',
    specialty: 'Koleksi Modern',
    image: '/satisfied-customer-woman-portrait.png',
    description: 'Menggabungkan desain kontemporer dengan teknik batik tradisional.',
  },
]

export function ArtisanCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const startAutoplay = React.useCallback(() => {
    // Hentikan interval yang sudah ada untuk menghindari duplikasi
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    // Mulai interval baru
    intervalRef.current = setInterval(() => {
      api?.scrollNext()
    }, 4000) // Pindah slide setiap 4 detik
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

    // Mulai autoplay saat komponen pertama kali dimuat
    startAutoplay()

    // Atur listener untuk mereset timer saat pengguna berinteraksi
    api.on('select', startAutoplay)
    api.on('pointerDown', stopAutoplay)

    // Fungsi cleanup untuk menghentikan interval saat komponen dibongkar
    return () => {
      stopAutoplay()
    }
  }, [api, startAutoplay])

  return (
    <section className="bg-muted py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Temui Para Pengrajin Kami</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Berkenalan dengan para maestro di balik setiap karya indah yang Anda temukan di sini.
            Geser untuk melihat lebih banyak.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <CarouselContent className="-ml-4">
            {artisans.map((artisan) => (
              <CarouselItem key={artisan.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="overflow-hidden group h-full">
                    <CardContent className="flex flex-col items-center text-center p-6 h-full">
                      <div className="w-32 h-32 relative mb-4 rounded-full overflow-hidden border-4 border-background shadow-md shrink-0">
                        <Image
                          // src={artisan.image  }
                          src={'/toko-batik.jpg'}
                          alt={artisan.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        Profile
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{artisan.name}</h3>
                      <p className="text-primary font-semibold text-sm mb-3">{artisan.specialty}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {artisan.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  )
}
