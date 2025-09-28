import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound, redirect } from 'next/navigation'
import { House, Media, Order, Product } from '@/payload-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getUserOnServer } from '@/features/auth/user/api/user-actions'

type OrderDetailPageProps = {
  params: Promise<{
    orderId: string
  }>
}

const statusStyles: { [key: string]: string } = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}
const statusLabels: { [key: string]: string } = {
  pending: 'Menunggu Konfirmasi',
  processing: 'Diproses',
  shipped: 'Dikirim',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
}

export default async function OrderDetailPage({ params }: Readonly<OrderDetailPageProps>) {
  const { orderId } = await params
  const payload = await getPayload({ config })
  const user = await getUserOnServer()

  if (!user) {
    return redirect(`/masuk`)
  }

  try {
    const order = (await payload.findByID({
      collection: 'orders',
      id: orderId,
      depth: 2,
    })) as Order

    if (!order) {
      return notFound()
    }

    const orderUserId = typeof order.user === 'object' ? order.user!.id : order.user
    if (user.id !== orderUserId) {
      return (
        <div className="container mx-auto py-8 text-center">
          <h1 className="text-2xl font-bold">Akses Ditolak</h1>
          <p className="text-muted-foreground">
            Anda tidak memiliki izin untuk melihat pesanan ini.
          </p>
        </div>
      )
    }

    const orderHouse = order.house as House

    return (
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">Detail Pesanan</CardTitle>
                <CardDescription className="mt-1">
                  Nomor Pesanan: <span className="font-mono">{order.orderNumber}</span>
                </CardDescription>
              </div>
              <Badge
                className={cn('capitalize text-sm py-1 px-3', statusStyles[order.status || ''])}
              >
                {statusLabels[order.status || ''] || order.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground pt-2">
              Dipesan pada{' '}
              {new Date(order.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </CardHeader>
          <CardContent>
            {/* Daftar Produk */}
            <h3 className="text-lg font-semibold mb-4">Barang Pesanan</h3>
            <div className="space-y-4">
              {(order.items || []).map((item) => {
                const product = item.product as Product
                const productImage = (product?.images?.[0]?.image as Media)?.url
                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={productImage || 'https://placehold.co/100x100?text=No+Image'}
                        alt={product?.name || 'Gambar Produk'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <Link
                        href={`/produk/${product.slug}`}
                        className="font-semibold hover:underline"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="font-semibold">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                )
              })}
            </div>

            <Separator className="my-6" />

            {/* Rincian Biaya */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Pengiriman ({order.shippingDetails?.service})
                </span>
                <span>{formatPrice(order.shippingDetails?.cost || 0)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Alamat Pengiriman */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Alamat Pengiriman</h3>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {order.shippingAddress?.recipientName}
                  </p>
                  <p>{order.shippingAddress?.phoneNumber}</p>
                  <p>{order.shippingAddress?.fullAddress}</p>
                  <p>Kode Pos: {order.shippingAddress?.postalCode}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Info Penjual</h3>
                <p className="text-sm text-muted-foreground">
                  Pesanan ini akan dikirim oleh: <br />
                  <Link
                    href={`/toko/${orderHouse.slug}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {orderHouse.name}
                  </Link>
                </p>
                {order.trackingNumber && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Nomor Resi</h4>
                    <p className="text-sm font-mono bg-muted p-2 rounded-md inline-block">
                      {order.trackingNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error('Gagal mengambil detail pesanan:', error)
    return notFound()
  }
}
