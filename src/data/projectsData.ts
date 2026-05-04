import raw from '../../projects-data.json'

export type Project = {
  slug: string
  name: string
  year: number | string
  summary: string
  description: string
  url: string
  mainImage: string
  gallery: string[]
  stack: string[]
  tags: string[]
}

type ProjectsFile = {
  projects: Project[]
}

const data = raw as ProjectsFile

export const PROJECTS: readonly Project[] = data.projects

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined
  return PROJECTS.find((p) => p.slug === slug)
}
