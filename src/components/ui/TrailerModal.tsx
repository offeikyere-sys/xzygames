import { motion, AnimatePresence } from "framer-motion"
import { X, Play } from "lucide-react"

interface TrailerModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  videoUrl?: string
}

function getYoutubeEmbedUrl(url: string): string {
  if (!url) return ""
  // Already an embed URL
  if (url.includes("/embed/")) return url
  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  // youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  // youtube.com/v/ID
  const vMatch = url.match(/\/v\/([a-zA-Z0-9_-]+)/)
  if (vMatch) return `https://www.youtube.com/embed/${vMatch[1]}`
  // Return as-is if nothing matched (could already be an embed)
  return url
}

export function TrailerModal({ isOpen, onClose, title, videoUrl }: TrailerModalProps) {
  const embedUrl = getYoutubeEmbedUrl(videoUrl || "")

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/50">
              {embedUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={title}
                  />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                      <Play size={32} className="text-blue-400 ml-1" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                    <p className="text-sm text-zinc-500">Trailer coming soon</p>
                    <p className="text-xs text-zinc-600 mt-2">Add a YouTube URL when adding the game</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}