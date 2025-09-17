import { House, JenisBatik, JenisKain, Media } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ExternalLink, Instagram, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getInitials } from '@/lib/utils'

type Props = { house: House }

export function TokoHeader({ house }: Props) {
  const logo = house.logo as Media
  const logoUrl = logo?.url

  const socialLinks = [
    {
      href: house.socialMedia?.instagramUrl,
      icon: <Instagram className="h-5 w-5" />,
      label: 'Instagram',
    },
    {
      href: house.socialMedia?.tiktokUrl,
      icon: <Image src="/icon/tiktok.png" alt="TikTok" width={20} height={20} />,
      label: 'TikTok',
    },
  ]

  const marketplaceLinks = [
    {
      href: house.marketplaces?.shopeeUrl,
      icon: <Image src="/icon/shopee.png" alt="Shopee" width={20} height={20} />,
      label: 'Shopee',
    },
    {
      href: house.marketplaces?.tokopediaUrl,
      icon: <Image src="/icon/tokopedia.png" alt="Tokopedia" width={20} height={20} />,
      label: 'Tokopedia',
    },
  ]

  const batikTypes = (house.availableBatikTypes || []) as JenisBatik[]
  const fabricTypes = (house.availableFabricTypes || []) as JenisKain[]

  return (
    <section className="bg-muted rounded-2xl p-6 sm:p-8 mx-auto shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* Logo & Nama */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-background shadow-md">
            {logoUrl ? (
              <Image src={logoUrl} alt={`Logo ${house.name}`} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                  {getInitials(house.name)}
                </span>
              </div>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{house.name}</h1>
        </div>

        {/* Deskripsi & Spesialisasi */}
        <div className="flex flex-col gap-6">
          {house.description && (
            <p className="text-muted-foreground text-pretty">{house.description}</p>
          )}

          {batikTypes.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-foreground">Spesialisasi Batik</h4>
              <div className="flex flex-wrap gap-2">
                {batikTypes.map(
                  (type) =>
                    type && (
                      <Badge key={type.id} variant="outline">
                        {type.name}
                      </Badge>
                    ),
                )}
              </div>
            </div>
          )}

          {fabricTypes.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-foreground">Material Unggulan</h4>
              <div className="flex flex-wrap gap-2">
                {fabricTypes.map(
                  (type) =>
                    type && (
                      <Badge key={type.id} variant="outline">
                        {type.name}
                      </Badge>
                    ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Kontak & Link */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="bg-muted/50 rounded-2xl p-6 border w-full max-w-sm shadow">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Hubungi Pengrajin</h3>
            <a
              href={`https://wa.me/${house.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full h-12 text-base sm:text-lg font-semibold bg-green-600 hover:bg-green-700 transition-transform duration-300 hover:scale-105 shadow">
                <MessageCircle className="mr-3 h-5 w-5" />
                Chat WhatsApp
              </Button>
            </a>
          </div>

          {(socialLinks.some((l) => l.href) || marketplaceLinks.some((l) => l.href)) && (
            <div className="w-full">
              <h4 className="font-semibold text-center text-muted-foreground mb-3">
                Temukan di Platform Lain
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[...socialLinks, ...marketplaceLinks].map(
                  (link) =>
                    link.href && (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="group"
                      >
                        <Button
                          variant="outline"
                          className="w-full h-12 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <span className="mr-2 group-hover:scale-110 transition-transform">
                            {link.icon}
                          </span>
                          <span className="text-sm font-medium">{link.label}</span>
                          <ExternalLink className="ml-2 h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </Button>
                      </a>
                    ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
