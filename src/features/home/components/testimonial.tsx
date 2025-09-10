import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    id: 1,
    name: 'Andi Prasetyo',
    location: 'Jakarta',
    rating: 5,
    comment:
      'Kualitas batiknya luar biasa! Motifnya detail dan warnanya tahan lama. Sangat puas dengan pembelian saya.',
    image: '/happy-customer-portrait.png',
  },
  {
    id: 2,
    name: 'Sinta Maharani',
    location: 'Surabaya',
    rating: 5,
    comment:
      'Pelayanan sangat memuaskan dan produknya berkualitas tinggi. Akan order lagi untuk koleksi selanjutnya.',
    image: '/satisfied-customer-woman-portrait.png',
  },
  {
    id: 3,
    name: 'Rudi Hartono',
    location: 'Bandung',
    rating: 5,
    comment:
      'Batik asli Sragen memang berbeda! Kualitas premium dengan harga yang sangat reasonable.',
    image: '/happy-male-customer-portrait.png',
  },
]

export function TestimonialSection() {
  return (
    <section className="py-16 px-4 bg-popover">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Kata Mereka</h2>
          <p className="text-xl text-muted-foreground">
            Testimoni dari pelanggan yang puas dengan produk kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    // src={testimonial.image }
                    src={'/portrait-woman.jpg'}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-secondary fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">"{testimonial.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
