'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()
  const isEN     = pathname.startsWith('/en')
  const homeHref = isEN ? '/en' : '/'

  return (
    <div className="max-w-app mx-auto px-6 py-24 text-center">
      <h2 className="font-syne font-bold text-4xl mb-4">404</h2>
      <p className="text-dust mb-8">
        {isEN ? 'Page not found.' : 'Pagina nu a fost găsită.'}
      </p>
      <Link href={homeHref} className="btn btn--primary">
        {isEN ? 'Home' : 'Acasă'}
      </Link>
    </div>
  )
}