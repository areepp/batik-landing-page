'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const VIDEO_DATA = {
  type: 'video',
  src: '/video-batik.mp4',
  title: 'Mahakarya Batik Sragen Asli',
  description: 'Setiap goresan canting menceritakan sebuah kisah warisan budaya.',
  ctaText: 'Lihat Koleksi',
  ctaLink: '/products',
}

export function HeroCarousel() {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  return (
    <section className="w-full h-screen">
      <div className="relative h-screen w-full">
        <video
          ref={videoRef}
          src={VIDEO_DATA.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">{VIDEO_DATA.title}</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">{VIDEO_DATA.description}</p>
          <Link href={VIDEO_DATA.ctaLink}>
            <Button size="lg" variant="transparent" className="px-16">
              {VIDEO_DATA.ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
