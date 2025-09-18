import { RichText } from '@/components/rich-text'
import { HomePage, Media } from '@/payload-types'

export function About({ data }: Readonly<{ data: HomePage['aboutSection'] }>) {
  return (
    <section className="py-16 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">{data.title}</h2>
            <RichText data={data.paragraph} />
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Pengrajin Berpengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Motif Tradisional</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={(data.image as Media).url!}
              alt="Pengrajin Batik"
              className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
