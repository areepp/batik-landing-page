import { getUserOnServer } from '@/features/auth/user/api/user-actions'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function POST(req: NextRequest) {
  const user = await getUserOnServer()

  try {
    const body = await req.json()

    if (!user || !user.roles?.includes('store-admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const messages = [
      {
        role: 'system',
        content: `
Kamu adalah AI copywriter profesional yang ahli membuat caption promosi produk untuk media sosial.
Website ini adalah marketplace Batik Pungsari Sragen, yang menampung seluruh pengusaha batik di Pungsari, Sragen.
Tujuan caption adalah menarik perhatian calon pembeli dan mempromosikan produk batik secara menarik, sesuai platform sosial media yang dipilih.
Pastikan caption mudah dimengerti, menggunakan bahasa indonesia dan sesuai gaya yang diminta.
Tambahkan beberapa hashtag relevan yang bisa meningkatkan jangkauan di platform tersebut.
        `,
      },
      {
        role: 'user',
        content: `
Produk: ${body.productName}
Deskripsi: ${body.description}
Target marketing: ${body.targetMarketing}
Platform: ${body.targetPlatform}
Gaya caption: ${body.captionStyle}
Catatan tambahan: ${body.extraNotes}
        `,
      },
    ] as const

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: messages as unknown as OpenAI.ChatCompletionMessageParam[],
      max_completion_tokens: 200,
    })

    return NextResponse.json({
      caption: completion.choices[0].message?.content ?? '',
    })
  } catch (error) {
    console.error('Chat AI error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
