'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import LoginForm from './login-form'
import { schemaLogin, SchemaLogin, useLogin } from '../api/login'

export default function LoginPage() {
  const router = useRouter()
  const { mutate: register, isPending } = useLogin()

  const form = useForm<SchemaLogin>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: SchemaLogin) => {
    register(values, {
      onSuccess: () => {
        router.replace('/home')
      },
    })
  }

  return (
    <div className="container flex items-center justify-center mx-auto py-12">
      <LoginForm form={form} onSubmit={onSubmit} isPending={isPending} />
    </div>
  )
}
