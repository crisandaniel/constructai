'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { CalcSidebar } from '@/components/calculator/CalcSidebar'

function AsistentContent() {
  const searchParams = useSearchParams()
  const params = useParams()
  const initialQ = searchParams.get('q') || ''
  const locale = (params?.locale as string) || 'ro'
  const [showCalc, setShowCalc] = useState(false)

  return (
    <div className="max-w-app mx-auto px-3 py-3 md:px-6 md:py-6 flex flex-col md:grid md:grid-cols-[300px_1fr] gap-3 md:gap-5 h-[calc(100dvh-56px)] md:h-[calc(100vh-4rem)]">

      {/* Mobile toggle button */}
      <div className="flex md:hidden gap-2">
        <button
          onClick={() => setShowCalc(false)}
          className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${!showCalc ? 'border-gold bg-gold/10 text-gold' : 'border-subtle text-dust'}`}
        >
          💬 Asistent
        </button>
        <button
          onClick={() => setShowCalc(true)}
          className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${showCalc ? 'border-gold bg-gold/10 text-gold' : 'border-subtle text-dust'}`}
        >
          ⚡ Calculator
        </button>
      </div>

      {/* Sidebar — always visible on desktop, toggle on mobile */}
      <div className={`overflow-y-auto md:block ${showCalc ? 'block' : 'hidden'}`}>
        <CalcSidebar />
      </div>

      {/* Chat — always visible on desktop, toggle on mobile */}
      <div className={`min-h-0 md:block ${!showCalc ? 'block flex-1' : 'hidden'}`}>
        <ChatInterface initialMessage={initialQ} locale={locale} />
      </div>

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