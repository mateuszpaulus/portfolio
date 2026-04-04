'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { ProjectModal } from '@/components/sections/ProjectModal'
import { useProjects } from '@/features/projects/useProjects'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import type { Project } from '@/features/projects/types'

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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

function FilterBar({ filters, activeFilter, onSelect, allLabel }: {
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

function ScrollDots({ count, active, onSelect }: { count: number; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="mt-4 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to project ${i + 1}`}
          className={cn(
            'h-2 rounded-full transition-all duration-200',
            i === active ? 'w-6 bg-[var(--brand)]' : 'w-2 bg-border hover:bg-[var(--brand)]/50'
          )}
        />
      ))}
    </div>
  )
}

export default function Projects() {
  const t = useTranslations('projects')
  const { projects, filters, activeFilter, setActiveFilter } = useProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })

  // Wheel → horizontal scroll
  useEffect(() => {
    const container = scrollRef.current
    if (!container || !isDesktop) return

    function handleWheel(e: WheelEvent) {
      e.preventDefault()
      container!.scrollLeft += e.deltaY * 1.5
    }
    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [isDesktop])

  // Track active card + hide hint
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    function handleScroll() {
      const cardWidth = 400
      setActiveCard(Math.round(container!.scrollLeft / cardWidth))
      if (container!.scrollLeft > 50) setShowHint(false)
    }
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToCard(index: number) {
    scrollRef.current?.scrollTo({ left: index * 400, behavior: 'smooth' })
  }

  function handleMouseDown(e: React.MouseEvent) {
    setIsDragging(true)
    dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging || !scrollRef.current) return
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x)
  }

  function stopDrag() { setIsDragging(false) }

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading title={t('heading')} subtitle={t('subtitle')} scramble />

        <FilterBar
          filters={filters}
          activeFilter={activeFilter}
          onSelect={setActiveFilter}
          allLabel={t('filter_all')}
        />

        {/* Mobile grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
          <AnimatePresence mode="popLayout">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
            ))}
          </AnimatePresence>
        </div>

        {/* Desktop horizontal scroll */}
        <div className="relative hidden lg:block">
          {showHint && projects.length > 2 && (
            <p className="mb-4 animate-pulse text-center text-sm text-[var(--foreground-secondary)]">
              ← Drag or scroll to see more →
            </p>
          )}
          <div
            ref={scrollRef}
            className={cn(
              'scrollbar-hide flex gap-6 overflow-x-auto pb-4',
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {projects.map(project => (
              <div key={project.id} className="min-w-[380px] max-w-[420px]">
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </div>
            ))}
          </div>
          {/* Fade gradient */}
          <div className="pointer-events-none absolute bottom-4 right-0 top-0 w-24 bg-gradient-to-l from-background to-transparent" />
          <ScrollDots count={projects.length} active={activeCard} onSelect={scrollToCard} />
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
