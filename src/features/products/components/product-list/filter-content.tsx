'use client'

import { House, JenisBatik, JenisKain } from '@/payload-types'

type Props = {
  houses: House[]
  jenisBatiks: JenisBatik[]
  jenisKains: JenisKain[]
  checkedHouses: string[]
  checkedJenisBatiks: string[]
  checkedJenisKains: string[]
  onFilterChange: (paramName: string, value: string) => void
}

export function FilterContent({
  houses,
  jenisBatiks,
  jenisKains,
  checkedHouses,
  checkedJenisBatiks,
  checkedJenisKains,
  onFilterChange,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Filter Toko */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Toko / Rumah Batik</h3>
        <div className="space-y-2">
          {houses.map((house) => (
            <div key={house.id} className="flex items-center">
              <input
                type="checkbox"
                id={`filter-house-${house.id}`}
                checked={checkedHouses.includes(String(house.id))}
                onChange={() => onFilterChange('houses', String(house.id))}
                className="h-4 w-4 rounded cursor-pointer border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor={`filter-house-${house.id}`}
                className="ml-3 text-sm cursor-pointer text-foreground"
              >
                {house.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Filter Jenis Batik */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Jenis Batik</h3>
        <div className="space-y-2">
          {jenisBatiks.map((jb) => (
            <div key={jb.id} className="flex items-center">
              <input
                type="checkbox"
                id={`filter-jb-${jb.id}`}
                checked={checkedJenisBatiks.includes(String(jb.id))}
                onChange={() => onFilterChange('jenisBatik', String(jb.id))}
                className="h-4 w-4 rounded cursor-pointer border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor={`filter-jb-${jb.id}`}
                className="ml-3 text-sm cursor-pointer text-foreground"
              >
                {jb.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Filter Jenis Kain */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Jenis Kain</h3>
        <div className="space-y-2">
          {jenisKains.map((jk) => (
            <div key={jk.id} className="flex items-center">
              <input
                type="checkbox"
                id={`filter-jk-${jk.id}`}
                checked={checkedJenisKains.includes(String(jk.id))}
                onChange={() => onFilterChange('jenisKain', String(jk.id))}
                className="h-4 w-4 rounded cursor-pointer border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor={`filter-jk-${jk.id}`}
                className="ml-3 text-sm cursor-pointer text-foreground"
              >
                {jk.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
