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

export const generateUniqueSlug =
  (collectionSlug: 'products' | 'houses'): FieldHook =>
  async ({ value, data, req: { payload }, operation, originalDoc }) => {
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
          collection: collectionSlug,
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

export function getInitials(name: string): string {
  if (!name) return '?'

  const words = name.replace(/Batik/gi, '').trim().split(' ').filter(Boolean)

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  if (words.length === 1 && words[0].length > 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  if (name.length > 0) {
    return name[0].toUpperCase()
  }
  return '?'
}

export function unescapeJsonString(possiblyEscapedJsonString: string) {
  let correctedString = possiblyEscapedJsonString

  // Check and conditionally remove leading and trailing single quotes
  if (correctedString.startsWith("'") && correctedString.endsWith("'")) {
    correctedString = correctedString.slice(1, -1)
  }

  // Replace escaped double quotes with actual double quotes only if needed
  if (correctedString.includes('\\"')) {
    correctedString = correctedString.replace(/\\"/g, '"')
  }

  // Replace escaped newlines with actual newline characters only if needed
  if (correctedString.includes('\\\\n')) {
    correctedString = correctedString.replace(/\\\\n/g, '\\n')
  }

  // Attempt to parse the corrected string into a JSON object
  try {
    return JSON.parse(correctedString)
  } catch (error) {
    throw new Error(`Error un-escaping JSON string: ${error}`)
  }
}
