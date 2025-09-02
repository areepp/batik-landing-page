import { Search } from 'lucide-react'
import { Input } from './ui/input'

export function SearchBar() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Cari batik..." className="w-full pl-9" />
    </div>
  )
}
