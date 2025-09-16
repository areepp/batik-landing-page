import { House, JenisBatik, JenisKain, Media } from '../payload-types'

// Tipe untuk mempermudah passing data antar fungsi
type Ids = {
  houses: Record<string, number>
  batik: Record<string, number>
  kain: Record<string, number>
  media: number[]
}

// Fungsi pembantu untuk mengacak array dan mengambil N item pertama
const getRandomItems = <T>(arr: T[], n: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

export const getProductsData = (ids: Ids) => [
  // --- Produk untuk Batik Welasasih ---
  {
    name: 'Kemeja Batik Tulis Sutra Parang',
    house: ids.houses['Batik Welasasih'],
    price: 750000,
    description:
      'Kemeja batik tulis eksklusif dengan motif Parang di atas kain sutra halus, cocok untuk acara formal.',
    details: [
      { detailItem: 'Perawatan: Dry Clean Only' },
      { detailItem: 'Asal: Sragen, Jawa Tengah' },
    ],
    jenisBatik: [ids.batik['Batik Tulis']],
    jenisKain: [ids.kain['Sutra Tulis']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Kain Batik Tulis Katun Motif Kawung',
    house: ids.houses['Batik Welasasih'],
    price: 500000,
    description:
      'Kain batik tulis otentik dengan motif Kawung klasik. Dibuat dengan tangan oleh pengrajin berpengalaman.',
    details: [{ detailItem: 'Bahan: Katun Primisima' }, { detailItem: 'Ukuran: 2.5m x 1.15m' }],
    jenisBatik: [ids.batik['Batik Tulis']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Cahaya Sari ---
  {
    name: 'Hem Batik Printing Modern Abstrak',
    house: ids.houses['Batik Cahaya Sari'],
    price: 150000,
    description: 'Hem batik printing dengan corak abstrak modern, nyaman dipakai sehari-hari.',
    details: [{ detailItem: 'Bahan: Katun Halus' }, { detailItem: 'Jahitan: Rapi' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Blus Batik Cap Motif Bunga',
    house: ids.houses['Batik Cahaya Sari'],
    price: 200000,
    description:
      'Blus wanita elegan dengan motif bunga yang dibuat menggunakan teknik cap tradisional.',
    details: [{ detailItem: 'Model: Lengan Panjang' }, { detailItem: 'Warna: Biru Dongker' }],
    jenisBatik: [ids.batik['Batik Cap']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Tresno Kuncoro ---
  {
    name: 'Kain Batik Cap Motif Kontemporer',
    house: ids.houses['Batik Tresno Kuncoro'],
    price: 125000,
    description: 'Kain serbaguna dengan motif cap kontemporer, cocok untuk bahan busana kasual.',
    details: [{ detailItem: 'Bahan: Katun' }, { detailItem: 'Pewarnaan: Sintetis' }],
    jenisBatik: [ids.batik['Batik Cap']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Kemeja Printing Motif Geometris',
    house: ids.houses['Batik Tresno Kuncoro'],
    price: 100000,
    description: 'Kemeja pria lengan pendek dengan motif geometris yang dinamis dan modern.',
    details: [{ detailItem: 'Ukuran: M, L, XL' }, { detailItem: 'Kerah: Point Collar' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Nurhasida ---
  {
    name: 'Dress Batik Tulis Motif Flora',
    house: ids.houses['Batik Nurhasida'],
    price: 250000,
    description:
      'Dress wanita anggun dengan detail batik tulis motif flora yang halus dan mendetail.',
    details: [{ detailItem: 'Panjang: Selutut' }, { detailItem: 'Resleting: Belakang' }],
    jenisBatik: [ids.batik['Batik Tulis']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Kemeja Batik Cap Lengan Panjang',
    house: ids.houses['Batik Nurhasida'],
    price: 180000,
    description: 'Kemeja formal pria dengan motif cap yang rapi, memberikan kesan wibawa.',
    details: [{ detailItem: 'Saku: Satu di dada kiri' }, { detailItem: 'Bahan: Katun Premium' }],
    jenisBatik: [ids.batik['Batik Cap']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Dewi Andini ---
  {
    name: 'Outer Batik Printing Kain Dolby',
    house: ids.houses['Batik Dewi Andini'],
    price: 185000,
    description:
      'Outerwear modern dari kain dolby yang berkilau, dengan motif printing yang cerah.',
    details: [{ detailItem: 'Model: Kimono' }, { detailItem: 'Ukuran: All Size' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Dolby']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Kemeja Anak Batik Printing Ceria',
    house: ids.houses['Batik Dewi Andini'],
    price: 95000,
    description: 'Kemeja anak dengan motif printing ceria dan bahan katun yang adem.',
    details: [{ detailItem: 'Usia: 2-8 tahun' }, { detailItem: 'Bahan: Katun Combed' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Batarakresna ---
  {
    name: 'Kain Batik Printing Motif Klasik',
    house: ids.houses['Batik Batarakresna'],
    price: 130000,
    description:
      'Kain batik dengan motif klasik yang diproduksi menggunakan teknik printing modern.',
    details: [{ detailItem: 'Ukuran: 2.4m x 1.15m' }, { detailItem: 'Rekomendasi: Seragam' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Tunik Wanita Kain Dolby',
    house: ids.houses['Batik Batarakresna'],
    price: 190000,
    description: 'Tunik wanita dari kain dolby yang memberikan efek mewah, cocok untuk pesta.',
    details: [{ detailItem: 'Panjang: Menutupi pinggul' }, { detailItem: 'Warna: Marun' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Dolby']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Lestari ---
  {
    name: 'Kain Panjang Batik Tulis Colet',
    house: ids.houses['Batik Lestari'],
    price: 300000,
    description:
      'Kain panjang serbaguna yang dibuat dengan teknik tulis dan pewarnaan colet tangan.',
    details: [{ detailItem: 'Pewarna: Alami' }, { detailItem: 'Motif: Sida Luhur' }],
    jenisBatik: [ids.batik['Batik Tulis']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Kemeja Kantor Batik Printing',
    house: ids.houses['Batik Lestari'],
    price: 90000,
    description: 'Kemeja kerja pria dengan motif printing yang rapi dan harga terjangkau.',
    details: [{ detailItem: 'Model: Slim Fit' }, { detailItem: 'Warna: Hitam Putih' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Sri Mulyani ---
  {
    name: "Gamis Batik Printing Syar'i",
    house: ids.houses['Batik Sri Mulyani'],
    price: 180000,
    description: 'Gamis panjang dengan motif printing elegan, cocok untuk busana muslimah.',
    details: [{ detailItem: 'Bahan: Katun Rayon' }, { detailItem: 'Ukuran: M - XXL' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Couple Set Kemeja dan Blus',
    house: ids.houses['Batik Sri Mulyani'],
    price: 250000,
    description:
      'Setelan pasangan (sarimbit) terdiri dari kemeja pria dan blus wanita dengan motif senada.',
    details: [{ detailItem: 'Acara: Kondangan, Lamaran' }, { detailItem: 'Harga untuk sepasang' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Widowati ---
  {
    name: 'Kemeja Pria Dolby Lengan Panjang',
    house: ids.houses['Batik Widowati'],
    price: 160000,
    description: 'Kemeja pria formal dari kain dolby yang memberikan kesan kilap dan mewah.',
    details: [{ detailItem: 'Lapisan: Furing' }, { detailItem: 'Kancing: Tersembunyi' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Dolby']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Rok Lilit Batik Printing',
    house: ids.houses['Batik Widowati'],
    price: 110000,
    description: 'Rok lilit praktis dengan motif printing modern, mudah dipadupadankan.',
    details: [{ detailItem: 'Panjang: 100cm' }, { detailItem: 'Bonus: Ring gesper' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Vivi ---
  {
    name: 'Kain Batik Printing Seragam Guru',
    house: ids.houses['Batik Vivi'],
    price: 135000,
    description: 'Kain batik dengan motif printing yang cocok untuk seragam kantor atau guru.',
    details: [{ detailItem: 'Bahan: Katun' }, { detailItem: 'Tidak mudah luntur' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Kemeja Casual Lengan Pendek',
    house: ids.houses['Batik Vivi'],
    price: 120000,
    description: 'Kemeja kasual untuk pria dengan motif printing yang santai dan bahan adem.',
    details: [{ detailItem: 'Model: Reguler' }, { detailItem: 'Warna: Coklat' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Sea ---
  {
    name: 'Blazer Batik Printing Dolby',
    house: ids.houses['Batik Sea'],
    price: 190000,
    description:
      'Blazer wanita modern dari kain dolby dengan motif printing yang tegas dan elegan.',
    details: [{ detailItem: 'Ukuran: All Size fit to L' }, { detailItem: 'Tanpa Kancing' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Dolby']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Daster Batik Katun Adem',
    house: ids.houses['Batik Sea'],
    price: 85000,
    description: 'Daster rumahan yang sangat nyaman dengan bahan katun dan motif printing.',
    details: [{ detailItem: 'Ukuran: Jumbo' }, { detailItem: 'Kancing: Depan (Busui Friendly)' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Murni Asih ---
  {
    name: 'Kain Batik Tulis Pesisiran',
    house: ids.houses['Batik Murni Asih'],
    price: 450000,
    description: 'Kain batik tulis otentik dengan corak pesisiran yang cerah dan dinamis.',
    details: [{ detailItem: 'Pewarna: Sintetis' }, { detailItem: 'Ukuran: 2.5m x 1.15m' }],
    jenisBatik: [ids.batik['Batik Tulis']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Kemeja Batik Cap Dolby Premium',
    house: ids.houses['Batik Murni Asih'],
    price: 180000,
    description: 'Kemeja pria premium dari kain dolby yang mewah dengan proses cap manual.',
    details: [{ detailItem: 'Lapisan: Furing Tricot' }, { detailItem: 'Warna: Hijau Botol' }],
    jenisBatik: [ids.batik['Batik Cap']],
    jenisKain: [ids.kain['Dolby']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Asha ---
  {
    name: 'Kemeja Batik Tulis Pria Eksklusif',
    house: ids.houses['Batik Asha'],
    price: 380000,
    description: 'Kemeja batik tulis pria lengan panjang, karya seni yang bisa dipakai.',
    details: [
      { detailItem: 'Proses: Tulis tangan 100%' },
      { detailItem: 'Motif: Unik tidak pasaran' },
    ],
    jenisBatik: [ids.batik['Batik Tulis']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Kain Printing Bahan Dolby',
    house: ids.houses['Batik Asha'],
    price: 170000,
    description: 'Kain bahan dolby dengan motif printing modern, memberikan kesan mewah.',
    details: [{ detailItem: 'Lebar Kain: 115cm' }, { detailItem: 'Harga per 2.4 meter' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Dolby']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },

  // --- Produk untuk Batik Miyayi ---
  {
    name: 'Kemeja Batik Sutra Printing',
    house: ids.houses['Batik Miyayi'],
    price: 190000,
    description: 'Kemeja pria elegan dari bahan sutra dengan motif printing yang halus.',
    details: [{ detailItem: 'Bahan: Sutra Sintetis' }, { detailItem: 'Sensasi: Dingin dan jatuh' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Sutra']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
  {
    name: 'Blus Kantor Batik Printing',
    house: ids.houses['Batik Miyayi'],
    price: 130000,
    description: 'Blus kerja wanita dengan bahan katun dan motif printing yang sopan.',
    details: [{ detailItem: 'Model: Peplum' }, { detailItem: 'Ukuran: S - XL' }],
    jenisBatik: [ids.batik['Batik Printing']],
    jenisKain: [ids.kain['Katun']],
    images: getRandomItems(ids.media, 3).map((id) => ({ image: id })),
  },
]
