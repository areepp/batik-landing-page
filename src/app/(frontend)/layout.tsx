import React from 'react'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import FaqBot from '@/components/chat-bot'

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
        <main className="py-16">{children}</main>
        <Toaster />
        <Footer />
        <FaqBot />
      </body>
    </html>
  )
}
