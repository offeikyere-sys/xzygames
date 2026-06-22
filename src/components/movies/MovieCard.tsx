import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Play, Star, Clock, Trash2, Edit3 } from "lucide-react"
import { useState, useRef } from "react"
import { BlurImage } from "@/components/ui/BlurImage"
import { apiUrl } from "@/lib/api"

interface MovieCardProps {
  title: string
  genre: string
  year: number
  duration: string
  rating: number
  image: string
  color: string
  index: number
  movieId?: number
  onClick?: () => void
  showDelete?: boolean
  onDelete?: (id: number) => void
  onEdit?: (movie: any) => void
}

export function MovieCard({ title, genre, year, duration, rating, image, color, index, movieId, onClick, showDelete, onDelete, onEdit }: MovieCardProps) {
  const [deleting, setDeleting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Tilt values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setConfirmOpen(true)
  }

  const handleEditClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (movieId && onEdit) {
      // Fetch full movie data from API to get all fields
      try {
        const res = await fetch(apiUrl(`/api/movies/${movieId}`))
        if (res.ok) {
          const data = await res.json()
          onEdit({
            id: data.id,
            title: data.title,
            genre: data.genre,
            year: data.year,
            duration: data.duration,
            rating: data.rating,
            color: data.color,
            director: data.director || "",
            cast: data.cast || "",
            description: data.description || "",
            download_links: data.download_links || "",
            poster_url: data.poster_url || image,
            trailer_url: data.trailer_url || "",
            screenshots: data.screenshots || "",
            type: "movie",
          })
          return
        }
      } catch {}
      // Fallback: use what we have
      onEdit({ id: movieId, title, genre, year, duration, rating, color, director: "", cast: "", description: "", download_links: "", poster_url: image, trailer_url: "", screenshots: "", type: "movie" })
    }
  }

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (movieId && onDelete) {
      setDeleting(true)
      onDelete(movieId)
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
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative group cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* Poster Image - Portrait aspect ratio */}
        <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
          {image ? (
            <BlurImage
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              wrapperClassName="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}33, ${color}11)` }}>
              <Play size={48} className="text-white/50" />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

          {/* Year badge */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-zinc-700/50">
            <span className="text-xs font-bold text-white">{year}</span>
          </div>

          {/* Duration badge */}
          {duration && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-zinc-700/50 flex items-center gap-1">
              <Clock size={10} className="text-zinc-400" />
              <span className="text-xs font-medium text-zinc-300">{duration}</span>
            </div>
          )}

          {/* Admin buttons */}
          {showDelete && (
            <>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleEditClick}
                className="absolute bottom-3 right-14 p-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all"
                title="Edit movie"
              >
                <Edit3 size={14} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleDeleteClick}
                className="absolute bottom-3 right-3 p-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
                title="Delete movie"
              >
                <Trash2 size={14} />
              </motion.button>
            </>
          )}

          {/* Play icon on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <Play size={32} className="text-white ml-1" />
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <h3 className="text-base font-bold text-white line-clamp-1">{title}</h3>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 px-2 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700/30">
              {genre}
            </span>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-white">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Delete confirmation */}
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-3">
              <p className="text-sm text-white font-medium">Delete this movie?</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-all disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}