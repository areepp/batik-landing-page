'use client'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Flow } from 'react-chatbotify'

const ChatBot = lazy(() => import('react-chatbotify'))

export default function FaqBot() {
  const [userName, setUserName] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const mainOptions = ['Produk Batik', 'Jenis Batik', 'Usaha Batik Pungsari']

  const flow: Flow = {
    start: {
      message:
        'Hai, saya Sari, asisten virtual yang akan melayani Anda. Bolehkah kita berkenalan terlebih dahulu? Siapa nama Anda?',
      path: async (params) => {
        const name = params.userInput.trim()
        if (name) {
          setUserName(name)
          // Menggunakan nama tersebut di pesan berikutnya
          await params.injectMessage(`Hai, ${name}! Apakah Anda sedang mencari produk batik?`)
          return 'ask_interest'
        } else {
          await params.injectMessage('Maaf, sepertinya Anda belum memasukkan nama.')
          return 'start'
        }
      },
    },
    ask_interest: {
      options: ['Ya', 'Tidak'],
      path: (params) => {
        if (params.userInput.toLowerCase() === 'ya') {
          return 'ask_product_type'
        }
        return 'explain_batik'
      },
    },
    ask_product_type: {
      message: 'Baik, Anda tertarik pada produk batik yang seperti apa?',
      options: ['Kemeja', 'Dress', 'Kain'],
      path: 'process_product_type',
    },
    explain_batik: {
      message: `Sayang sekali Anda tidak tertarik pada produk batik. Batik merupakan karya warisan budaya yang sudah mendunia... (dan seterusnya, sesuai teks A4). Apakah Anda tertarik untuk mengetahui lebih lanjut tentang batik Pungsari?`,
      options: ['Ya, saya tertarik', 'Tidak'],
      path: (params) => {
        if (params.userInput.toLowerCase().includes('ya')) {
          return 'ask_more_info'
        }
        return 'end_conversation'
      },
    },
    ask_more_info: {
      message: 'Terima kasih! Apa yang ingin Anda ketahui tentang batik Pungsari?',
      options: mainOptions,
      path: 'process_main_options',
    },
    process_product_type: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        switch (params.userInput) {
          case 'Kemeja':
            await params.injectMessage(
              'Kemeja batik Pungsari memiliki ciri khas pada motif dan pewarnaan... (sesuai teks B2).',
            )
            // Di sini Anda bisa menambahkan link
            // window.open('/products?category=kemeja', '_blank');
            break
          case 'Dress':
            await params.injectMessage(
              'Dress batik desa Pungsari terdiri dari berbagai model yang indah... (sesuai teks B3).',
            )
            break
          case 'Kain':
            await params.injectMessage(
              'Batik Pungsari dikenal dengan motif klasik dan kontemporer yang harmonis... (sesuai teks B4).',
            )
            return 'ask_kain_type'
        }
        await new Promise((resolve) => setTimeout(resolve, 1500))
        return 'anything_else'
      },
    },
    ask_kain_type: {
      message:
        'Berikut beberapa jenis kain batik yang terdapat di desa Pungsari. Mana yang Anda minati?',
      options: ['Batik Cap', 'Batik Tulis'],
      path: 'process_kain_type',
    },
    process_kain_type: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        if (params.userInput === 'Batik Cap') {
          await params.injectMessage(
            'Batik cap dari Desa Pungsari adalah salah satu jenis batik... (sesuai teks C1).',
          )
        } else {
          await params.injectMessage(
            'Batik tulis dari Desa Pungsari adalah karya seni yang murni... (sesuai teks C2).',
          )
        }
        await new Promise((resolve) => setTimeout(resolve, 1500))
        return 'anything_else'
      },
    },
    process_main_options: {
      transition: { duration: 0 },
      path: (params) => {
        switch (params.userInput) {
          case 'Produk Batik':
            return 'ask_product_type'
          case 'Jenis Batik':
            return 'ask_kain_type'
          case 'Usaha Batik Pungsari':
            return 'show_houses'
        }
        return 'unknown'
      },
    },
    show_houses: {
      message:
        'Terdapat beberapa rumah usaha industri batik di desa Pungsari. Anda dapat melihat koleksi dari setiap rumah industri di halaman Pengrajin kami.',
      path: 'anything_else',
    },
    anything_else: {
      message: `Apakah ada hal lain yang bisa saya bantu, ${userName}?`,
      options: mainOptions,
      path: 'process_main_options',
    },
    end_conversation: {
      message:
        'Baik, terima kasih telah berkunjung. Jika Anda berubah pikiran, jangan ragu untuk bertanya lagi!',
      path: 'start', // Kembali ke awal setelah beberapa saat
      transition: { duration: 3000 },
    },
    unknown: {
      message: 'Maaf, saya tidak mengerti. Silakan pilih salah satu opsi di bawah ini.',
      options: mainOptions,
      path: 'process_main_options',
    },
  }

  return (
    <>
      {isLoaded && (
        <Suspense fallback={<div>Loading...</div>}>
          <ChatBot
            settings={{
              chatHistory: { storageKey: 'batik_pungsari_faq_bot' },
              botBubble: { simulateStream: true },
              header: {
                title: 'Sari',
              },
              footer: {
                text: '',
              },
            }}
            flow={flow}
          />
        </Suspense>
      )}
    </>
  )
}
