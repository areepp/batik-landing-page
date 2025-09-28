import React from 'react'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Cormorant_Garamond, Prata } from 'next/font/google'
import FaqBot from '@/components/chat-bot'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { House, JenisProduk } from '@/payload-types'
import Providers from './providers'

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

  const { docs: jenisProduks } = (await payload.find({
    collection: 'jenis-produk',
    limit: 100,
    depth: 0,
  })) as { docs: JenisProduk[] }

  return (
    <html lang="en">
      <head />
      <body className={`${cormorantSerif.variable} ${prataSerif.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main className="py-16 min-h-[calc(100vh-8rem)]">{children}</main>
          <Footer />
          <FaqBot houses={houses} jenisProduks={jenisProduks} />
        </Providers>
      </body>
    </html>
  )
}
