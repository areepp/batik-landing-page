'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
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
    <div className="container flex items-center justify-center min-h-screen py-12">
      <RegisterForm form={form} onSubmit={onSubmit} isPending={isPending} />
    </div>
  )
}
