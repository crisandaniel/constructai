'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { CalcSidebar } from '@/components/calculator/CalcSidebar'

function AsistentContent() {
  const searchParams = useSearchParams()
  const initialQ = searchParams.get('q') || ''
  const [chatMessage, setChatMessage] = useState('')

  return (
    <>
      <Header />
      <main className="pt-16 relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-[300px_1fr] gap-5 h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <div className="overflow-y-auto">
            <CalcSidebar onSendToChat={setChatMessage} />
          </div>

          {/* Chat */}
          <ChatInterface initialMessage={chatMessage || initialQ} />
        </div>
      </main>
    </>
  )
}

export default function AsistentPage() {
  return (
    <Suspense>
      <AsistentContent />
    </Suspense>
  )
}
