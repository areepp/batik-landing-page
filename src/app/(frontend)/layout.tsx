import React from 'react'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Cormorant_Garamond, Prata } from 'next/font/google'
import FaqBot from '@/components/chat-bot'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { House } from '@/payload-types'

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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })

  const { docs: houses } = (await payload.find({
    collection: 'houses',
    limit: 100,
    depth: 0,
  })) as { docs: House[] }

  return (
    <html lang="en">
      <head />
      <body className={`${cormorantSerif.variable} ${prataSerif.variable} antialiased`}>
        <Navbar />
        <main className="py-16">{children}</main>
        <Toaster />
        <Footer />
        <FaqBot houses={houses} />
      </body>
    </html>
  )
}
