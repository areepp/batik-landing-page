'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export function ChatAIForm() {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [targetPlatform, setTargetPlatform] = useState('Instagram')
  const [customPlatform, setCustomPlatform] = useState('')
  const [targetMarketing, setTargetMarketing] = useState('')
  const [captionStyle, setCaptionStyle] = useState('Casual')
  const [customStyle, setCustomStyle] = useState('')
  const [extraNotes, setExtraNotes] = useState('')
  const [result, setResult] = useState('')
  const [loadingCaption, setLoadingCaption] = useState(false)

  async function handleGenerate() {
    setLoadingCaption(true)
    setResult('')
    try {
      const platform = targetPlatform === 'Lainnya' ? customPlatform : targetPlatform
      const style = captionStyle === 'Lainnya' ? customStyle : captionStyle

      const res = await fetch('/api/chat-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          description,
          targetPlatform: platform,
          targetMarketing,
          captionStyle: style,
          extraNotes,
        }),
      })
      const data = await res.json()
      setResult(data.caption || 'Gagal membuat caption')
    } catch {
      setResult('Error saat generate caption')
    } finally {
      setLoadingCaption(false)
    }
  }

  return (
    <div className="p-6">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>AI Caption Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Nama produk"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Textarea
            placeholder="Deskripsi produk"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select value={targetPlatform} onValueChange={setTargetPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>
          {targetPlatform === 'Lainnya' && (
            <Input
              placeholder="Tulis platform lain"
              value={customPlatform}
              onChange={(e) => setCustomPlatform(e.target.value)}
            />
          )}

          <Input
            placeholder="Target marketing (misalnya: anak muda, ibu rumah tangga)"
            value={targetMarketing}
            onChange={(e) => setTargetMarketing(e.target.value)}
          />

          <Select value={captionStyle} onValueChange={setCaptionStyle}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih gaya caption" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Casual">Casual / Santai</SelectItem>
              <SelectItem value="Formal">Formal</SelectItem>
              <SelectItem value="Lucu">Lucu / Humor</SelectItem>
              <SelectItem value="Elegan">Elegan</SelectItem>
              <SelectItem value="Hype">Hype / Enerjik</SelectItem>
              <SelectItem value="Lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>
          {captionStyle === 'Lainnya' && (
            <Input
              placeholder="Tulis gaya caption lain"
              value={customStyle}
              onChange={(e) => setCustomStyle(e.target.value)}
            />
          )}

          <Textarea
            placeholder="Catatan tambahan (opsional, contoh: ada diskon, event, promo)"
            value={extraNotes}
            onChange={(e) => setExtraNotes(e.target.value)}
          />

          <Button onClick={handleGenerate} disabled={loadingCaption}>
            {loadingCaption ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Membuat Caption...
              </>
            ) : (
              'Generate Caption'
            )}
          </Button>

          {loadingCaption && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sedang membuat caption, mohon tunggu...
            </div>
          )}

          {result && !loadingCaption && (
            <div className="p-3 border rounded-md bg-muted">
              <p className="whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
