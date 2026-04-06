export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  stack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  imageUrl?: string | null
  inProgress?: boolean
  featured?: boolean
}
