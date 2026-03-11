import { MetadataRoute } from 'next'
import { MATERIALS_KB } from '@/lib/materials-data'

const BASE_URL = 'https://constructai.ro'
const locales  = ['ro', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/asistent', '/materiale']

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url:             `${BASE_URL}/${locale}${page}`,
      lastModified:    new Date(),
      changeFrequency: 'weekly' as const,
      priority:        page === '' ? 1.0 : 0.8,
    }))
  )

  const materialEntries = locales.flatMap((locale) =>
    MATERIALS_KB.map((m) => ({
      url:             `${BASE_URL}/${locale}/materiale/${m.id}`,
      lastModified:    new Date(),
      changeFrequency: 'monthly' as const,
      priority:        0.6,
    }))
  )

  return [...staticEntries, ...materialEntries]
}