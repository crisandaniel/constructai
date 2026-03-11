'use client'

import { useState, useEffect, useCallback } from 'react'

const ADMIN_PASSWORD_KEY = 'admin_password'

interface Stats {
  dailyConvs: { started_at: string; message_count: number }[]
  topMessages: { content: string }[]
  errors: { error_type: string; message: string; created_at: string; context: any }[]
  summary: { totalConvs: number; totalMessages: number }
}

interface Conversation {
  id: string
  session_id: string
  locale: string
  started_at: string
  message_count: number
}

interface Deviz {
  id:             string
  client_name:    string | null
  project_name:   string | null
  locale:         string
  items:          any[]
  total_mat:      number
  total_manopera: number
  total:          number
  created_at:     string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
  latency_ms?: number
  tokens_used?: number
}

export default function AdminPage() {
  const [password, setPassword]         = useState('')
  const [authed, setAuthed]             = useState(false)
  const [tab, setTab]                   = useState<'stats' | 'conversations' | 'devize' | 'errors'>('stats')
  const [stats, setStats]               = useState<Stats | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConv, setSelectedConv] = useState<string | null>(null)
  const [messages, setMessages]         = useState<Message[]>([])
  const [totalConvs, setTotalConvs]     = useState(0)
  const [page, setPage]                 = useState(1)
  const [loading, setLoading]           = useState(false)
  const [devize, setDevize]             = useState<Deviz[]>([])
  const [totalDevize, setTotalDevize]   = useState(0)
  const [devizePage, setDevizePage]     = useState(1)
  const [selectedDeviz, setSelectedDeviz] = useState<Deviz | null>(null)
  const [error, setError]               = useState('')

  const headers = { Authorization: `Bearer ${password}` }

  async function login() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/stats', { headers })
      if (!res.ok) { setError('Parolă incorectă'); return }
      const data = await res.json()
      setStats(data)
      setAuthed(true)
    } catch {
      setError('Eroare de conexiune')
    } finally {
      setLoading(false)
    }
  }

  const loadConversations = useCallback(async (p = 1) => {
    setLoading(true)
    try {
      const res  = await fetch(`/api/admin/conversations?page=${p}`, { headers })
      const data = await res.json()
      setConversations(data.conversations || [])
      setTotalConvs(data.total || 0)
      setPage(p)
    } finally {
      setLoading(false)
    }
  }, [password])

  const loadDevize = useCallback(async (p = 1) => {
    setLoading(true)
    try {
      const res  = await fetch(`/api/admin/devize?page=${p}`, { headers })
      const data = await res.json()
      setDevize(data.devize || [])
      setTotalDevize(data.total || 0)
      setDevizePage(p)
    } finally {
      setLoading(false)
    }
  }, [password])

  async function loadMessages(convId: string) {
    setSelectedConv(convId)
    const res  = await fetch(`/api/admin/conversations/${convId}`, { headers })
    const data = await res.json()
    setMessages(data.messages || [])
  }

  useEffect(() => {
    if (authed && tab === 'conversations') loadConversations(1)
    if (authed && tab === 'devize')        loadDevize(1)
  }, [authed, tab, loadConversations, loadDevize])

  // Daily stats grouped by day
  const dailyMap: Record<string, number> = {}
  stats?.dailyConvs.forEach(c => {
    const day = c.started_at.slice(0, 10)
    dailyMap[day] = (dailyMap[day] || 0) + 1
  })
  const dailyEntries = Object.entries(dailyMap).sort().slice(-14)
  const maxDaily = Math.max(...dailyEntries.map(([, v]) => v), 1)

  // Top questions
  const msgFreq: Record<string, number> = {}
  stats?.topMessages.forEach(m => {
    const key = m.content.slice(0, 80).trim()
    msgFreq[key] = (msgFreq[key] || 0) + 1
  })
  const topQuestions = Object.entries(msgFreq).sort((a, b) => b[1] - a[1]).slice(0, 10)

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center bg-concrete px-4">
      <div className="w-full max-w-sm rounded-2xl border border-subtle bg-card p-8">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🔐</div>
          <h1 className="font-syne font-bold text-xl">Admin ConstructAI</h1>
          <p className="text-dust text-sm mt-1">Introdu parola de admin</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          placeholder="Parolă"
          className="w-full bg-surface border border-subtle rounded-xl px-4 py-3 text-lime outline-none focus:border-gold mb-3"
        />
        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
        <button
          onClick={login}
          disabled={loading || !password}
          className="w-full bg-gold text-concrete font-bold py-3 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {loading ? 'Se verifică...' : 'Intră'}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-concrete text-lime">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-syne font-bold text-2xl">Admin Dashboard</h1>
          <button onClick={() => setAuthed(false)} className="text-dust text-sm hover:text-sand">Ieși</button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total conversații', value: stats?.summary.totalConvs ?? '–' },
            { label: 'Total mesaje', value: stats?.summary.totalMessages ?? '–' },
            { label: 'Erori 7 zile', value: stats?.errors.length ?? '–' },
            { label: 'Conv. 30 zile', value: dailyEntries.reduce((s, [, v]) => s + v, 0) },
          ].map(card => (
            <div key={card.label} className="rounded-xl border border-subtle bg-card p-4">
              <div className="text-2xl font-bold text-gold">{card.value}</div>
              <div className="text-xs text-dust mt-1">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-subtle pb-3">
          {(['stats', 'conversations', 'devize', 'errors'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === t ? 'bg-gold text-concrete' : 'text-dust hover:text-sand'}`}
            >
              {t === 'stats' ? 'Statistici' : t === 'conversations' ? 'Conversații' : t === 'devize' ? 'Devize' : 'Erori'}
            </button>
          ))}
        </div>

        {/* Stats tab */}
        {tab === 'stats' && (
          <div className="space-y-8">
            {/* Daily chart */}
            <div className="rounded-xl border border-subtle bg-card p-6">
              <h2 className="text-sm font-bold text-dust uppercase tracking-widest mb-4">Conversații pe zi (14 zile)</h2>
              <div className="flex items-end gap-2 h-32">
                {dailyEntries.map(([day, count]) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gold">{count}</span>
                    <div
                      className="w-full bg-gold rounded-t-sm"
                      style={{ height: `${(count / maxDaily) * 96}px`, minHeight: '4px' }}
                    />
                    <span className="text-xs text-dust" style={{ fontSize: '0.6rem' }}>
                      {day.slice(5)}
                    </span>
                  </div>
                ))}
                {dailyEntries.length === 0 && (
                  <p className="text-dust text-sm">Nu există date încă.</p>
                )}
              </div>
            </div>

            {/* Top questions */}
            <div className="rounded-xl border border-subtle bg-card p-6">
              <h2 className="text-sm font-bold text-dust uppercase tracking-widest mb-4">Top întrebări</h2>
              <div className="space-y-2">
                {topQuestions.map(([q, count]) => (
                  <div key={q} className="flex items-center gap-3">
                    <span className="text-gold font-bold text-sm w-6 text-right">{count}×</span>
                    <span className="text-sand text-sm truncate">{q}</span>
                  </div>
                ))}
                {topQuestions.length === 0 && <p className="text-dust text-sm">Nu există date încă.</p>}
              </div>
            </div>
          </div>
        )}

        {/* Conversations tab */}
        {tab === 'conversations' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* List */}
            <div className="rounded-xl border border-subtle bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-subtle flex justify-between items-center">
                <h2 className="text-xs font-bold text-dust uppercase tracking-widest">
                  Conversații ({totalConvs})
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => loadConversations(page - 1)} disabled={page <= 1} className="text-xs text-dust hover:text-sand disabled:opacity-30">←</button>
                  <span className="text-xs text-dust">{page}</span>
                  <button onClick={() => loadConversations(page + 1)} disabled={page * 20 >= totalConvs} className="text-xs text-dust hover:text-sand disabled:opacity-30">→</button>
                </div>
              </div>
              <div className="divide-y divide-subtle">
                {conversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => loadMessages(conv.id)}
                    className={`w-full text-left px-4 py-3 hover:bg-surface transition ${selectedConv === conv.id ? 'bg-surface border-l-2 border-gold' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-dust font-mono">{conv.session_id.slice(0, 16)}…</span>
                      <span className="text-xs text-dust">{conv.locale.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-sand">{conv.message_count} mesaje</span>
                      <span className="text-xs text-dust">{new Date(conv.started_at).toLocaleDateString('ro')}</span>
                    </div>
                  </button>
                ))}
                {loading && <p className="text-dust text-sm p-4">Se încarcă...</p>}
                {!loading && conversations.length === 0 && <p className="text-dust text-sm p-4">Nu există conversații.</p>}
              </div>
            </div>

            {/* Messages */}
            <div className="rounded-xl border border-subtle bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-subtle">
                <h2 className="text-xs font-bold text-dust uppercase tracking-widest">
                  {selectedConv ? 'Mesaje conversație' : 'Selectează o conversație'}
                </h2>
              </div>
              <div className="divide-y divide-subtle max-h-[600px] overflow-y-auto">
                {messages.map(msg => (
                  <div key={msg.id} className={`px-4 py-3 ${msg.role === 'user' ? 'bg-gold/5' : ''}`}>
                    <div className="flex justify-between mb-1">
                      <span className={`text-xs font-bold ${msg.role === 'user' ? 'text-gold' : 'text-moss'}`}>
                        {msg.role === 'user' ? '👤 User' : '🤖 AI'}
                      </span>
                      <div className="flex gap-3">
                        {msg.latency_ms && <span className="text-xs text-dust">{msg.latency_ms}ms</span>}
                        {msg.tokens_used && <span className="text-xs text-dust">{msg.tokens_used}t</span>}
                        <span className="text-xs text-dust">{new Date(msg.created_at).toLocaleTimeString('ro')}</span>
                      </div>
                    </div>
                    <p className="text-sm text-sand leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                ))}
                {!selectedConv && <p className="text-dust text-sm p-4">Selectează o conversație din stânga.</p>}
              </div>
            </div>
          </div>
        )}

        {/* Devize tab */}
        {tab === 'devize' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-subtle bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-subtle flex justify-between items-center">
                <h2 className="text-xs font-bold text-dust uppercase tracking-widest">Devize ({totalDevize})</h2>
                <div className="flex gap-2">
                  <button onClick={() => loadDevize(devizePage - 1)} disabled={devizePage <= 1} className="text-xs text-dust hover:text-sand disabled:opacity-30">←</button>
                  <span className="text-xs text-dust">{devizePage}</span>
                  <button onClick={() => loadDevize(devizePage + 1)} disabled={devizePage * 20 >= totalDevize} className="text-xs text-dust hover:text-sand disabled:opacity-30">→</button>
                </div>
              </div>
              <div className="divide-y divide-subtle max-h-[600px] overflow-y-auto">
                {devize.map(d => (
                  <button key={d.id} onClick={() => setSelectedDeviz(d)}
                    className={`w-full text-left px-4 py-3 hover:bg-surface transition ${selectedDeviz?.id === d.id ? 'bg-surface border-l-2 border-gold' : ''}`}>
                    <div className="flex justify-between">
                      <span className="text-sm text-sand font-medium">{d.client_name || 'Anonim'}</span>
                      <span className="text-xs text-gold font-bold">{Number(d.total).toFixed(0)} RON</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-dust truncate">{d.project_name || '—'}</span>
                      <span className="text-xs text-dust">{new Date(d.created_at).toLocaleDateString('ro')}</span>
                    </div>
                  </button>
                ))}
                {!loading && devize.length === 0 && <p className="text-dust text-sm p-4">Nu există devize.</p>}
              </div>
            </div>

            <div className="rounded-xl border border-subtle bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-subtle">
                <h2 className="text-xs font-bold text-dust uppercase tracking-widest">
                  {selectedDeviz ? `${selectedDeviz.client_name || 'Anonim'} — ${Number(selectedDeviz.total).toFixed(0)} RON` : 'Selectează un deviz'}
                </h2>
              </div>
              <div className="p-4 max-h-[600px] overflow-y-auto">
                {selectedDeviz ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-dust">Materiale:</span> <span className="text-sand">{Number(selectedDeviz.total_mat).toFixed(0)} RON</span></div>
                      <div><span className="text-dust">Manoperă:</span> <span className="text-sand">{Number(selectedDeviz.total_manopera).toFixed(0)} RON</span></div>
                      <div><span className="text-dust">Lucrări:</span> <span className="text-sand">{selectedDeviz.items.length}</span></div>
                      <div><span className="text-dust">Locale:</span> <span className="text-sand">{selectedDeviz.locale.toUpperCase()}</span></div>
                    </div>
                    <div className="divide-y divide-subtle border border-subtle rounded-lg overflow-hidden">
                      {selectedDeviz.items.map((item: any, i: number) => (
                        <div key={i} className="px-3 py-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-sand">{item.label}</span>
                            <span className="text-xs text-gold">{(item.saci * item.pretSac + item.suprafata * item.pretManopera).toFixed(0)} RON</span>
                          </div>
                          <div className="text-xs text-dust mt-0.5">{item.suprafata} m² · {item.saci} saci · {item.pretSac > 0 ? item.pretSac + ' RON/sac' : ''} {item.pretManopera > 0 ? '· ' + item.pretManopera + ' RON/m² manoperă' : ''}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <p className="text-dust text-sm">Selectează un deviz din stânga.</p>}
              </div>
            </div>
          </div>
        )}

        {/* Errors tab */}
        {tab === 'errors' && (
          <div className="rounded-xl border border-subtle bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-subtle">
              <h2 className="text-xs font-bold text-dust uppercase tracking-widest">Erori ultimele 7 zile</h2>
            </div>
            <div className="divide-y divide-subtle">
              {stats?.errors.map(err => (
                <div key={err.created_at + err.message} className="px-4 py-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-red-400">{err.error_type}</span>
                    <span className="text-xs text-dust">{new Date(err.created_at).toLocaleString('ro')}</span>
                  </div>
                  <p className="text-sm text-sand">{err.message}</p>
                  {err.context && Object.keys(err.context).length > 0 && (
                    <p className="text-xs text-dust mt-1 font-mono">{JSON.stringify(err.context)}</p>
                  )}
                </div>
              ))}
              {stats?.errors.length === 0 && <p className="text-dust text-sm p-4">Nu există erori recente. 🎉</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}