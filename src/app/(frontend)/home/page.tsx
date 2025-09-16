import { About } from '@/features/home/components/about'
import { ArtisanCarousel } from '@/features/home/components/artisan'
import ProductCarousel from '@/features/home/components/featured-product'
import { HeroCarousel } from '@/features/home/components/hero'
import { TestimonialSection } from '@/features/home/components/testimonial'
import React from 'react'

const HomePage = () => {
  return (
    <div className="min-h-screen -mt-16">
      <main>
        <HeroCarousel />
        <div className="md:px-12 px-4">
          <ProductCarousel />
          <About />
          <ArtisanCarousel />
          <TestimonialSection />
        </div>
      </main>
    </div>
  )
}

export default HomePage
