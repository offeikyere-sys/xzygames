import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Gamepad2, Monitor, Film, ArrowRight, ImageIcon } from "lucide-react"
import { BlurImage } from "@/components/ui/BlurImage"
import { GenreBannerModal } from "@/components/admin/GenreBannerModal"
import { apiUrl } from "@/lib/api"
import { isVideoUrl } from "@/lib/media"

interface SectionPadProps {
  type: "games" | "software" | "movies"
  onBrowse: () => void
  isAdmin?: boolean
  userToken?: string
}

export function SectionPad({ type, onBrowse, isAdmin, userToken }: SectionPadProps) {
  const [hovered, setHovered] = useState(false)
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [bannerModalOpen, setBannerModalOpen] = useState(false)
  const [shake, setShake] = useState(false)
  const padRef = useRef<HTMLDivElement>(null)

  const isGames = type === "games"
  const isMovies = type === "movies"
  const bannerGenre = isGames ? "GamesPad" : isMovies ? "MoviesPad" : "SoftwarePad"

  // 3D Tilt values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 })

  // Glow position that follows mouse
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 })
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!padRef.current) return
    const rect = padRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".pad-banner-btn")) return
    setShake(true)
    setTimeout(() => {
      setShake(false)
      onBrowse()
    }, 300)
  }

  // Fetch pad banner
  useEffect(() => {
    fetch(apiUrl(`/api/category-banners/${bannerGenre}`))
      .then((res) => res.json())
      .then((data) => setBannerUrl(data.banner_url || null))
      .catch(() => {})
  }, [bannerGenre])

  return (
    <motion.div
      ref={padRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        x: shake ? [0, -8, 8, -6, 6, -3, 3, 0] : 0,
      }}
      transition={{
        duration: shake ? 0.3 : 0.6,
        ease: shake ? "easeInOut" : "easeOut",
        x: shake ? { duration: 0.3, ease: "easeInOut" } : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ perspective: 1200, rotateX, rotateY }}
      className={`
        relative group cursor-pointer overflow-hidden rounded-3xl
        h-[320px] sm:h-[400px] w-full
        border transition-all duration-500
        ${isGames
          ? "border-blue-500/20 hover:border-blue-500/50"
          : isMovies
            ? "border-purple-500/20 hover:border-purple-500/50"
            : "border-emerald-500/20 hover:border-emerald-500/50"
        }
        ${!bannerUrl && (isGames
          ? "bg-gradient-to-br from-blue-900/30 via-zinc-900/80 to-purple-900/20"
          : isMovies
            ? "bg-gradient-to-br from-purple-900/30 via-zinc-900/80 to-pink-900/20"
            : "bg-gradient-to-br from-emerald-900/30 via-zinc-900/80 to-teal-900/20"
        )}
        ${hovered ? (isGames ? "shadow-2xl shadow-blue-500/15" : isMovies ? "shadow-2xl shadow-purple-500/15" : "shadow-2xl shadow-emerald-500/15") : ""}
      `}
    >
      {/* Banner background - Supports image & video */}
      {bannerUrl && (
        <>
          {isVideoUrl(bannerUrl) ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={bannerUrl} />
            </video>
          ) : (
            <BlurImage
              src={bannerUrl}
              alt={isGames ? "Games" : isMovies ? "Movies" : "Software"}
              className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
              wrapperClassName="absolute inset-0"
            />
          )}
          <div className={`absolute inset-0 ${isGames ? "bg-gradient-to-t from-black/80 via-black/40 to-black/20" : isMovies ? "bg-gradient-to-t from-black/80 via-black/40 to-black/20" : "bg-gradient-to-t from-black/80 via-black/40 to-black/20"}`} />
        </>
      )}

      {/* Background glow (only when no banner) */}
      {!bannerUrl && (
        <>
          <motion.div
            className={`absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl transition-opacity duration-500 ${
              hovered ? "opacity-60" : "opacity-20"
            } ${isGames ? "bg-blue-500/30" : isMovies ? "bg-purple-500/30" : "bg-emerald-500/30"}`}
            animate={hovered ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className={`absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-3xl transition-opacity duration-500 ${
              hovered ? "opacity-60" : "opacity-20"
            } ${isGames ? "bg-purple-500/30" : isMovies ? "bg-pink-500/30" : "bg-teal-500/30"}`}
            animate={hovered ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          />
        </>
      )}

      {/* Mouse-following gradient highlight */}
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.08), transparent 60%)`,
          }}
        />
      )}

      {/* Admin edit banner button */}
      {isAdmin && (
        <button
          onClick={() => setBannerModalOpen(true)}
          className="pad-banner-btn absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-zinc-700/50 text-[10px] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          title={`Edit ${isGames ? "games" : isMovies ? "movies" : "software"} pad banner`}
        >
          <ImageIcon size={12} />
          {bannerUrl ? "Banner" : "Add"}
        </button>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        {/* Icon */}
        <motion.div
          animate={hovered ? { scale: 1.2, rotate: [0, -8, 8, -5, 5, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center mb-5 border transition-all duration-300 ${
            isGames
              ? "bg-blue-500/20 border-blue-500/30 text-blue-400 group-hover:shadow-xl group-hover:shadow-blue-500/30 group-hover:border-blue-400/50"
              : isMovies
                ? "bg-purple-500/20 border-purple-500/30 text-purple-400 group-hover:shadow-xl group-hover:shadow-purple-500/30 group-hover:border-purple-400/50"
                : "bg-emerald-500/20 border-emerald-500/30 text-emerald-400 group-hover:shadow-xl group-hover:shadow-emerald-500/30 group-hover:border-emerald-400/50"
          }`}
          style={{ transformStyle: "preserve-3d", transform: hovered ? "translateZ(30px)" : "translateZ(0px)" }}
        >
          {isGames ? <Gamepad2 size={52} /> : isMovies ? <Film size={52} /> : <Monitor size={52} />}
        </motion.div>

        {/* Title */}
        <motion.h2
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`text-4xl sm:text-5xl font-black tracking-tight mb-2 transition-colors duration-300 ${
            isGames ? "text-blue-300 group-hover:text-blue-200" : isMovies ? "text-purple-300 group-hover:text-purple-200" : "text-emerald-300 group-hover:text-emerald-200"
          }`}
          style={{ transformStyle: "preserve-3d", transform: hovered ? "translateZ(20px)" : "translateZ(0px)" }}
        >
          {isGames ? "GAMES" : isMovies ? "MOVIES" : "SOFTWARE"}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          animate={hovered ? { opacity: 0.8, y: -2 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-zinc-500 text-sm sm:text-base mb-6 max-w-[300px]"
          style={{ transformStyle: "preserve-3d", transform: hovered ? "translateZ(15px)" : "translateZ(0px)" }}
        >
          {isGames
            ? "Browse 500+ free games across all genres"
            : isMovies
              ? "Watch and download the latest movies"
              : "Discover powerful software for every need"
          }
        </motion.p>

        {/* Browse button (appears on hover) */}
        <motion.div
          initial={false}
          animate={hovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            isGames
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30"
              : isMovies
                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
          }`}
          style={{ transformStyle: "preserve-3d", transform: hovered ? "translateZ(25px)" : "translateZ(0px)" }}
        >
          Browse {isGames ? "Games" : isMovies ? "Movies" : "Software"}
          <motion.div
            animate={hovered ? { x: [0, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </motion.div>
      </div>

      {/* Animated border gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        style={{
          background: isGames
            ? "linear-gradient(135deg, rgba(59,130,246,0.2), transparent, rgba(168,85,247,0.2))"
            : isMovies
              ? "linear-gradient(135deg, rgba(168,85,247,0.2), transparent, rgba(236,72,153,0.2))"
              : "linear-gradient(135deg, rgba(16,185,129,0.2), transparent, rgba(20,184,166,0.2))",
        }}
      />

      {/* Decorative dots */}
      <div className="absolute top-4 right-4 flex gap-1.5">
        <motion.div
          animate={hovered ? { scale: 1.3, opacity: 0.7 } : { scale: 1, opacity: 0.4 }}
          className={`w-2 h-2 rounded-full ${isGames ? "bg-blue-500" : isMovies ? "bg-purple-500" : "bg-emerald-500"}`}
        />
        <motion.div
          animate={hovered ? { scale: 1.3, opacity: 0.7 } : { scale: 1, opacity: 0.4 }}
          transition={{ delay: 0.1 }}
          className={`w-2 h-2 rounded-full ${isGames ? "bg-purple-500" : isMovies ? "bg-pink-500" : "bg-teal-500"}`}
        />
        <motion.div
          animate={hovered ? { scale: 1.3, opacity: 0.7 } : { scale: 1, opacity: 0.4 }}
          transition={{ delay: 0.2 }}
          className={`w-2 h-2 rounded-full ${isGames ? "bg-blue-500" : isMovies ? "bg-purple-500" : "bg-emerald-500"}`}
        />
      </div>

      {/* Banner Manager Modal */}
      <GenreBannerModal
        isOpen={bannerModalOpen}
        onClose={() => setBannerModalOpen(false)}
        userToken={userToken || ""}
        genre={bannerGenre}
        currentBannerUrl={bannerUrl}
        onBannerUpdated={(url) => setBannerUrl(url)}
      />
    </motion.div>
  )
}