import { House, JenisBatik, JenisKain, Media } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

function getInitials(name: string): string {
  if (!name) return '?'
  const words = name.replace(/Batik/gi, '').trim().split(' ').filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  if (words.length === 1 && words[0].length > 1) return words[0].substring(0, 2).toUpperCase()
  if (name.length > 0) return name[0].toUpperCase()
  return '?'
}

type Props = {
  house: House
}

export function HouseCard({ house }: Props) {
  const logo = house.logo as Media
  const logoUrl = logo?.url

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
    <div className="bg-card border rounded-lg overflow-hidden flex flex-col h-full group">
      <div className="p-6 flex flex-col items-center text-center bg-muted/50">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-background shadow-md">
          {logoUrl ? (
            <Image src={logoUrl} alt={`Logo ${house.name}`} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-primary flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-foreground">
                {getInitials(house.name)}
              </span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-card-foreground">{house.name}</h3>
      </div>

      <div className="p-6 flex-grow space-y-4">
        {batikTypes.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Jenis Batik</h4>
            <div className="flex flex-wrap gap-2">
              {batikTypes.map(
                (type) =>
                  type && (
                    <Badge key={type.id} variant="secondary">
                      {type.name}
                    </Badge>
                  ),
              )}
            </div>
          </div>
        )}
        {fabricTypes.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Jenis Kain</h4>
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

      <div className="p-6 border-t mt-auto flex flex-col gap-3">
        <Link href={`/toko/${house.slug}`} passHref>
          <Button className="w-full">Lihat Toko</Button>
        </Link>
        <div className="flex justify-center gap-2">
          <a href={`https://wa.me/${house.phoneNumber}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </a>
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
  )
}
