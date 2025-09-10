export function About() {
  return (
    <section className="py-16 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Warisan Budaya yang Hidup</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Batik bukan sekadar kain bermotif, tetapi cerminan jiwa dan filosofi hidup masyarakat
              Indonesia. Setiap goresan canting mengandung makna mendalam yang diwariskan
              turun-temurun.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Di Sragen, tradisi membatik telah menjadi bagian tak terpisahkan dari kehidupan
              sehari-hari. Para pengrajin dengan sabar dan teliti menciptakan karya seni yang
              memukau, menggabungkan teknik tradisional dengan sentuhan modern.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Pengrajin Berpengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Motif Tradisional</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/cutting-batik.jpg"
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
