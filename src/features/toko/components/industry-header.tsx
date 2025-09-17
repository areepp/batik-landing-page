import { House, JenisBatik, JenisKain, Media } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Instagram, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Props = {
  house: House
}

function getInitials(name: string): string {
  if (!name) return '?'

  const words = name.replace(/Batik/gi, '').trim().split(' ').filter(Boolean)

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  if (words.length === 1 && words[0].length > 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  if (name.length > 0) {
    return name[0].toUpperCase()
  }
  return '?'
}

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
    <div className="bg-muted rounded-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-background shadow-lg">
            {logoUrl ? (
              <Image src={logoUrl} alt={`Logo ${house.name}`} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-foreground">
                  {getInitials(house.name)}
                </span>
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{house.name}</h1>
        </div>

        <div className="md:col-span-1 flex flex-col gap-6">
          <p className="text-muted-foreground">{house.description}</p>
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

        <div className="md:col-span-1 flex flex-col items-center md:items-start gap-4">
          <h3 className="text-lg font-semibold">Hubungi Pengrajin</h3>
          <a href={`https://wa.me/${house.phoneNumber}`} target="_blank" rel="noopener noreferrer">
            <Button>
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </Button>
          </a>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {socialLinks.map(
              (link) =>
                link.href && (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <Button variant="outline" size="icon">
                      {link.icon}
                    </Button>
                  </a>
                ),
            )}
            {marketplaceLinks.map(
              (link) =>
                link.href && (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <Button variant="outline" size="icon">
                      {link.icon}
                    </Button>
                  </a>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
