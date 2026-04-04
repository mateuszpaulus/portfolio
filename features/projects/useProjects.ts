'use client'

import { useState, useMemo } from 'react'
import type { Project } from './types'
import projectsData from '@/content/projects/projects.json'

const ALL_FILTER = 'All'

function getUniqueStacks(projects: Project[]): string[] {
  const stacks = projects.flatMap(p => p.stack)
  return [ALL_FILTER, ...Array.from(new Set(stacks))]
}

function filterProjects({ projects, activeFilter }: { projects: Project[]; activeFilter: string }): Project[] {
  if (activeFilter === ALL_FILTER) return projects
  return projects.filter(p => p.stack.includes(activeFilter))
}

export function useProjects() {
  const projects = projectsData as unknown as Project[]
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER)

  const filters = useMemo(() => getUniqueStacks(projects), [projects])
  const filtered = useMemo(
    () => filterProjects({ projects, activeFilter }),
    [projects, activeFilter]
  )

  return { projects: filtered, filters, activeFilter, setActiveFilter }
}
