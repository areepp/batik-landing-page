'use client' // Komponen ini menggunakan state/interaksi, jadi kita tandai sebagai Client Component

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Search, UserCircle, Menu } from 'lucide-react'
import { SearchBar } from '@/components/searchBar'
import { UserProfileDropdown } from '@/components/UserProfileDropdown'

// Komponen Logo untuk konsistensi
function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">B</span>
      </div>
      <span className="text-xl font-bold text-foreground">Batik Sragen</span>
    </Link>
  )
}

// Komponen Navigasi untuk desktop
function DesktopNav() {
  return (
    <nav className="flex items-center gap-4 lg:gap-6">
      <Link
        href="/"
        className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
      >
        Beranda
      </Link>
      <Link
        href="/products"
        className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
      >
        Produk
      </Link>
    </nav>
  )
}

// Komponen utama Header
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==================== */}
        {/* Layout Desktop (md dan lebih besar) */}
        {/* ==================== */}
        <div className="hidden md:flex w-full items-center justify-between">
          {/* Sisi Kiri: Logo */}
          <Logo />

          {/* Sisi Kanan: Search, Navigasi, Profil */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-64">
              <SearchBar />
            </div>
            <DesktopNav />
            <UserProfileDropdown />
          </div>
        </div>

        {/* ==================== */}
        {/* Layout Mobile (di bawah md) */}
        {/* ==================== */}
        <div className="md:hidden flex w-full items-center justify-between gap-4">
          {/* Kiri: Hamburger Menu */}
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Logo />
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link href="/" className="hover:text-foreground/80">
                    Beranda
                  </Link>
                  <Link href="/products" className="text-muted-foreground hover:text-foreground/80">
                    Produk
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tengah: Search Bar */}
          <div className="flex-1">
            <SearchBar />
          </div>

          {/* Kanan: Profil */}
          <div>
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  )
}
