import { Card, CardContent } from '@/components/ui/card'
import { HomePage } from '@/payload-types'

export function TestimonialSection({ data }: Readonly<{ data: HomePage['testimonialSection'] }>) {
  return (
    <section className="py-16 px-4 bg-popover" id="testimonial">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Kata Mereka</h2>
          <p className="text-xl text-muted-foreground">
            Testimoni dari pelanggan yang puas dengan produk kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={'/portrait-woman.jpg'}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-secondary fill-green-500"
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
