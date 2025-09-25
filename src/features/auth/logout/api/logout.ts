'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const logoutUser = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Logout gagal.')
  }

  return true
}

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth-user'] })
      toast.success('Logout Berhasil!')
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
