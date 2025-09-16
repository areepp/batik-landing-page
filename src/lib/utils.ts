import { clsx, type ClassValue } from 'clsx'
import { FieldHook } from 'payload'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const generateUniqueSlug: FieldHook = async ({
  value,
  data,
  req: { payload },
  operation,
  originalDoc,
}) => {
  if (operation === 'update' && originalDoc) {
    // Jika judul tidak berubah DAN slug sudah ada,
    // langsung kembalikan slug yang ada tanpa perlu menjalankan sisa hook.
    if (data?.name === originalDoc.name && data?.slug) {
      return data.slug
    }
  }

  const baseSlug = formatSlug(data?.name || value || '')

  if (baseSlug) {
    let slug = baseSlug
    let suffix = 2
    let exists = true

    while (exists) {
      const { docs } = await payload.find({
        collection: 'products',
        where: {
          slug: {
            equals: slug,
          },
          // If we are updating a document, exclude it from the search
          ...(data?.id && { id: { not_equals: data.id } }),
        },
        limit: 1,
      })

      if (docs.length > 0) {
        // If a document was found, append the suffix and try again in the next loop
        slug = `${baseSlug}-${suffix}`
        suffix++
      } else {
        // If no document was found, the slug is unique
        exists = false
      }
    }
    return slug
  }

  return ''
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}
