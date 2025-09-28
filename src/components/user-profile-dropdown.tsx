'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useLogout } from '@/features/auth/logout/api/logout'
import LoadingSpinner from './loading-spinner'
import { useGetUser } from '@/features/auth/user/api/get-user'
import { cn } from '@/lib/utils'

export function UserProfileDropdown({ isTransparent }: Readonly<{ isTransparent?: boolean }>) {
  const { data: user, isLoading } = useGetUser()
  const { mutate: logout, isPending: isLoggingOut } = useLogout()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'relative flex items-center gap-2',
              isTransparent && 'text-white border-white hover:bg-white hover:text-primary',
            )}
          >
            <UserCircle />
            <span className={cn('hidden sm:inline')}>Profil</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Masuk sebagai</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/keranjang">Keranjang</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/pesanan">Pesanan</Link>
          </DropdownMenuItem>
          {user.roles?.includes('store-admin') && (
            <DropdownMenuItem asChild>
              <Link href="/chat-ai">Chat AI</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => logout()}
            disabled={isLoggingOut}
            className="cursor-pointer bg-red-500 hover:bg-red-800 text-white"
          >
            {isLoggingOut ? 'Keluar...' : 'Keluar'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      asChild
      size="sm"
      variant={isTransparent ? 'outline' : 'default'}
      className={cn(isTransparent && 'text-white hover:text-foreground')}
    >
      <Link href="/masuk">Masuk</Link>
    </Button>
  )
}
