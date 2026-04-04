export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  imageUrl?: string | null
  inProgress?: boolean
}
