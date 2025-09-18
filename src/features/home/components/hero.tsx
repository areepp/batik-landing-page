import { Button } from '@/components/ui/button'
import { HomePage, Media } from '@/payload-types'
import Link from 'next/link'

export function HeroCarousel({ data }: Readonly<{ data: HomePage['heroSection'] }>) {
  const backgroundVideo = data.backgroundVideo as Media | null

  return (
    <section className="w-full h-screen">
      <div className="relative h-screen w-full">
        {backgroundVideo?.url && (
          <video
            src={backgroundVideo.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">{data.title}</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">{data.subtitle}</p>
          <Link href={'/products'}>
            <Button size="lg" variant="transparent" className="px-16">
              Lihat Koleksi
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
