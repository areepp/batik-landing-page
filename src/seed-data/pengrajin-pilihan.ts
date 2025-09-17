type MediaIds = number[]

const getRandomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const getArtisansData = (mediaIds: MediaIds) => [
  {
    name: 'Ibu Sari Wulandari',
    specialty: 'Motif Parang & Kawung',
    image: getRandomItem(mediaIds), // Mengambil ID gambar acak
    description: 'Ahli dalam motif klasik dengan teknik tulis tradisional.',
  },
  {
    name: 'Pak Bambang Sutrisno',
    specialty: 'Motif Mega Mendung',
    image: getRandomItem(mediaIds), // Mengambil ID gambar acak
    description: 'Spesialis motif awan dengan gradasi warna yang memukau.',
  },
  {
    name: 'Ibu Dewi Kartika',
    specialty: 'Motif Truntum & Sido Mukti',
    image: getRandomItem(mediaIds), // Mengambil ID gambar acak
    description: 'Kreator motif pernikahan dan upacara adat yang legendaris.',
  },
  {
    name: 'Sanggar Batik Cipto',
    specialty: 'Pewarnaan Alam',
    image: getRandomItem(mediaIds), // Mengambil ID gambar acak
    description: 'Fokus pada penggunaan pewarna alami dari tumbuhan lokal.',
  },
  {
    name: 'Galeri Batik Wiradesa',
    specialty: 'Koleksi Modern',
    image: getRandomItem(mediaIds), // Mengambil ID gambar acak
    description: 'Menggabungkan desain kontemporer dengan teknik batik tradisional.',
  },
]
