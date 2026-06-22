/**
 * Check if a URL points to a video file or video platform
 */
export function isVideoUrl(url: string | null | undefined): boolean {
  if (!url) return false

  const videoExtensions = [".mp4", ".webm", ".mov", ".avi", ".mkv", ".ogg"]
  const videoPlatforms = ["youtube.com", "youtu.be", "vimeo.com", "dailymotion.com", "player.vimeo"]

  const lower = url.toLowerCase()

  // Check file extension
  for (const ext of videoExtensions) {
    if (lower.includes(ext)) return true
  }

  // Check video platform domains
  for (const domain of videoPlatforms) {
    if (lower.includes(domain)) return true
  }

  return false
}

/**
 * Get the MIME type for a video file based on its extension
 */
export function getVideoMimeType(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase()
  switch (ext) {
    case "mp4":
      return "video/mp4"
    case "webm":
      return "video/webm"
    case "mov":
      return "video/quicktime"
    case "avi":
      return "video/x-msvideo"
    case "mkv":
      return "video/x-matroska"
    case "ogg":
      return "video/ogg"
    default:
      return "video/mp4"
  }
}

/**
 * Get YouTube video ID from a YouTube URL
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&showinfo=0&rel=0`
    }
  }
  return null
}

/**
 * Get Vimeo video ID from a Vimeo URL
 */
export function getVimeoEmbedUrl(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=1&muted=1&loop=1&badge=0&autopause=0&player_id=0&app_id=58479`
  }
  return null
}