import React from 'react'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/features/layout/navbar'
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
        <Navbar />
        <main className="pb-24">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
