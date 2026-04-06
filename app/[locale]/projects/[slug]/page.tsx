import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { getProjectBySlug, getAllProjects } from '@/features/projects/getProject'
import { Link } from '@/lib/i18n/navigation'

const BASE_URL = 'https://mateuszpaulus.dev'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const title = `${project.title} | Mateusz Paulus`
  const ogImage = `/api/og?locale=${locale}&title=${encodeURIComponent(project.title)}`

  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      url: `${BASE_URL}/${locale}/projects/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.description,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  const locales = ['pl', 'en']
  return locales.flatMap(locale =>
    projects.map(p => ({ locale, slug: p.id }))
  )
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const t = await getTranslations('projects')

  return (
    <div className="relative z-10 min-h-[80vh] pb-16 pt-24">
      <div className="mx-auto max-w-4xl px-6">

        {/* Card — viewTransitionName matches ProjectCard */}
        <div
          style={{ viewTransitionName: `project-card-${project.id}` } as React.CSSProperties}
          className="mb-8 rounded-2xl border border-border bg-card p-8"
        >
          {project.inProgress && (
            <span className="mb-4 inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              {t('in_progress_badge')}
            </span>
          )}

          <h1
            style={{ viewTransitionName: `project-title-${project.id}` } as React.CSSProperties}
            className="mb-4 text-4xl font-bold text-foreground"
          >
            {project.title}
          </h1>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-sm text-[var(--foreground-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="mb-8 text-lg leading-relaxed text-[var(--foreground-secondary)]">
            {project.longDescription ?? project.description}
          </p>

          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-btn rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-hover)]"
              >
                {t('github')}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                {t('live_demo')}
              </a>
            )}
          </div>
        </div>

        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-[var(--foreground-secondary)] transition-colors hover:text-[var(--brand)]"
        >
          {t('back')}
        </Link>

      </div>
    </div>
  )
}
