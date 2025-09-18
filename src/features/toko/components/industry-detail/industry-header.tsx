import { House, JenisBatik, JenisKain, Media } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getInitials } from '@/lib/utils'
import { JSX } from 'react'

type TLinks = {
  href?: string | null
  icon: JSX.Element
  label?: string
}

type Props = { house: House }

export function TokoHeader({ house }: Props) {
  const logo = house.logo as Media
  const logoUrl = logo?.url

  const socialLinks: TLinks[] = [
    {
      href: house.socialMedia?.instagramUrl,
      icon: <Image src="/instagram-icon.png" alt="Instagram" width={20} height={20} />,
      label: 'Instagram',
    },
    {
      href: house.socialMedia?.tiktokUrl,
      icon: <Image src="/tiktok.png" alt="TikTok" width={67} height={16} />,
      label: 'TikTok',
    },
  ]

  const marketplaceLinks: TLinks[] = [
    {
      href: house.marketplaces?.shopeeUrl,
      icon: <Image src="/shopee.png" alt="Shopee" width={63} height={20} />,
    },
    {
      href: house.marketplaces?.tokopediaUrl,
      icon: <Image src="/tokopedia.png" alt="Tokopedia" width={73} height={16} />,
    },
  ]

  const batikTypes = (house.availableBatikTypes || []) as JenisBatik[]
  const fabricTypes = (house.availableFabricTypes || []) as JenisKain[]

  return (
    <section className="p-6 sm:p-8 mx-auto border-b">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Logo & Nama */}
          <div className="flex flex-col items-center text-center md:text-left space-y-4">
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
            <h1 className="text-3xl font-bold tracking-tight">{house.name}</h1>
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-500">
              <MessageCircle className="mr-3 h-5 w-5" />
              Hubungi melalui WhatsApp
            </Button>
          </div>

          {/* Deskripsi & Spesialisasi */}
          <div className="flex flex-col">
            {house.description && (
              <p className="text-muted-foreground text-pretty text-lg">{house.description}</p>
            )}

            {batikTypes.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-foreground">Jenis Batik</h4>
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
              <div className="mt-3">
                <h4 className="font-semibold mb-2 text-foreground">Jenis Kain</h4>
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
        </div>

        {/* Kontak & Link */}
        <div className="flex flex-col items-center md:items-start gap-6">
          {(socialLinks.some((l) => l.href) || marketplaceLinks.some((l) => l.href)) && (
            <div className="w-full">
              <h4 className="font-semibold text-muted-foreground mb-3">Temukan di Platform Lain</h4>
              <div className="grid grid-cols-2 gap-3">
                {[...socialLinks, ...marketplaceLinks].map(
                  (link) =>
                    link.href && (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <Button variant="outline" className="w-full" size="lg">
                          {link.icon}
                          {link?.label && (
                            <span className="ml-2 text-sm font-medium">{link?.label}</span>
                          )}
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
