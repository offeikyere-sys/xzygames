import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SplineScene } from "@/components/ui/splite"
import { AIChatModal } from "@/components/ui/AIChatModal"
import { Spotlight } from "@/components/ui/spotlight"
import { Particles } from "@/components/ui/Particles"
import { TrailerModal } from "@/components/ui/TrailerModal"
import { Download, Play, ChevronDown, ImageIcon } from "lucide-react"
import { BlurImage } from "@/components/ui/BlurImage"
import { GenreBannerModal } from "@/components/admin/GenreBannerModal"
import { apiUrl } from "@/lib/api"
import { isVideoUrl } from "@/lib/media"
import { detectPerformanceMode, getPerformanceClass } from "@/lib/performance"

interface HeroSectionProps {
  userToken?: string
  isAdmin?: boolean
  activeSection?: "games" | "software" | "movies"
  isHomePage?: boolean
  onBrowse?: () => void
}

export function HeroSection({ userToken, isAdmin, activeSection, isHomePage, onBrowse }: HeroSectionProps) {
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [randomTrailer, setRandomTrailer] = useState<{ trailer_url: string; title: string; item_type: string } | null>(null)
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [bannerModalOpen, setBannerModalOpen] = useState(false)
  const [softwareBannerUrl, setSoftwareBannerUrl] = useState<string | null>(null)
  const [softwareBannerModalOpen, setSoftwareBannerModalOpen] = useState(false)
  const [movieBannerUrl, setMovieBannerUrl] = useState<string | null>(null)
  const [movieBannerModalOpen, setMovieBannerModalOpen] = useState(false)
  const [gamesBannerUrl, setGamesBannerUrl] = useState<string | null>(null)
  const [gamesBannerModalOpen, setGamesBannerModalOpen] = useState(false)
  const [aiChatOpen, setAiChatOpen] = useState(false)
  const [stats, setStats] = useState<{ games: number; software: number; movies: number; total_downloads: number } | null>(null)
  const [perfMode] = useState(() => detectPerformanceMode())

  const isSoftwarePage = !isHomePage && activeSection === "software"
  const isMoviePage = !isHomePage && activeSection === "movies"

  // Fetch random trailer on mount
  useEffect(() => {
    const controller = new AbortController()
    fetch(apiUrl("/api/random-trailer"), { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.trailer_url) {
          setRandomTrailer(data)
        }
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  // Fetch banner and stats
  useEffect(() => {
    const bannerGenre = isMoviePage ? "MovieHero" : isSoftwarePage ? "SoftwareHero" : isHomePage ? "Home" : "GamesHero"
    fetch(apiUrl(`/api/category-banners/${bannerGenre}`))
      .then((res) => res.json())
      .then((data) => {
        if (isMoviePage) {
          setMovieBannerUrl(data.banner_url || null)
        } else if (isSoftwarePage) {
          setSoftwareBannerUrl(data.banner_url || null)
        } else if (isHomePage) {
          setBannerUrl(data.banner_url || null)
        } else {
          setGamesBannerUrl(data.banner_url || null)
        }
      })
      .catch(() => {})
    // Fetch dynamic stats (works for all pages now, includes movies count)
    fetch(apiUrl("/api/stats"))
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {})
  }, [isSoftwarePage, isMoviePage])

  // Determine which banner to show based on page type
  let activeBannerUrl: string | null = null
  if (isMoviePage) {
    activeBannerUrl = movieBannerUrl
  } else if (isSoftwarePage) {
    activeBannerUrl = softwareBannerUrl
  } else if (isHomePage) {
    activeBannerUrl = bannerUrl
  } else {
    activeBannerUrl = gamesBannerUrl
  }

  const formatDownloads = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M+`
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K+`
    return `${n}+`
  }

  const perfClass = getPerformanceClass(perfMode)
  const showHeavyEffects = perfMode === "high"
  const showMediumEffects = perfMode === "medium" || perfMode === "high"

  return (
    <section className={`relative min-h-[100vh] sm:min-h-[120vh] flex items-center overflow-hidden bg-black ${perfClass}`}>
      {/* Banner Background - Supports image & video (live wallpaper) */}
      {activeBannerUrl && (
        <>
          {isVideoUrl(activeBannerUrl) ? (
            <>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={activeBannerUrl} />
              </video>
            </>
          ) : (
            <BlurImage
              src={activeBannerUrl}
              alt={isMoviePage ? "XZY Movies banner" : isSoftwarePage ? "XZY Software banner" : "XZY Games banner"}
              className="absolute inset-0 w-full h-full object-cover"
              wrapperClassName="absolute inset-0"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </>
      )}

      {!activeBannerUrl && (
        <>
          {/* Particle effects - only in high mode */}
          {showHeavyEffects && <Particles />}

          {/* Spotlight effect - only in high mode */}
          {showHeavyEffects && <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />}

          {/* Ambient glow - reduced in medium, removed in low */}
          {showMediumEffects && (
            <>
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
            </>
          )}

          {/* Animated Neon Grid - only in high mode */}
          {showHeavyEffects && (
            <div
              className="neon-grid"
              ref={(el) => {
                if (!el) return
                const handler = (e: MouseEvent) => {
                  const rect = el.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width) * 100
                  const y = ((e.clientY - rect.top) / rect.height) * 100
                  el.style.setProperty("--mouse-x", `${x}%`)
                  el.style.setProperty("--mouse-y", `${y}%`)
                }
                el.addEventListener("mousemove", handler)
              }}
            />
          )}
        </>
      )}

      {/* Admin Edit Banner Buttons */}
      {isAdmin && (
        <>
          {/* Home Hero Banner Edit */}
          {isHomePage && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setBannerModalOpen(true)}
              className="absolute top-24 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm border border-zinc-700/50 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
              title="Edit home hero banner"
            >
              <ImageIcon size={14} />
              {bannerUrl ? "Change Home Banner" : "Add Home Banner"}
            </motion.button>
          )}

          {/* Games Hero Banner Edit */}
          {!isHomePage && !isSoftwarePage && !isMoviePage && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setGamesBannerModalOpen(true)}
              className="absolute top-24 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm border border-blue-700/50 text-xs text-blue-300 hover:text-blue-200 hover:bg-zinc-800 transition-all"
              title="Edit games hero banner"
            >
              <ImageIcon size={14} />
              {gamesBannerUrl ? "Change Games Banner" : "Add Games Banner"}
            </motion.button>
          )}

          {/* Software Hero Banner Edit */}
          {isSoftwarePage && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setSoftwareBannerModalOpen(true)}
              className="absolute top-24 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm border border-emerald-700/50 text-xs text-emerald-300 hover:text-emerald-200 hover:bg-zinc-800 transition-all"
              title="Edit software hero banner"
            >
              <ImageIcon size={14} />
              {softwareBannerUrl ? "Change Software Banner" : "Add Software Banner"}
            </motion.button>
          )}

          {/* Movie Hero Banner Edit */}
          {isMoviePage && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setMovieBannerModalOpen(true)}
              className="absolute top-24 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm border border-purple-700/50 text-xs text-purple-300 hover:text-purple-200 hover:bg-zinc-800 transition-all"
              title="Edit movie hero banner"
            >
              <ImageIcon size={14} />
              {movieBannerUrl ? "Change Movie Banner" : "Add Movie Banner"}
            </motion.button>
          )}
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 glow-badge">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-400">
                  {isHomePage
                    ? "NEW GAMES, SOFTWARE & MOVIES ADDED WEEKLY"
                    : activeSection === "software"
                      ? "NEW SOFTWARE ADDED WEEKLY"
                      : activeSection === "movies"
                        ? "NEW MOVIES ADDED WEEKLY"
                        : "NEW GAMES ADDED WEEKLY"}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                XZY
              </span>
              <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400">
                  {isHomePage ? "GAMES & SOFTWARE" : activeSection === "software" ? "SOFTWARES" : activeSection === "movies" ? "MOVIES" : "GAMES"}
                </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-4 sm:mt-6 text-base sm:text-lg text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              {isHomePage
                ? "Your ultimate destination for the best games, software, and movies. Discover, download, and level up your experience."
                : activeSection === "software"
                  ? "Explore. Download. Innovate. Your hub for top-tier software tools and applications. Find what you need and get started instantly."
                  : activeSection === "movies"
                    ? "Watch. Stream. Enjoy. Your destination for the latest movies and series. Discover new titles and enjoy unlimited entertainment."
                    : "Download. Play. Dominate. Your ultimate destination for the best games. Discover new titles, download instantly, and level up your gaming experience."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => {
                  const target = document.getElementById(
                    isHomePage ? "browse-all" : activeSection === "software" ? "featured-software" : "featured-games"
                  )
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" })
                  } else if (onBrowse) {
                    onBrowse()
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 glow-btn"
              >
                <Download size={18} />
                {isHomePage ? "Browse All" : activeSection === "software" ? "Browse Software" : activeSection === "movies" ? "Browse Movies" : "Browse Games"}
              </button>
              <button
                onClick={() => setTrailerOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-sm transition-all bg-zinc-900/50 hover:bg-zinc-800/50 glow-btn"
              >
                <Play size={18} />
                Watch Trailer
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-8 sm:mt-12 flex items-center gap-6 sm:gap-8 justify-center lg:justify-start"
            >
              {(() => {
                const statItems = isHomePage
                  ? [
                      { label: "Games", value: stats ? formatDownloads(stats.games) : "..." },
                      { label: "Software", value: stats ? formatDownloads(stats.software) : "..." },
                      { label: "Movies", value: stats ? formatDownloads(stats.movies) : "..." },
                      { label: "Downloads", value: stats ? formatDownloads(stats.total_downloads) : "..." },
                    ]
                  : isSoftwarePage
                  ? [
                      { label: "Software", value: stats ? formatDownloads(stats.software) : "..." },
                      { label: "Downloads", value: stats ? formatDownloads(stats.total_downloads) : "..." },
                    ]
                  : isMoviePage
                  ? [
                      { label: "Movies", value: stats ? formatDownloads(stats.movies) : "..." },
                      { label: "Downloads", value: stats ? formatDownloads(stats.total_downloads) : "..." },
                    ]
                  : [
                      { label: "Games", value: stats ? formatDownloads(stats.games) : "..." },
                      { label: "Downloads", value: stats ? formatDownloads(stats.total_downloads) : "..." },
                    ]
                return statItems.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">{stat.label}</div>
                  </div>
                ))
              })()}
            </motion.div>
          </div>

            {/* Right: 3D Robot — pushed right and up — double-click to open AI Chat */}
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs text-zinc-500">Scroll to explore</span>
        <ChevronDown size={16} className="text-zinc-500" />
      </motion.div>

      {/* Trailer Modal - shows a random trailer from the website */}
      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        title={randomTrailer?.title || (isMoviePage ? "XZY Movies" : isSoftwarePage ? "XZY Software" : "XZY Games")}
        videoUrl={randomTrailer?.trailer_url}
      />

      {/* AI Chat Modal */}
      <AIChatModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />

      {/* Banner Manager Modal - Home/Games Hero */}
      <GenreBannerModal
        isOpen={bannerModalOpen}
        onClose={() => setBannerModalOpen(false)}
        userToken={userToken || ""}
        genre="Home"
        currentBannerUrl={bannerUrl}
        onBannerUpdated={(url) => setBannerUrl(url)}
      />

      {/* Banner Manager Modal - Software Hero */}
      <GenreBannerModal
        isOpen={softwareBannerModalOpen}
        onClose={() => setSoftwareBannerModalOpen(false)}
        userToken={userToken || ""}
        genre="SoftwareHero"
        currentBannerUrl={softwareBannerUrl}
        onBannerUpdated={(url) => setSoftwareBannerUrl(url)}
      />

      {/* Banner Manager Modal - Movie Hero */}
      <GenreBannerModal
        isOpen={movieBannerModalOpen}
        onClose={() => setMovieBannerModalOpen(false)}
        userToken={userToken || ""}
        genre="MovieHero"
        currentBannerUrl={movieBannerUrl}
        onBannerUpdated={(url) => setMovieBannerUrl(url)}
      />

      {/* Banner Manager Modal - Games Hero */}
      <GenreBannerModal
        isOpen={gamesBannerModalOpen}
        onClose={() => setGamesBannerModalOpen(false)}
        userToken={userToken || ""}
        genre="GamesHero"
        currentBannerUrl={gamesBannerUrl}
        onBannerUpdated={(url) => setGamesBannerUrl(url)}
      />
    </section>
  )
}