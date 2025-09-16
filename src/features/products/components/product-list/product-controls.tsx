'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { House } from '@/payload-types'
import { ListFilter, SlidersHorizontal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

const sortOptions = [
  { value: 'createdAt-desc', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga: Terendah' },
  { value: 'price-desc', label: 'Harga: Tertinggi' },
]

type Props = {
  houses?: House[]
}

export function ProductControls({ houses = [] }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const checkedHouses = React.useMemo(
    () => searchParams.get('houses')?.split(',') || [],
    [searchParams],
  )

  const currentSort = searchParams.get('sort') || 'createdAt-desc'

  const handleHouseChange = (houseId: string) => {
    const newChecked = checkedHouses.includes(houseId)
      ? checkedHouses.filter((id) => id !== houseId)
      : [...checkedHouses, houseId]

    const newParams = new URLSearchParams(searchParams.toString())

    if (newChecked.length > 0) {
      newParams.set('houses', newChecked.join(','))
    } else {
      newParams.delete('houses')
    }
    router.push(`/products?${newParams.toString()}`)
  }

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('sort', value)
    router.push(`/products?${newParams.toString()}`)
  }

  const FilterContent = () => (
    <div className="p-4 md:p-0">
      <h3 className="text-lg font-semibold mb-4">Toko / Rumah Batik</h3>
      <div className="space-y-2">
        {houses.map((house) => (
          <div key={house.id} className="flex items-center">
            <input
              type="checkbox"
              id={`mobile-${house.id}`}
              checked={checkedHouses.includes(String(house.id))}
              onChange={() => handleHouseChange(String(house.id))}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={`mobile-${house.id}`} className="ml-3 text-sm text-foreground">
              {house.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" /> Filter
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Produk</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Toko / Rumah Batik</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {houses.map((house) => (
              <DropdownMenuCheckboxItem
                key={house.id}
                checked={checkedHouses.includes(String(house.id))}
                onCheckedChange={() => handleHouseChange(String(house.id))}
              >
                {house.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Select onValueChange={handleSortChange} defaultValue={currentSort}>
        <SelectTrigger className="w-auto md:w-[200px]" aria-label="Urutkan produk">
          <SelectValue placeholder="Urutkan" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
