'use client'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Flow } from 'react-chatbotify'
import { House } from '@/payload-types'

const ChatBot = lazy(() => import('react-chatbotify'))

type Props = {
  houses: House[]
}

export default function FaqBot({ houses }: Props) {
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
          return 'ask_interest_A2'
        } else {
          await params.injectMessage('Maaf, sepertinya Anda belum memasukkan nama.')
          return 'start'
        }
      },
    },
    ask_interest_A2: {
      options: ['Ya', 'Tidak'],
      path: (params) => {
        if (params.userInput.toLowerCase() === 'ya') {
          return 'ask_product_type_A3'
        }
        return 'not_interested_A4'
      },
    },
    ask_product_type_A3: {
      message: 'Baik, Anda tertarik pada produk batik yang seperti apa?',
      options: ['Kemeja', 'Dress', 'Kain'],
      path: 'process_product_type_B',
    },
    not_interested_A4: {
      message: `Sayang sekali Anda tidak tertarik pada produk batik. Batik merupakan karya warisan budaya yang sudah mendunia yang perlu dilestarikan. Batik Pungsari Sragen adalah karya seni warisan leluhur yang lahir dari tangan-tangan terampil masyarakat Desa Pungsari, Plupuh, Sragen. Batik ini tidak hanya sekadar kain, melainkan sebuah narasi visual yang kaya akan makna filosofis dan kearifan lokal. Setiap motif yang terukir adalah cerminan dari alam, budaya, dan nilai-nilai luhur yang dijunjung tinggi oleh masyarakat setempat.. Apakah Anda tertarik untuk mengetahui lebih lanjut tentang batik Pungsari?`,
      options: ['Ya, saya tertarik', 'Tidak'],
      path: (params) => {
        if (params.userInput.toLowerCase().includes('ya')) {
          return 'ask_more_info_A5'
        }
        return 'end_conversation'
      },
    },
    ask_more_info_A5: {
      message: 'Terima kasih! Apa yang ingin Anda ketahui tentang batik Pungsari?',
      options: mainOptions,
      path: 'process_main_options',
    },
    process_product_type_B: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        switch (params.userInput) {
          case 'Kemeja':
            await params.injectMessage(
              'Kemeja batik Pungsari merupakan kemeja yang memiliki ciri khas pada motif dan pewarnaan. Kemeja memiliki kesan formal yang profesional dan menarik. Silahkan kunjungi link berikut untuk melihat katalog kemeja batik pungsari.',
            )
            // Di sini Anda bisa menambahkan link
            // window.open('/products?category=kemeja', '_blank');
            break
          case 'Dress':
            await params.injectMessage(
              'Dress batik desa Pungsari terdiri dari berbagai model yang indah dan cocok digunakan untuk beragam acara seperti kasual maupun formal. Silahkan kunjungi link berikut untuk melihat katalog dress batik pungsari',
            )
            break
          case 'Kain':
            await params.injectMessage(
              `Batik Pungsari dikenal dengan motif klasik dan kontemporer yang harmonis. Motif klasik seperti Batik Sidomukti, Parang, dan Kawung diolah dengan sentuhan modern, menghasilkan karya yang relevan tanpa kehilangan esensinya. Salah satu keunikan utamanya adalah penggunaan pewarna alami yang diekstrak dari tumbuh-tumbuhan seperti kulit kayu mahoni, daun indigo, dan tegeran. Proses pewarnaan alami ini tidak hanya ramah lingkungan, tetapi juga menghasilkan warna-warna yang lembut, otentik, dan tahan lama.

Berikut beberapa jenis kain batik yang terdapat di desa Pungsari:
1. Batik cap  
2. Batik tulis

Mana yang Anda minati?`,
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
            'Batik cap dari Desa Pungsari, Sragen, adalah salah satu jenis batik yang diproduksi oleh para perajin lokal. Berbeda dengan batik tulis yang dibuat menggunakan canting tangan secara detail, batik cap dibuat dengan menggunakan alat stempel (canting cap) dari tembaga. Proses ini membuat produksi lebih cepat dan harganya pun lebih terjangkau. Batik cap pungsari memiliki cirikhas seperti motif berulang & simetris, warna yang kontras, aroma malam yang khas, dan fleksibilitas desain. Berikut tautan yang bisa Anda gunakan untuk melihat koleksi kain batik cap Pungsari',
          )
        } else {
          await params.injectMessage(
            'Batik tulis dari Desa Pungsari, Sragen, adalah karya seni yang murni dan autentik. Proses pembuatannya sangat bergantung pada keahlian tangan para perajin. Tidak seperti batik cap yang menggunakan stempel, batik tulis dibuat secara manual dengan menggunakan canting, yaitu alat berisi malam panas yang digunakan untuk melukis pola di atas kain. Ciri khas dari batik tulis pungsari adalah pola yang sempurna namun bernuansa kontemporer, warna meresap, motif klasik dengan sentuhan khas pungsari, proses pengerjaan yang mengutamakan kualitas. Berikut tautan yang bisa Anda gunakan untuk melihat koleksi kain batik tulis Pungsari',
          )
        }
        await new Promise((resolve) => setTimeout(resolve, 1500))
        return 'anything_else'
      },
    },
    process_main_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        switch (params.userInput) {
          case 'Produk Batik':
            return 'ask_product_type_A3'
          case 'Jenis Batik':
            return 'ask_kain_type'
          case 'Usaha Batik Pungsari':
            if (houses && houses.length > 0) {
              const houseList = houses
                .map((house, index) => `${index + 1}. ${house.name}`)
                .join('\n')
              await params.injectMessage(
                `Terdapat beberapa rumah usaha industri batik yang berada di desa Pungsari. \n\n${houseList}\n\nSilakan ketik nomor untuk melihat koleksi dari toko yang Anda minati:`,
              )
              return 'process_house_choice'
            } else {
              await params.injectMessage(
                'Maaf, saat ini saya tidak dapat memuat daftar toko. Silakan coba lagi nanti.',
              )
              return 'anything_else'
            }
          default:
            return 'unknown'
        }
      },
    },
    process_house_choice: {
      path: async (params) => {
        const choice = parseInt(params.userInput, 10)
        if (!isNaN(choice) && choice > 0 && choice <= houses.length) {
          const selectedHouse = houses[choice - 1]
          await params.injectMessage(
            `Baik, saya akan alihkan Anda ke halaman ${selectedHouse.name}...`,
          )
          window.location.href = `/toko/${selectedHouse.slug}`
          return 'anything_else'
        } else {
          await params.injectMessage(
            'Maaf, pilihan tidak valid. Silakan masukkan nomor yang sesuai dari daftar.',
          )
          // Kembali ke show houses dengan data yang sama
          const houseList = houses.map((house, index) => `${index + 1}. ${house.name}`).join('\n')
          await params.injectMessage(
            `Terdapat beberapa rumah usaha industri batik yang berada di desa Pungsari. \n\n${houseList}\n\nSilakan ketik nomor untuk melihat koleksi dari toko yang Anda minati:`,
          )
          return 'process_house_choice'
        }
      },
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
            themes={{ id: 'minimal_midnight', version: '0.1.0' }}
          />
        </Suspense>
      )}
    </>
  )
}
