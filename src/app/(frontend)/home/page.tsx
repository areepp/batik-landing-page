import { About } from '@/features/home/components/about'
import { ArtisanCarousel } from '@/features/home/components/artisan'
import ProductCarousel from '@/features/home/components/featured-product'
import { HeroCarousel } from '@/features/home/components/hero'
import { TestimonialSection } from '@/features/home/components/testimonial'
import { getPayload } from 'payload'
import config from '@/payload.config'

const HomePage = async () => {
  const payload = await getPayload({ config })

  const homePageData = await payload.findGlobal({ slug: 'home-page' })

  return (
    <div className="min-h-screen -mt-16">
      <main>
        <HeroCarousel data={homePageData.heroSection} />
        <div className="md:px-12 px-4">
          <ProductCarousel />
          <About data={homePageData.aboutSection} />
          <ArtisanCarousel data={homePageData.artisanSection} />
          <TestimonialSection data={homePageData.testimonialSection} />
        </div>
      </main>
    </div>
  )
}

export default HomePage
