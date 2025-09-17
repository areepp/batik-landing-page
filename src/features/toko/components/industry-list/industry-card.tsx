import { House, JenisBatik, JenisKain, Media } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { getInitials } from '@/lib/utils'

type Props = {
  house: House
}

export function HouseCard({ house }: Props) {
  const logo = house.logo as Media
  const logoUrl = logo?.url

  const batikTypes = (house.availableBatikTypes || []) as JenisBatik[]
  const fabricTypes = (house.availableFabricTypes || []) as JenisKain[]

  return (
    <div className="bg-card border overflow-hidden flex flex-col h-full group">
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
          <Button className="w-full h-11">
            <span className="mr-2">Lihat Koleksi</span>
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
