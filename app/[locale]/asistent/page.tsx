'use client'

import { Suspense } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { CalcSidebar } from '@/components/calculator/CalcSidebar'

function AsistentContent() {
  const searchParams = useSearchParams()
  const params = useParams()
  const initialQ = searchParams.get('q') || ''
  const locale = (params?.locale as string) || 'ro'

  return (
    <div className="max-w-app mx-auto px-6 py-6 grid md:grid-cols-[300px_1fr] gap-5 h-[calc(100vh-4rem)]">
      <div className="overflow-y-auto">
        <CalcSidebar />
      </div>
      <ChatInterface initialMessage={initialQ} locale={locale} />
    </div>
  )
}

export default function AsistentPage() {
  return (
    <Suspense>
      <AsistentContent />
    </Suspense>
  )
}