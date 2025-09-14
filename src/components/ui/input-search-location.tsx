'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { searchDestinations, Location } from '@/features/orders/api/search-destination'
import { useDebounce } from '@/hooks/use-debounce'
import { useEffect, useState } from 'react'

type Props = {
  onSelect: (location: Location | null) => void
}

export function InputSearchLocation({ onSelect }: Readonly<Props>) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setResults([])
      return
    }

    const performSearch = async () => {
      setIsLoading(true)
      const { locations } = await searchDestinations(debouncedQuery)
      setResults(locations || [])
      setIsLoading(false)
    }
    performSearch()
  }, [debouncedQuery])

  const handleSelect = (location: Location) => {
    setSelectedLocation(location)
    onSelect(location)
    setOpen(false)
    setQuery('')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedLocation ? selectedLocation.label : 'Pilih kelurahan atau kode pos tujuan...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fulll p-0">
        <Command>
          <CommandInput
            placeholder="Ketik untuk mencari..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {isLoading && <div className="p-2 text-sm text-center">Mencari...</div>}
            <CommandEmpty>
              {!isLoading && debouncedQuery.length >= 3 ? 'Lokasi tidak ditemukan.' : ''}
            </CommandEmpty>
            <CommandGroup>
              {results.map((location) => (
                <CommandItem
                  key={location.id}
                  value={location.label}
                  onSelect={() => handleSelect(location)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedLocation?.id === location.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
