import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Download, Star, Clock, Trash2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { BlurImage } from "@/components/ui/BlurImage"

interface GameCardProps {
  title: string
  genre: string
  rating: number
  downloads: number
  image: string
  color: string
  index: number
  gameId?: number
  onClick?: () => void
  showDelete?: boolean
  onDelete?: (id: number) => void
}

export function GameCard({ title, genre, rating, downloads, image, color, index, gameId, onClick, showDelete, onDelete }: GameCardProps) {
  const [deleting, setDeleting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [perfMode, setPerfMode] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Detect mobile and perf-mode
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const enabled = document?.documentElement?.classList?.contains('perf-mode')
    setPerfMode(Boolean(enabled))
  }, [])

  // 3D Tilt values — only on desktop and not in perf-mode
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 })

  // Shadow that follows the tilt direction
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 })
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 })

  // Shine position follows mouse
  const shineX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 })
  const shineY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || perfMode) return
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    if (isMobile || perfMode) return
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setConfirmOpen(true)
  }

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (gameId && onDelete) {
      setDeleting(true)
      onDelete(gameId)
    }
    setConfirmOpen(false)
  }

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setConfirmOpen(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={isMobile || perfMode ? {} : { scale: 1.03, transition: { duration: 0.3 } }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all cursor-pointer holo-card gradient-border"
      style={{
        perspective: isMobile || perfMode ? undefined : 1200,
        transformStyle: isMobile || perfMode ? undefined : "preserve-3d",
      }}
    >
      {/* Dynamic shadow that follows tilt */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([sx, sy]) => `${sx}px ${sy}px 30px ${color}30, 0 0 60px ${color}15`
          ),
          opacity: 0,
        }}
      />

      <motion.div
        style={{
          rotateX: isMobile || perfMode ? undefined : rotateX,
          rotateY: isMobile || perfMode ? undefined : rotateY,
          transformStyle: isMobile || perfMode ? undefined : "preserve-3d",
        }}
        className="relative"
      >
        {/* Game Image / Cover */}
        <div className="relative h-56 overflow-hidden">
          {image ? (
            <BlurImage src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" wrapperClassName="absolute inset-0" />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-black text-white/10">{title.charAt(0)}</span>
              </div>
            </>
          )}

          {/* Genre badge */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-medium text-zinc-300 border border-zinc-700/30">
            {genre}
          </div>

          {/* Rating badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-zinc-700/30">
            <Star size={10} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-medium text-yellow-400">{rating}</span>
          </div>

          {/* Delete button - shown only for admin */}
          {showDelete && gameId && (
            <div className="absolute bottom-3 right-3 z-20">
              <button
                onClick={handleDeleteClick}
                disabled={deleting}
                className="p-2 rounded-lg bg-red-600/80 hover:bg-red-500 text-white transition-all flex items-center gap-1 text-xs"
              >
                {deleting ? (
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <Trash2 size={14} />
                )}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}

          {/* Hover overlay — semi-transparent, doesn't hide image */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: color }}>
              <Download size={14} />
              View
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate relative">
            <span className="shimmer-text">{title}</span>
          </h3>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-zinc-500">
              <Download size={12} />
              <span className="text-xs">{downloads}</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-500">
              <Clock size={12} />
              <span className="text-xs">Free</span>
            </div>
          </div>
        </div>

        {/* Color pulse background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at center, ${color}08, transparent 50%)`,
          }}
        />

        {/* Tilt shine overlay — follows mouse (disabled on mobile/perf-mode) */}
        {!(isMobile || perfMode) && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: useTransform(
                [shineX, shineY],
                ([sx, sy]) => `radial-gradient(600px circle at ${sx}% ${sy}%, rgba(255,255,255,0.15), transparent 40%)`
              ),
              opacity: 0,
            }}
          />
        )}
      </motion.div>

      {/* Delete Confirmation Popup */}
      {confirmOpen && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-zinc-900 border border-zinc-700/50 rounded-xl p-4 mx-4 max-w-[260px]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-white font-medium mb-3">Delete "{title}"?</p>
            <p className="text-xs text-zinc-400 mb-4">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button
                onClick={handleCancelDelete}
                className="flex-1 py-2 rounded-lg border border-zinc-700/50 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}