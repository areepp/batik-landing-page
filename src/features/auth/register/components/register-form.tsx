import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { SchemaRegister } from '../api/register'

type IRegisterProps = {
  form: UseFormReturn<SchemaRegister>
  onSubmit: (values: SchemaRegister) => void
  isPending?: boolean
}

const RegisterForm = ({ form, onSubmit, isPending }: IRegisterProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
        <CardDescription>Masukkan email dan password Anda untuk mendaftar.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="anda@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || isPending}
              isLoading={isPending}
            >
              {form.formState.isSubmitting ? 'Mendaftar...' : 'Daftar'}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun?{' '}
          <Link href="/login" className="underline">
            Masuk
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default RegisterForm
