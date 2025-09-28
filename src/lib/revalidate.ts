export const revalidate = async (args: {
  collection?: string
  slug?: string
  global?: string
  path?: string
}) => {
  const { path: revalidatePath } = args
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?secret=${
        process.env.REVALIDATION_SECRET
      }&path=${revalidatePath || '/'}`,
    )
    if (!res.ok) {
      console.error('Error revalidating:', await res.text())
    } else {
      console.log(`Revalidated path: ${revalidatePath}`)
    }
  } catch (err) {
    console.error('Error hitting revalidate route:', err)
  }
}
