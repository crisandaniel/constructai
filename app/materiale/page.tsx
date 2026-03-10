import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { MATERIALS_KB } from '@/lib/materials-data'

export default function MaterialePage() {
  const categories = Array.from(new Set(MATERIALS_KB.map((m) => m.category)))

  return (
    <>
      <Header />
      <main className="pt-16 relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="font-syne font-extrabold text-4xl mb-2">Materiale de construcții</h1>
          <p className="text-dust mb-10">Fișe tehnice complete, integrate în agentul AI</p>

          {categories.map((cat) => (
            <section key={cat} className="mb-12">
              <h2 className="font-syne font-bold text-xl text-gold mb-4 border-b border-subtle pb-2">
                {cat}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MATERIALS_KB.filter((m) => m.category === cat).map((m) => (
                  <div key={m.id} className="bg-card border border-subtle rounded-xl p-5 hover:bg-surface transition-colors">
                    <h3 className="font-syne font-bold text-base mb-2">{m.name}</h3>
                    <p className="text-dust text-sm leading-relaxed mb-4">{m.description}</p>

                    <div className="space-y-1.5 mb-4">
                      {Object.entries(m.keyProperties).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-dust">{k}</span>
                          <span className="text-sand font-medium">{v}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {m.specs.map((s) => (
                        <span key={s} className="bg-surface border border-subtle text-sand text-xs px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/asistent?q=${encodeURIComponent(`Vreau informații tehnice complete despre ${m.name}, inclusiv consum, dozaj și recomandări.`)}`}
                      className="block w-full text-center text-xs bg-gold/10 border border-gold/25 text-gold py-2 rounded-lg hover:bg-gold/20 transition-colors"
                    >
                      Întreabă AI despre acest material →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  )
}
