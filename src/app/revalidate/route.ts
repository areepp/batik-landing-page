import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// This endpoint receives revalidation requests from the Payload webhook
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')

  // 1. Verify the secret key for security
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 })
  }

  // 2. Check if a path to revalidate is provided
  if (!path) {
    return NextResponse.json({ message: 'Path to revalidate is required' }, { status: 400 })
  }

  try {
    // 3. Perform the revalidation
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ revalidated: false, message: 'Error revalidating' }, { status: 500 })
  }
}
