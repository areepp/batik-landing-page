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

export function UserProfileDropdown() {
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
            variant={'ghost'}
            className="text-white border-1 border-white relative flex items-center gap-2"
          >
            <UserCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Profil</span>
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
            <Link href="/account">Akun Saya</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/orders">Pesanan</Link>
          </DropdownMenuItem>
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
    <Button asChild size="sm">
      <Link href="/masuk">Masuk</Link>
    </Button>
  )
}
