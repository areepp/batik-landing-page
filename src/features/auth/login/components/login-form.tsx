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
import { SchemaLogin } from '../api/login'

type ILoginProps = {
  form: UseFormReturn<SchemaLogin>
  onSubmit: (values: SchemaLogin) => void
  isPending?: boolean
}

const LoginForm = ({ form, onSubmit, isPending }: ILoginProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Masuk Akun</CardTitle>
        <CardDescription>Masukkan email dan password Anda untuk masuk.</CardDescription>
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
              {form.formState.isSubmitting ? 'Masuk...' : 'Masuk'}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Belum punya akun?{' '}
          <Link href="/register" className="underline">
            Daftar
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginForm
