'use client'

import { useEffect, useState } from 'react'

const MIDTRANS_SNAP_URL = 'https://app.sandbox.midtrans.com/snap/snap.js'
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!

export function useSnap() {
  const [snap, setSnap] = useState<any>(null)

  useEffect(() => {
    if (window.snap) {
      setSnap(window.snap)
      return
    }

    const script = document.createElement('script')
    script.src = MIDTRANS_SNAP_URL
    script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY)
    script.async = true

    script.onload = () => {
      setSnap(window.snap)
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const snapEmbed = (snapToken: string, options?: any) => {
    if (snap) {
      snap.pay(snapToken, options)
    }
  }

  return { snapEmbed, snap }
}
