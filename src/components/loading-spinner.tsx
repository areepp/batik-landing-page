import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoadingSpinner({ className }: Readonly<{ className?: string }>) {
  return <Loader2 className={cn('h-5 w-5 animate-spin text-muted-foreground', className)} />
}
