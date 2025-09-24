'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SchemaRegister, schemaRegister, useRegister } from '@/features/auth/register/api/register'
import RegisterForm from '@/features/auth/register/components/register-form'

export default function RegisterPage() {
  const router = useRouter()
  const { mutate: register, isPending } = useRegister()

  const form = useForm<SchemaRegister>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: SchemaRegister) => {
    register(values, {
      onSuccess: () => {
        router.replace('/home')
      },
    })
  }

  return (
    <div className="container flex items-center justify-center mx-auto py-12">
      <RegisterForm form={form} onSubmit={onSubmit} isPending={isPending} />
    </div>
  )
}
