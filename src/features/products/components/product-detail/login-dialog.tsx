import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Link from 'next/link'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginDialog({ isOpen, onOpenChange }: Readonly<Props>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Anda Belum Masuk</DialogTitle>
          <DialogDescription>
            Silakan masuk atau buat akun baru untuk menambahkan produk ke keranjang Anda.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button variant="outline" asChild>
            <Link href="/login">Masuk</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Buat Akun</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
