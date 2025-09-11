import { Payload, type Endpoint } from 'payload'

type MidtransNotificationPayload = {
  transaction_time: string
  transaction_status:
    | 'capture'
    | 'settlement'
    | 'pending'
    | 'deny'
    | 'cancel'
    | 'expire'
    | 'failure'
    | 'refund'
    | 'partial_refund'
    | 'authorize'
  transaction_id: string
  status_message: string
  status_code: string
  signature_key: string
  payment_type:
    | 'credit_card'
    | 'gopay'
    | 'qris'
    | 'shopeepay'
    | 'bank_transfer'
    | 'echannel'
    | 'permata_va'
    | 'bca_va'
    | 'bni_va'
    | 'bri_va'
    | 'cimb_va'
    | 'indomaret'
    | 'alfamart'
    | 'akulaku'
  order_id: string
  metadata?: Record<string, any>
  merchant_id: string
  gross_amount: string
  fraud_status?: 'accept' | 'deny'
  currency: string

  masked_card?: string
  expiry_time?: string
  channel_response_message?: string
  channel_response_code?: string
  card_type?: 'credit' | 'debit'
  bank?: string
  approval_code?: string
  permata_va_number?: string
  va_numbers?: {
    bank: string
    va_number: string
  }[]
  payment_code?: string
  store?: string
}

const handleMidtransNotification = async (
  payload: Payload,
  notification: MidtransNotificationPayload,
) => {
  const transactionStatus = notification.transaction_status
  const orderId = notification.order_id
  const fraudStatus = notification.fraud_status

  try {
    console.log(`Midtrans notification received for order ${orderId}: ${transactionStatus}}`)

    const { docs: orders } = await payload.find({
      collection: 'orders',
      where: {
        orderNumber: {
          equals: orderId,
        },
      },
      limit: 1,
    })

    const order = orders[0]
    if (!order) {
      console.error(`Order with ID ${orderId} not found.`)
      return
    }

    let newStatus = order.status

    if (transactionStatus == 'capture' || transactionStatus == 'settlement') {
      if (fraudStatus == 'accept' || !fraudStatus) {
        newStatus = 'paid'
      }
    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire') {
      newStatus = 'cancelled'
    } else if (transactionStatus == 'pending') {
      // Still pending, no status change needed
    }

    if (newStatus !== order.status) {
      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          status: newStatus,
          paymentTransactionId: notification.transaction_id,
        },
      })
      console.log(`Order ${orderId} status updated to ${newStatus}`)
    }
  } catch (error) {
    console.error('Error handling Midtrans notification:', error)
    throw error // Re-throw to send a non-200 response to Midtrans
  }
}

export const midtransWebhook: Endpoint = {
  path: '/midtrans-notification',
  method: 'post',
  handler: async (req) => {
    try {
      const data = await req?.json?.()
      await handleMidtransNotification(req.payload, data)
      return Response.json({ message: 'Notification received successfully.' })
    } catch (error: any) {
      console.error(`Webhook error: ${error.message}`)
      return Response.json({ error: 'Error processing notification.' }, { status: 500 })
    }
  },
}
