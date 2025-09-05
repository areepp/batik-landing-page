import React from 'react'
import { HeroCarousel } from './hero'
import ProductCarousel from './featuredProduct'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroCarousel />
        <ProductCarousel />
      </main>
    </div>
  )
}

export default HomePage
