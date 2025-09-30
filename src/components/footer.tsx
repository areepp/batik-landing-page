import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-sidebar py-8 border-t">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-sidebar-foreground">Batik Sragen</span>
            </div>
            <p className="text-sidebar-foreground/80 md:text-base text-sm max-w-md">
              Melestarikan warisan budaya Indonesia melalui karya batik berkualitas tinggi dari
              pengrajin terbaik Sragen.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">Produk</h3>
            <ul className="space-y-2 md:text-base text-sm">
              <li>
                <Link
                  href="/produk?page=1&jenisProduk=1"
                  className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
                >
                  Kain Batik
                </Link>
              </li>
              <li>
                <Link
                  href="/produk?page=1&jenisProduk=2"
                  className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
                >
                  Kemeja Batik
                </Link>
              </li>
              <li>
                <Link
                  href="/produk?page=1&jenisProduk=3"
                  className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
                >
                  Dress Batik
                </Link>
              </li>
              <li>
                <Link
                  href="/produk?page=1&jenisProduk=5"
                  className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
                >
                  Tas Batik
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">Website</h3>
            <ul className="space-y-2 md:text-base text-sm">
              <li>
                <Link
                  href="/beranda#tentang-kami"
                  className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/beranda#pengrajin"
                  className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
                >
                  Pengrajin
                </Link>
              </li>
              <li>
                <Link
                  href="/beranda#produk-teratas"
                  className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
                >
                  Produk Teratas
                </Link>
              </li>
              <li>
                <Link
                  href="/beranda#testimonial"
                  className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
                >
                  Testimoni
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-8 text-center">
          <p className="text-sidebar-foreground/60 md:text-base text-sm">© 2025 Batik Sragen.</p>
        </div>
      </div>
    </footer>
  )
}
