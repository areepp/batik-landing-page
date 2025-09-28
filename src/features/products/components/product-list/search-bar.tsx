'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (pathname != '/produk') {
      return
    }

    const current = new URLSearchParams(Array.from(searchParams.entries()))
    const currentSearchInUrl = current.get('search') || ''

    if (debouncedSearchTerm) {
      current.set('search', debouncedSearchTerm)
    } else {
      current.delete('search')
    }

    if (debouncedSearchTerm !== currentSearchInUrl) {
      current.delete('page')
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.replace(`/produk${query}`)
  }, [debouncedSearchTerm, router, searchParams])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari berdasarkan nama produk..."
        className="pl-10"
      />
    </div>
  )
}
