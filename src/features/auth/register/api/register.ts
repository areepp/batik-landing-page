import z from 'zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { MutationConfig } from '@/lib/react-query'

export const schemaRegister = z.object({
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  password: z.string().min(8, { message: 'Password harus minimal 8 karakter.' }),
})

export type SchemaRegister = z.infer<typeof schemaRegister>

export const register = async (values: SchemaRegister) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
      roles: ['customer'],
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.errors?.[0]?.message || 'Pendaftaran gagal.')
  }

  return response.json()
}

export const useRegister = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof register>
} = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    mutationFn: register,
    onSuccess: (...args) => {
      toast.success('Register Berhasil!')
      onSuccess?.(...args)
    },
    onError: (error, ...args) => {
      toast.error(error.message)
    },
    ...restConfig,
  })
}
