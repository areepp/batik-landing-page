'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

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

function DesktopNav() {
  return (
    <nav className="flex items-center gap-4 lg:gap-6">
      <Link
        href="/home"
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

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex w-full items-center justify-between">
          <Logo />

          <div className="flex items-center gap-4 lg:gap-6">
            <DesktopNav />
          </div>
        </div>

        <div className="md:hidden flex w-full items-center justify-between gap-4">
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigasi utama untuk website Batik Sragen.
                  </SheetDescription>
                </SheetHeader>
                <nav className="grid gap-6 text-lg font-medium pl-10">
                  <Link href="/home" className="hover:text-foreground/80">
                    Beranda
                  </Link>
                  <Link href="/products" className="text-muted-foreground hover:text-foreground/80">
                    Produk
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
