'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { ProjectModal } from '@/components/sections/ProjectModal'
import { useProjects } from '@/features/projects/useProjects'
import { cn } from '@/lib/utils'
import type { Project } from '@/features/projects/types'

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'bg-[var(--brand)] text-white'
          : 'border border-border text-[var(--foreground-secondary)] hover:border-[var(--brand)] hover:text-foreground'
      )}
    >
      {label}
    </button>
  )
}

function FilterBar({
  filters,
  activeFilter,
  onSelect,
  allLabel,
}: {
  filters: string[]
  activeFilter: string
  onSelect: (f: string) => void
  allLabel: string
}) {
  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {filters.map(f => (
        <FilterButton
          key={f}
          label={f === 'All' ? allLabel : f}
          active={f === activeFilter}
          onClick={() => onSelect(f)}
        />
      ))}
    </div>
  )
}

export default function Projects() {
  const t = useTranslations('projects')
  const { projects, filters, activeFilter, setActiveFilter } = useProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading title={t('heading')} subtitle={t('subtitle')} />

        <FilterBar
          filters={filters}
          activeFilter={activeFilter}
          onSelect={setActiveFilter}
          allLabel={t('filter_all')}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
