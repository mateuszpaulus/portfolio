import projects from '@/content/projects/projects.json'
import type { Project } from './types'

export function getProjectBySlug(slug: string): Project | null {
  return (projects as unknown as Project[]).find(p => p.id === slug) ?? null
}

export function getAllProjects(): Project[] {
  return projects as unknown as Project[]
}
