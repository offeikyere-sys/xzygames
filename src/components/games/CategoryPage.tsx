import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SplineScene } from "@/components/ui/splite"
import { AIChatModal } from "@/components/ui/AIChatModal"
import { Spotlight } from "@/components/ui/spotlight"
import { GameCard } from "./GameCard"
import { MovieCard } from "@/components/movies/MovieCard"
import { ArrowLeft, ImageIcon } from "lucide-react"
import { BlurImage } from "@/components/ui/BlurImage"
import { GenreBannerModal } from "@/components/admin/GenreBannerModal"
import { apiUrl } from "@/lib/api"
import { isVideoUrl } from "@/lib/media"


interface CategoryPageProps {
  category: string
  onBack: () => void
  onGameClick?: (game: { id?: number; title: string; genre: string; rating: number; downloads: number; color: string }) => void
  userToken?: string
  isAdmin?: boolean
  onDeleteGame?: (gameId: number) => void
  onEditGame?: (game: any) => void
  refreshKey?: number
  typeFilter?: "game" | "software" | "movie"
}

export function CategoryPage({ category, onBack, onGameClick, userToken, isAdmin, onDeleteGame, onEditGame, refreshKey, typeFilter = "game" }: CategoryPageProps) {
  const [allGames, setAllGames] = useState<Array<{id?: number; title: string; genre: string; rating: number; downloads: number; image: string; color: string}>>([])
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [bannerModalOpen, setBannerModalOpen] = useState(false)
  const [aiChatOpen, setAiChatOpen] = useState(false)

  const isSoftware = typeFilter === "software"
  const isMovie = typeFilter === "movie"

  useEffect(() => {
    const endpoint = isMovie ? "/api/movies" : "/api/games"
    fetch(apiUrl(`${endpoint}?type=${typeFilter}`))
      .then((res) => res.json())
      .then((data) => {
        setAllGames(data.map((g: Record<string, unknown>) => ({
          id: g.id as number,
          title: g.title as string,
          genre: g.genre as string,
          rating: g.rating as number,
          downloads: g.downloads ? Number(g.downloads) : 0,
          image: isMovie ? (g.poster_url as string) : (g.wallpaper_url as string),
          color: (g.color as string) || "#3b82f6",
        })))
      })
      .catch(() => {})
    // Fetch banner for this category
    const bannerEndpoint = "/api/category-banners"
    fetch(apiUrl(`${bannerEndpoint}/${encodeURIComponent(category)}`))
      .then((res) => res.json())
      .then((data) => setBannerUrl(data.banner_url || null))
      .catch(() => {})
  }, [refreshKey, category, typeFilter, isMovie])

  const filteredGames = allGames.filter((g) => g.genre.includes(category))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      {/* Back button */}
      <div className="fixed top-28 left-4 z-50">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all glow-btn"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>
      </div>

      {/* Robot + Title Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Category Banner Background - Supports image & video */}
        {bannerUrl ? (
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
                alt={`${category} banner`}
                className="absolute inset-0 w-full h-full object-cover object-top"
                wrapperClassName="absolute inset-0"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          </>
        ) : (
          <>
            {/* Spotlight */}
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl" />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }} />
          </>
        )}

        {/* Admin Edit Banner Button */}
        {isAdmin && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setBannerModalOpen(true)}
            className="absolute top-24 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm border border-zinc-700/50 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
            title="Edit category banner"
          >
            <ImageIcon size={14} />
            {bannerUrl ? "Change Banner" : "Add Banner"}
          </motion.button>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left: Category Title */}
            <div className="flex-1 text-center lg:text-left z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-blue-400">{category.toUpperCase()} {isMovie ? "MOVIES" : isSoftware ? "SOFTWARE" : "GAMES"}</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                  {category.toUpperCase()}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                {isMovie
                  ? `Explore the best ${category.toLowerCase()} movies. Watch and download the top titles in this category.`
                  : isSoftware
                    ? `Explore the best ${category.toLowerCase()} software. Download and try the top tools in this category.`
                    : `Explore the best ${category.toLowerCase()} games. Download and play the top titles in this category.`}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="mt-8 flex items-center gap-4 justify-center lg:justify-start"
              >
              <div className="px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-700/50 text-sm text-zinc-300 glow-badge">
                  {filteredGames.length} {isMovie ? "Movies" : isSoftware ? "Software" : "Games"} Available
                </div>
              </motion.div>
            </div>

            {/* Right: 3D Robot — pushed right and up */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="flex-1 relative w-full max-w-lg lg:max-w-none"
            >
              <div
                className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] translate-x-6 -translate-y-4 cursor-pointer"
                onDoubleClick={() => setAiChatOpen(true)}
                title="Double-click to chat with XZY AI"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
              {/* Double-click hint */}
              <div className="flex justify-center mt-1">
                <span className="text-xs text-zinc-400 bg-black/40 px-2.5 py-1 rounded-full border border-zinc-800/30">
                  Double-click robot for AI chat
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredGames.map((game, index) => (
              isMovie ? (
                <MovieCard
                  key={game.id}
                  title={game.title}
                  genre={game.genre}
                  year={(game as any).year || 2024}
                  duration={(game as any).duration || "2h 15m"}
                  rating={game.rating}
                  image={game.image}
                  color={game.color}
                  index={index}
                  movieId={game.id}
                  onClick={() => onGameClick?.({ id: game.id, title: game.title, genre: game.genre, rating: game.rating, downloads: game.downloads, color: game.color })}
                  showDelete={!!isAdmin}
                  onDelete={onDeleteGame}
                  onEdit={onEditGame}
                />
              ) : (
                <GameCard
                  key={game.title}
                  title={game.title}
                  genre={game.genre}
                  rating={game.rating}
                  downloads={game.downloads}
                  image={game.image}
                  color={game.color}
                  index={index}
                  gameId={game.id}
                  onClick={() => onGameClick?.({ id: game.id, title: game.title, genre: game.genre, rating: game.rating, downloads: game.downloads, color: game.color })}
                  showDelete={!!isAdmin}
                  onDelete={onDeleteGame}
                />
              )
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />

      {/* Genre Banner Modal */}
      {isAdmin && userToken && (
        <GenreBannerModal
          isOpen={bannerModalOpen}
          onClose={() => setBannerModalOpen(false)}
          userToken={userToken}
          genre={category}
          currentBannerUrl={bannerUrl}
          onBannerUpdated={(url) => setBannerUrl(url)}
        />
      )}
    </motion.div>
  )
}