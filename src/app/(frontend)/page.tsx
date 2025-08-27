// app/(frontend)/page.tsx

import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 bg-gray-800">
      <div className="flex flex-col items-center gap-y-8 text-center">
        <Image
          alt="Payload Logo"
          height={65}
          src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
          width={65}
        />

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {!user ? 'Welcome to your new project.' : `Welcome back, ${user.email}`}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild>
            <Link href={payloadConfig.routes.admin} target="_blank" rel="noopener noreferrer">
              Go to Admin Panel
            </Link>
          </Button>

          <Button asChild variant="secondary">
            <Link href="https://payloadcms.com/docs" target="_blank" rel="noopener noreferrer">
              Documentation
            </Link>
          </Button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Update this page by editing</p>
        <Link className="font-mono text-sm hover:underline" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </Link>
      </div>
    </main>
  )
}
