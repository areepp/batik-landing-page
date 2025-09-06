import React from 'react'
import { HeroCarousel } from './hero'
import ProductCarousel from './featuredProduct'
import { About } from './about'
import { TestimonialSection } from './testimonial'
import { ArtisanCarousel } from './artisan'

const HomePage = () => {
  return (
    <div className="min-h-screen">
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
