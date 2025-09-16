'use client'

import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

function Logo({ isTransparent }: Readonly<{ isTransparent: boolean }>) {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
          isTransparent ? 'bg-white/90' : 'bg-primary',
        )}
      >
        <span
          className={cn(
            'font-bold text-sm transition-colors',
            isTransparent ? 'text-primary' : 'text-primary-foreground',
          )}
        >
          B
        </span>
      </div>
      <span
        className={cn(
          'text-xl font-bold transition-colors',
          isTransparent ? 'text-white' : 'text-foreground',
        )}
      >
        Sentra Batik Pungsari
      </span>
    </Link>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isTransparent = pathname === '/home' && !isScrolled

  const navLinkClasses = cn(
    'text-sm font-medium transition-colors',
    isTransparent ? 'text-white/80 hover:text-white' : 'text-foreground/60 hover:text-foreground',
  )

  return (
    <header
      className={cn(
        'fixed h-16 top-0 z-50 w-full transition-all duration-300',
        isTransparent ? 'bg-transparent' : 'bg-background/95 backdrop-blur-sm',
      )}
    >
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="hidden md:flex w-full items-center justify-between">
          <Logo isTransparent={isTransparent} />
          <div className="flex items-center gap-4 lg:gap-6">
            <nav className="flex items-center gap-4 lg:gap-6">
              <Link href="/home" className={navLinkClasses}>
                Beranda
              </Link>
              <Link href="/products" className={navLinkClasses}>
                Produk
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex w-full items-center justify-between gap-4">
          <Logo isTransparent={isTransparent} />
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isTransparent ? 'text-white' : 'text-foreground',
                    )}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <Logo isTransparent={false} />
                  </SheetTitle>
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
