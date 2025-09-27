'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Order, House } from '@/payload-types'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

type Props = {
  orders: Order[]
}

const statusOptions = [
  { value: 'all', label: 'Semua' },
  { value: 'pending', label: 'Menunggu Konfirmasi' },
  { value: 'processing', label: 'Diproses' },
  { value: 'shipped', label: 'Dikirim' },
  { value: 'completed', label: 'Selesai' },
  { value: 'cancelled', label: 'Dibatalkan' },
]

const statusStyles: { [key: string]: string } = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

export function HistoryTable({ orders }: Props) {
  const [activeFilter, setActiveFilter] = React.useState('all')

  const filteredOrders = React.useMemo(() => {
    if (activeFilter === 'all') {
      return orders
    }
    return orders.filter((order) => order.status === activeFilter)
  }, [orders, activeFilter])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Riwayat Pesanan Saya</CardTitle>
          <CardDescription>Lihat semua transaksi yang pernah Anda lakukan di sini.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={activeFilter === option.value ? 'default' : 'outline'}
                onClick={() => setActiveFilter(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {activeFilter === 'all'
                  ? 'Anda belum memiliki riwayat pesanan.'
                  : `Tidak ada pesanan dengan status "${
                      statusOptions.find((o) => o.value === activeFilter)?.label
                    }".`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nomor Pesanan</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Toko Penjual</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const house = order.house as House
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          {house?.name ? (
                            <Link href={`/toko/${house.slug}`} className="hover:underline">
                              {house.name}
                            </Link>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn('capitalize', statusStyles[order.status || ''])}>
                            {statusOptions.find((o) => o.value === order.status)?.label ||
                              order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/pesanan/${order.id}`}>Lihat Detail</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
