interface GameInfo {
  id?: number
  title: string
  genre: string
  rating: number
  downloads: number
  color: string
  wallpaper_url?: string | null
  _type?: "game" | "software"
}

const STORAGE_KEY = "xzy-recent"

export function getRecentItems(): GameInfo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addRecentItem(item: GameInfo) {
  const items = getRecentItems()
  // Remove duplicate by id or title
  const filtered = items.filter((existing) => {
    if (item.id && existing.id) return existing.id !== item.id
    return existing.title !== item.title
  })
  // Add to front
  filtered.unshift({ ...item, _type: item._type || "game" })
  // Keep max 8
  const trimmed = filtered.slice(0, 8)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
}