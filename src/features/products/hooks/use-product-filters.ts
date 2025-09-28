'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

export function useProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const checkedHouses = React.useMemo(
    () => searchParams.get('houses')?.split(',') || [],
    [searchParams],
  )
  const checkedJenisBatiks = React.useMemo(
    () => searchParams.get('jenisBatik')?.split(',') || [],
    [searchParams],
  )
  const checkedJenisKains = React.useMemo(
    () => searchParams.get('jenisKain')?.split(',') || [],
    [searchParams],
  )
  const checkedJenisProduks = React.useMemo(
    () => searchParams.get('jenisProduk')?.split(',') || [],
    [searchParams],
  )
  const currentSort = searchParams.get('sort') || 'createdAt-desc'

  const isFilterActive =
    checkedHouses.length > 0 ||
    checkedJenisBatiks.length > 0 ||
    checkedJenisKains.length > 0 ||
    checkedJenisProduks.length > 0

  const handleFilterChange = (paramName: string, value: string) => {
    const currentValues = searchParams.get(paramName)?.split(',') || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    const newParams = new URLSearchParams(searchParams.toString())
    if (newValues.length > 0) {
      newParams.set(paramName, newValues.join(','))
    } else {
      newParams.delete(paramName)
    }
    newParams.set('page', '1')
    router.push(`/produk?${newParams.toString()}`)
  }

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('sort', value)
    newParams.set('page', '1')
    router.push(`/produk?${newParams.toString()}`)
  }

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete('houses')
    newParams.delete('jenisBatik')
    newParams.delete('jenisKain')
    newParams.delete('jenisProduk')
    newParams.set('page', '1')
    router.push(`/produk?${newParams.toString()}`)
  }

  return {
    checkedHouses,
    checkedJenisBatiks,
    checkedJenisKains,
    checkedJenisProduks,
    currentSort,
    isFilterActive,
    handleFilterChange,
    handleSortChange,
    handleClearFilters,
  }
}
