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
import { HomePage } from '@/payload-types'

export function ArtisanCarousel({ data }: Readonly<{ data: HomePage['artisanSection'] }>) {
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
          <h2 className="text-4xl font-bold text-foreground mb-4">{data.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{data.subtitle}</p>
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
            {data.featuredArtisans.map((artisan) => (
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
