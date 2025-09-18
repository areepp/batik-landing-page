import React from 'react'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Cormorant_Garamond, Prata } from 'next/font/google'

const cormorantSerif = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
})

const prataSerif = Prata({
  variable: '--font-prata',
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  description: 'Website resmi untuk para pengrajin Batik Desa Pungsari Sragen',
  title: 'Sentra Batik Pungsari',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head />
      <body className={`${cormorantSerif.variable} ${prataSerif.variable} antialiased`}>
        <Navbar />
        <main className="py-16">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
