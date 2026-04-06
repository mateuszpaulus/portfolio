import { MetadataRoute } from 'next'
import { getAllProjects } from '@/features/projects/getProject'

const BASE_URL = 'https://mateuszpaulus.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()
  const locales = ['pl', 'en'] as const
  const now = new Date()

  const mainPages = locales.map(locale => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 1.0,
    alternates: {
      languages: {
        pl: `${BASE_URL}/pl`,
        en: `${BASE_URL}/en`,
      },
    },
  }))

  const projectPages = locales.flatMap(locale =>
    projects
      .filter(p => !p.inProgress)
      .map(p => ({
        url: `${BASE_URL}/${locale}/projects/${p.id}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
  )

  return [...mainPages, ...projectPages]
}
