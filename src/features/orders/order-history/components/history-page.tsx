import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Order } from '@/payload-types'
import { HistoryTable } from '@/features/orders/order-history/components/history-table'
import { getUserOnServer } from '@/features/auth/user/api/user-actions'

export default async function Historypage() {
  const payload = await getPayload({ config })
  const user = await getUserOnServer()

  if (!user) {
    return redirect('/masuk')
  }

  try {
    const { docs: orders } = (await payload.find({
      collection: 'orders',
      where: {
        user: {
          equals: user.id,
        },
      },
      depth: 2,
      sort: '-createdAt',
    })) as { docs: Order[] }

    return <HistoryTable orders={orders} />
  } catch (error) {
    console.error('Gagal mengambil data pesanan:', error)
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold">Terjadi Kesalahan</h1>
        <p className="text-muted-foreground">Tidak dapat memuat riwayat pesanan Anda saat ini.</p>
      </div>
    )
  }
}
