import React from 'react'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/features/layout/header'
import { Footer } from '@/features/layout/footer'

export const metadata = {
  description:
    'Website resmi untuk para pengrajin Batik Sragen, menampilkan karya otentik dan cerita di baliknya.',
  title: 'Batik Sragen - Warisan Budaya Indonesia',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main>{children}</main>
        <Toaster />
        {/* <Footer /> */}
      </body>
    </html>
  )
}
