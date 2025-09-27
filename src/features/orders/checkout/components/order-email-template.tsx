import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { render } from '@react-email/render'
import { formatPrice } from '@/lib/utils'
import { Order, House, Product } from '@/payload-types'

type Props = {
  order: Order
  house: House
}

export const OrderEmailTemplate = ({ order, house }: Props) => {
  const previewText = `Pesanan Baru Diterima: ${order.orderNumber}`
  const adminOrderUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/collections/orders/${order.id}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            {/* You can use your store's logo here */}
            {/* <Img src={...} /> */}
            <Text style={h1}>Sentra Batik Pungsari</Text>
          </Section>
          <Heading style={heading}>🔔 Pesanan Baru untuk Toko Anda!</Heading>
          <Text style={paragraph}>
            Halo {house.name}, Anda telah menerima pesanan baru dengan nomor{' '}
            <strong>{order.orderNumber}</strong>.
          </Text>

          <Hr style={hr} />

          <Text style={subheading}>Detail Pesanan:</Text>
          {(order.items || []).map((item) => {
            const product = item.product as Product
            return (
              <Text key={product.id} style={itemText}>
                - {item.productName} (x{item.quantity}) - {formatPrice(item.price * item.quantity)}
              </Text>
            )
          })}

          <Hr style={hr} />

          <Text style={detailsRow}>
            <strong>Subtotal:</strong> {formatPrice(order.subtotal!)}
          </Text>
          <Text style={detailsRow}>
            <strong>Pengiriman:</strong> {formatPrice(order.shippingDetails?.cost!)}
          </Text>
          <Text style={{ ...detailsRow, ...totalRow }}>
            <strong>Total:</strong> {formatPrice(order.total!)}
          </Text>

          <Hr style={hr} />

          <Text style={subheading}>Informasi Pembeli:</Text>
          <Text style={paragraph}>
            <strong>Nama:</strong> {order.shippingAddress?.recipientName}
            <br />
            <strong>Email:</strong> {order.customerEmail}
            <br />
            <strong>No. HP:</strong> {order.shippingAddress?.phoneNumber}
          </Text>

          <Section style={buttonContainer}>
            <a style={button} href={adminOrderUrl} target="_blank">
              Lihat & Konfirmasi Pesanan
            </a>
          </Section>

          <Text style={paragraph}>
            Harap segera periksa bukti pembayaran yang dilampirkan dan proses pesanan ini di dasbor
            admin Anda.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// --- Styles for the email component ---
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Helvetica,Arial,sans-serif',
}
const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
}
const logoContainer = {
  textAlign: 'center' as const,
  padding: '20px 0',
}
const h1 = {
  color: '#1d1c1d',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
}
const heading = {
  color: '#1d1c1d',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
}
const subheading = {
  color: '#000000',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '24px 20px 8px',
}
const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  margin: '0 20px',
}
const itemText = {
  ...paragraph,
  fontSize: '14px',
}
const detailsRow = {
  ...paragraph,
  fontSize: '14px',
  margin: '4px 20px',
}
const totalRow = {
  fontWeight: 'bold',
  fontSize: '16px',
}
const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}
const button = {
  backgroundColor: '#000000',
  borderRadius: '4px',
  color: '#FFF',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 20px',
}
const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

export function newOrderEmail(props: Props) {
  return render(<OrderEmailTemplate {...props} />)
}
