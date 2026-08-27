type WorkAttributes = {
  title: string
  description?: string
  tagline: string
  thumbnail?: string
  images?: string[]
  image_captions?: string[]
  tags?: string[]
}

export type WorkItem = WorkAttributes & {
  slug: string
  sourceFile: string
}

const workModules = import.meta.glob('./works/*/*.json', {
  eager: true,
}) as Record<string, { default: WorkAttributes }>

const imageModules = import.meta.glob('./works/images/*', {
  eager: true,
}) as Record<string, { default: string }>

// Create a mapping of image filenames to their hashed URLs
const imageMap: Record<string, string> = {}
Object.entries(imageModules).forEach(([path, module]) => {
  const filename = path.split('/').pop()
  if (filename) {
    imageMap[filename] = module.default
  }
})

export const works: WorkItem[] = Object.entries(workModules)
  .map(([sourceFile, module]) => {
    const slugMatch = sourceFile.match(/works\/([^/]+)\//)
    const slug = slugMatch?.[1]
    if (!slug) return null

    const attributes = module.default
    const parsed: WorkItem = {
      ...attributes,
      slug,
      sourceFile,
      thumbnail: attributes.thumbnail ? imageMap[attributes.thumbnail] : undefined,
      images: attributes.images?.map((imagePath) => imageMap[imagePath]).filter((p): p is string => p !== undefined),
      image_captions: attributes.image_captions?.slice(0, attributes.images?.length || 0),
    }

    return parsed
  })
  .filter((w): w is WorkItem => w !== null)
  .sort((a, b) => a.title.localeCompare(b.title))

// Simple in-memory API for CRUD operations. Replace with real API later.
export function getWorks(): WorkItem[] {
  return works
}

export function getWork(slug: string): WorkItem | undefined {
  return works.find((w) => w.slug === slug)
}

export function createWork(item: Omit<WorkItem, 'slug' | 'sourceFile'> & { slug: string }) {
  const newItem: WorkItem = { ...item, sourceFile: `./works/${item.slug}/attributes.json` }
  works.push(newItem)
  return newItem
}

export function updateWork(slug: string, updates: Partial<WorkItem>) {
  const idx = works.findIndex((w) => w.slug === slug)
  if (idx === -1) return undefined
  works[idx] = { ...works[idx], ...updates }
  return works[idx]
}

export function deleteWork(slug: string) {
  const idx = works.findIndex((w) => w.slug === slug)
  if (idx === -1) return false
  works.splice(idx, 1)
  return true
}

export default {
  getWorks,
  getWork,
  createWork,
  updateWork,
  deleteWork,
}
