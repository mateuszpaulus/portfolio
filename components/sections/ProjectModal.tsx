'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { X, ExternalLink } from 'lucide-react'
import { TechTag } from '@/components/common/TechTag'
import type { Project } from '@/features/projects/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [active])
}

function useEscapeKey(onClose: () => void) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])
}

function ModalContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const t = useTranslations('projects')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      transition={{ duration: 0.25, ease: 'easeOut' as const }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="relative w-full max-w-lg rounded-2xl border border-border bg-background p-8 shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        aria-label={t('close')}
        className="absolute right-4 top-4 rounded-md p-1.5 text-foreground-secondary transition-colors hover:bg-accent hover:text-foreground"
      >
        <X size={18} />
      </button>

      <h2 id="modal-title" className="mb-3 text-xl font-bold text-foreground">
        {project.title}
      </h2>

      <p className="mb-6 text-sm leading-relaxed text-foreground-secondary">
        {project.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {project.stack.map(tech => (
          <TechTag key={tech} name={tech} />
        ))}
      </div>

      <div className="flex gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
            {t('github')}
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-btn inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
          >
            <ExternalLink size={16} />
            {t('live_demo')}
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useScrollLock(!!project)
  useEscapeKey(onClose)

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <ModalContent project={project} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
