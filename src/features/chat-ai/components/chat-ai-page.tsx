import { getUserOnServer } from '@/features/auth/user/api/user-actions'
import { ChatAIForm } from './chat-ai-form'

export default async function ChatAIPage() {
  const user = await getUserOnServer()

  if (!user || !user.roles?.includes('store-admin')) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">
          Akses ditolak. Hanya pemilik toko yang bisa menggunakan Chat AI.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <ChatAIForm />
    </div>
  )
}
