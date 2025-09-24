import { MutationConfig } from '@/lib/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import z from 'zod'

export const schemaLogin = z.object({
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  password: z.string().min(1, { message: 'Password tidak boleh kosong.' }),
})

export type SchemaLogin = z.infer<typeof schemaLogin>

export const login = async (values: SchemaLogin) => {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.errors?.[0]?.message || 'Email atau password salah.')
  }

  return response.json()
}

export const useLogin = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof login>
} = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    mutationFn: login,
    onSuccess: (user, ...args) => {
      queryClient.setQueryData(['auth-user'], user)
      toast.success('Login Berhasil!')
      onSuccess?.(user, ...args)
    },
    onError: (error, ...args) => {
      toast.error(error.message)
      onError?.(error, ...args)
    },
    ...restConfig,
  })
}
