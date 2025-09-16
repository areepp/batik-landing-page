'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { House, JenisBatik, JenisKain } from '@/payload-types'
import { ListFilter, X } from 'lucide-react'
import * as React from 'react'
import { FilterContent } from './filter-content'
import { useProductFilters } from '../../hooks/use-product-filters'

const sortOptions = [
  { value: 'createdAt-desc', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga: Terendah' },
  { value: 'price-desc', label: 'Harga: Tertinggi' },
]

type Props = {
  houses?: House[]
  jenisBatiks?: JenisBatik[]
  jenisKains?: JenisKain[]
}

export function ProductControls({ houses = [], jenisBatiks = [], jenisKains = [] }: Props) {
  const {
    checkedHouses,
    checkedJenisBatiks,
    checkedJenisKains,
    currentSort,
    isFilterActive,
    handleFilterChange,
    handleSortChange,
    handleClearFilters,
  } = useProductFilters()

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2 relative">
            <ListFilter className="h-4 w-4" /> Filter
            {isFilterActive && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto p-6">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-2xl font-bold">Filter Produk</SheetTitle>
          </SheetHeader>
          <FilterContent
            houses={houses}
            jenisBatiks={jenisBatiks}
            jenisKains={jenisKains}
            checkedHouses={checkedHouses}
            checkedJenisBatiks={checkedJenisBatiks}
            checkedJenisKains={checkedJenisKains}
            onFilterChange={handleFilterChange}
          />
        </SheetContent>
      </Sheet>

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

      {isFilterActive && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="flex items-center gap-1 text-muted-foreground"
        >
          <X className="h-4 w-4" />
          Bersihkan
        </Button>
      )}
    </div>
  )
}
