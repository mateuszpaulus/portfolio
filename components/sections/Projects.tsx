'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { useProjects } from '@/features/projects/useProjects'
import { cn } from '@/lib/utils'

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'brand-btn bg-[var(--brand)] text-white'
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
    <div className="mt-4 flex justify-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to project ${i + 1}`}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center"
        >
          <span
            className={cn(
              'block h-2 rounded-full transition-all duration-200',
              i === active ? 'w-6 bg-[var(--brand)]' : 'w-2 bg-border hover:bg-[var(--brand)]/50'
            )}
          />
        </button>
      ))}
    </div>
  )
}

const DRAG_THRESHOLD = 5

export default function Projects() {
  const t = useTranslations('projects')
  const { projects, filters, activeFilter, setActiveFilter } = useProjects()

  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const isDragging = useRef(false)
  const hasDragged = useRef(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })

  // Wheel → horizontal scroll (desktop only, via CSS media query the container is hidden on mobile)
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    function handleWheel(e: WheelEvent) {
      e.preventDefault()
      container!.scrollLeft += e.deltaY * 1.5
    }
    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  // Track active card + hide hint
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    function handleScroll() {
      const children = container!.children
      if (!children.length) return

      const scrollLeft = container!.scrollLeft
      const maxScroll = container!.scrollWidth - container!.clientWidth

      if (maxScroll - scrollLeft < 2) {
        setActiveCard(children.length - 1)
      } else {
        let closest = 0
        let minDist = Infinity
        for (let i = 0; i < children.length; i++) {
          const child = children[i] as HTMLElement
          const dist = Math.abs(child.offsetLeft - scrollLeft)
          if (dist < minDist) { minDist = dist; closest = i }
        }
        setActiveCard(closest)
      }

      if (scrollLeft > 50) setShowHint(false)
    }
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const child = container.children[index] as HTMLElement | undefined
    if (child) {
      container.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
    }
  }, [])

  function handlePointerDown(e: React.PointerEvent) {
    isDragging.current = true
    hasDragged.current = false
    dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 }
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging.current || !scrollRef.current) return
    const dx = e.clientX - dragStart.current.x
    if (Math.abs(dx) > DRAG_THRESHOLD) hasDragged.current = true
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx
  }

  function handlePointerUp() {
    isDragging.current = false
  }

  // Block click navigation if user just dragged
  function handleClickCapture(e: React.MouseEvent) {
    if (hasDragged.current) {
      e.stopPropagation()
      e.preventDefault()
      hasDragged.current = false
    }
  }

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

        {/* Horizontal scroll carousel — all screen sizes */}
        <div className="relative">
          {showHint && projects.length > 2 && (
            <p className="mb-4 text-center text-sm text-foreground/70">
              ← {t('scroll_hint') ?? 'Scroll to see more'} →
            </p>
          )}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClickCapture={handleClickCapture}
          >
            <AnimatePresence mode="popLayout">
              {projects.map(project => (
                <div
                  key={project.id}
                  className="w-[85vw] min-w-[280px] max-w-[400px] flex-shrink-0 snap-start sm:w-[340px] lg:w-[380px]"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </AnimatePresence>
          </div>
          {/* Fade gradient right */}
          <div className="pointer-events-none absolute bottom-4 right-0 top-0 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
          <ScrollDots count={projects.length} active={activeCard} onSelect={scrollToCard} />
        </div>
      </div>
    </section>
  )
}
