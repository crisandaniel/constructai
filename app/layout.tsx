import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import '@/styles/main.scss'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'ConstructAI',
  description: 'Intelligent Construction Materials Assistant',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-concrete text-lime font-dm antialiased">{children}</body>
    </html>
  )
}
