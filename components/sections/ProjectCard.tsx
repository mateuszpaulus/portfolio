'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { ExternalLink } from 'lucide-react'
import { useRouter } from '@/lib/i18n/navigation'
import { TechTag } from '@/components/common/TechTag'
import { cn } from '@/lib/utils'
import type { Project } from '@/features/projects/types'

interface ProjectCardProps {
  project: Project
}

function InProgressBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
      {label}
    </span>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  )
}

function CardLinks({ githubUrl, liveUrl }: { githubUrl?: string | null; liveUrl?: string | null }) {
  return (
    <div className="flex gap-3">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-[var(--foreground-secondary)] transition-colors hover:text-foreground"
          onClick={e => e.stopPropagation()}
        >
          <GithubIcon />
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Live site"
          className="text-[var(--foreground-secondary)] transition-colors hover:text-foreground"
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink size={18} />
        </a>
      )}
    </div>
  )
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('projects')
  const router = useRouter()
  const locale = useLocale()

  function handleClick() {
    if (project.inProgress) return

    const target = `/projects/${project.id}`

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => router.push(target))
    } else {
      router.push(target)
    }
  }

  // Keep locale in scope (used indirectly via router)
  void locale

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: 'easeOut' as const }}
      onClick={handleClick}
      style={{ viewTransitionName: `project-card-${project.id}` } as React.CSSProperties}
      className={cn(
        'group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6',
        'transition-shadow duration-200',
        project.inProgress
          ? 'cursor-default opacity-60'
          : 'cursor-pointer hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3
            style={{ viewTransitionName: `project-title-${project.id}` } as React.CSSProperties}
            className="text-lg font-semibold leading-snug text-foreground"
          >
            {project.title}
          </h3>
          {project.featured && !project.inProgress && (
            <span className="inline-flex items-center rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-xs font-medium text-[var(--brand)]">
              {t('featured_badge')}
            </span>
          )}
        </div>
        {project.inProgress ? (
          <InProgressBadge label={t('in_progress_badge')} />
        ) : (
          <CardLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
        )}
      </div>

      <p className="flex-1 text-sm leading-relaxed text-[var(--foreground-secondary)]">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map(tech => (
          <TechTag key={tech} name={tech} />
        ))}
      </div>
    </motion.article>
  )
}
