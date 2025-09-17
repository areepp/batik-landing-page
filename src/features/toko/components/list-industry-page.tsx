import { getPayload } from 'payload'
import config from '@/payload.config'
import { House } from '@/payload-types'
import { HouseCard } from './industry-card'

export default async function ListIndustryPage() {
  const payload = await getPayload({ config })

  const { docs: houses } = (await payload.find({
    collection: 'houses',
    limit: 100,
    depth: 2,
    sort: 'name',
  })) as { docs: House[] }

  return (
    <div className="container mx-auto px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Temukan Pengrajin Kami</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Jelajahi dan dukung karya otentik dari para maestro Batik Sragen.
        </p>
      </div>

      {houses.length === 0 ? (
        <div className="text-center py-16 bg-muted rounded-lg">
          <p className="text-muted-foreground">Belum ada toko yang terdaftar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {houses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      )}
    </div>
  )
}
