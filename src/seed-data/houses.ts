type CategoryIds = {
  batik: Record<string, number>
  kain: Record<string, number>
}

export const getHousesData = (ids: CategoryIds) => [
  {
    name: 'Batik Welasasih',
    description: 'Pengrajin yang berfokus pada batik tulis berkualitas tinggi.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Tulis']],
    availableFabricTypes: [ids.kain['Sutra Tulis'], ids.kain['Katun'], ids.kain['Sutra Baron']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/adhiba_batik_tulis/',
    },
  },
  {
    name: 'Batik Cahaya Sari',
    description: 'Pengrajin skala besar dengan berbagai jenis batik, dikelola oleh Mbak Zahra.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [
      ids.batik['Batik Tulis'],
      ids.batik['Batik Semi Tulis'],
      ids.batik['Batik Cap'],
      ids.batik['Batik Printing'],
    ],
    availableFabricTypes: [ids.kain['Katun']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/batikcahayasari/',
      tiktokUrl: 'https://www.tiktok.com/@batikcahayasari?lang=id-ID',
    },
  },
  {
    name: 'Batik Tresno Kuncoro',
    description: 'Pengrajin yang berfokus pada penjualan grosir batik printing dan cap.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing'], ids.batik['Batik Cap']],
    availableFabricTypes: [ids.kain['Katun']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/batik_tresnoasih_solo/',
      tiktokUrl: 'https://www.tiktok.com/@triasihsolo?lang=id-ID',
    },
  },
  {
    name: 'Batik Nurhasida',
    description: 'Pengrajin dengan 100 karyawan, aktif di media sosial terutama TikTok.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [
      ids.batik['Batik Tulis'],
      ids.batik['Batik Cap'],
      ids.batik['Batik Printing'],
    ],
    availableFabricTypes: [ids.kain['Katun']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/batiknurhasida/',
      tiktokUrl: 'https://www.tiktok.com/@batik.nurhasida?lang=id-ID',
    },
    marketplaces: {
      shopeeUrl: 'https://shopee.co.id/batiknurhasida',
    },
  },
  {
    name: 'Batik Dewi Andini',
    description:
      'Memiliki beberapa cabang penjualan, dilanjutkan oleh anaknya dengan brand Bianca Batik.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing']],
    availableFabricTypes: [ids.kain['Katun'], ids.kain['Dolby']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/melya_batiksolo/',
      tiktokUrl: 'https://www.tiktok.com/@biabusana',
    },
    marketplaces: {
      shopeeUrl: 'https://shopee.co.id/biancabatik',
    },
  },
  {
    name: 'Batik Batarakresna',
    description:
      'Fokus pada pesanan lokal karena permintaan yang tinggi, media sosial kurang aktif.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing']],
    availableFabricTypes: [ids.kain['Katun'], ids.kain['Dolby']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/batarakresnabatik/',
    },
    marketplaces: {
      tokopediaUrl: 'https://www.tokopedia.com/batikbatarakresnapusat',
    },
  },
  {
    name: 'Batik Lestari',
    description: 'Menjual batik printing dan tulis, mengandalkan jaringan bisnis dan saudara.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing'], ids.batik['Batik Tulis']],
    availableFabricTypes: [ids.kain['Katun']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/batiklestari4595/',
    },
  },
  {
    name: 'Batik Sri Mulyani',
    description:
      'Bisnis dilanjutkan oleh anaknya dengan brand Batik Bella, aktif di berbagai marketplace.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing']],
    availableFabricTypes: [ids.kain['Katun']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/bella_batikid/',
      tiktokUrl: 'https://www.tiktok.com/@bellabatik',
    },
    marketplaces: {
      shopeeUrl: 'https://shopee.co.id/bellabatikid',
    },
  },
  {
    name: 'Batik Widowati',
    description:
      'Dilanjutkan oleh anaknya dengan brand Putra Widowati, fokus pada penjualan offline dan TikTok.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing']],
    availableFabricTypes: [ids.kain['Katun'], ids.kain['Dolby']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/putrawidowati/',
      tiktokUrl: 'https://www.tiktok.com/@putrawidowati',
    },
  },
  {
    name: 'Batik Vivi',
    description: 'Memasarkan produk melalui Instagram namun posting konten belum terjadwal.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing']],
    availableFabricTypes: [ids.kain['Katun']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/batik1854/',
    },
  },
  {
    name: 'Batik Sea',
    description:
      'Memiliki jaringan marketplace dan media sosial yang besar dengan penjualan online yang sudah berjalan baik.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing']],
    availableFabricTypes: [ids.kain['Katun'], ids.kain['Dolby']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/wahsbatik/',
      tiktokUrl: 'https://www.tiktok.com/@sea_batik',
    },
    marketplaces: {
      shopeeUrl: 'https://shopee.co.id/batikwahs',
    },
  },
  {
    name: 'Batik Murni Asih',
    description:
      'Salah satu toko batik besar dan maju di Desa Pungsari, hadir di berbagai marketplace besar.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [
      ids.batik['Batik Printing'],
      ids.batik['Batik Tulis'],
      ids.batik['Batik Cap'],
    ],
    availableFabricTypes: [ids.kain['Katun'], ids.kain['Dolby']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/batikmurniasih/',
      tiktokUrl: 'https://www.tiktok.com/@batikmurniasih',
    },
    marketplaces: {
      shopeeUrl: 'https://shopee.co.id/batikmurniasih',
      tokopediaUrl: 'https://www.tokopedia.com/batikmurniasih',
    },
  },
  {
    name: 'Batik Asha',
    description:
      'Aktif di Instagram dan TikTok, namun deskripsi produk di marketplace kurang detail.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing'], ids.batik['Batik Tulis']],
    availableFabricTypes: [ids.kain['Katun'], ids.kain['Dolby']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/batik.asha.sragen/',
      tiktokUrl: 'https://www.tiktok.com/@batik.asha',
    },
    marketplaces: {
      shopeeUrl: 'https://shopee.co.id/batik_asha.sragen',
    },
  },
  {
    name: 'Batik Miyayi',
    description:
      'Sangat rajin melakukan promosi di Instagram dan TikTok, namun deskripsi produk kurang detail.',
    phoneNumber: '6281234567890',
    availableBatikTypes: [ids.batik['Batik Printing']],
    availableFabricTypes: [ids.kain['Katun'], ids.kain['Sutra']],
    socialMedia: {
      instagramUrl: 'https://www.instagram.com/miyayibatik/',
      tiktokUrl: 'https://www.tiktok.com/@miyayibatik',
    },
    marketplaces: {
      shopeeUrl: 'https://shopee.co.id/miyayibatik',
    },
  },
]
