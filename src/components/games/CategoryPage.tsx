"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { GameCard } from "@/components/games/GameCard"
import { SimpleCarousel } from "@/components/ui/SimpleCarousel"
import { BlurImage } from "@/components/ui/BlurImage"
import { GenreBannerModal } from "@/components/admin/GenreBannerModal"
import { apiUrl } from "@/lib/api"
import { detectPerformanceMode } from "@/lib/performance"
import { isVideoUrl } from "@/lib/media"

interface Game {
  id: number
  title: string
  genre: string
  rating: number
  downloads: number
  image: string
  color: string
  description?: string
  release_date?: string
  developer?: string
  publisher?: string
  size?: string
  version?: string
  requirements?: string
  trailer_url?: string
  screenshots?: string[]
  game_type?: string
}

interface CategoryPageProps {
  category?: string
  userToken?: string
  isAdmin?: boolean
  onBack?: () => void
  onGameClick?: (game: Game) => void
  onDeleteGame?: (gameId: number) => Promise<void>
  onEditGame?: (game: any) => void
  typeFilter?: string
}

export function CategoryPage({ category, userToken, isAdmin, onBack, onGameClick, onDeleteGame, onEditGame, typeFilter }: CategoryPageProps) {
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [genres, setGenres] = useState<string[]>([])
  const perfMode = detectPerformanceMode()
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [bannerModalOpen, setBannerModalOpen] = useState(false)

  const gamesPerPage = 24

  // Dynamic title based on typeFilter
  const pageTitle = typeFilter === "movie"
    ? "Movies"
    : typeFilter === "software"
      ? "Software"
      : "Games"

  const pageSubtitle = typeFilter === "movie"
    ? "Discover and download amazing movies"
    : typeFilter === "software"
      ? "Discover powerful software for every need"
      : "Discover and download amazing games"

  // Fetch items based on typeFilter (games, software, or movies)
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        let endpoint = "/api/games"
        let params = new URLSearchParams()

        if (typeFilter === "movie") {
          endpoint = "/api/movies"
        } else if (typeFilter === "game" || typeFilter === "software") {
          params.set("type", typeFilter)
        }

        // Pass the category as genre filter (unless it's "All")
        if (category && category !== "All") {
          params.set("genre", category)
        }

        const url = `${apiUrl(endpoint)}${params.toString() ? `?${params.toString()}` : ""}`
        const res = await fetch(url)
        const data = await res.json()

        // Backend returns a plain array directly
        const items = Array.isArray(data) ? data : []
        // Map API fields to component fields (wallpaper_url/poster_url → image)
        const mappedItems = items.map((item: any) => ({
          ...item,
          image: item.wallpaper_url || item.poster_url || item.image || "",
        }))
        setGames(mappedItems)
        setFilteredGames(mappedItems)

        // Extract unique genres from fetched items
        const uniqueGenres = Array.from(new Set(items.map((g: Game) => g.genre))).filter(Boolean) as string[]
        setGenres(["All", ...uniqueGenres.sort()])
      } catch (error) {
        console.error("Failed to fetch items:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [typeFilter, category])

  // Fetch category banner
  useEffect(() => {
    const fetchBanner = async () => {
      if (!category || category === "All") {
        setBannerUrl(null)
        return
      }
      try {
        const res = await fetch(apiUrl(`/api/category-banners/${encodeURIComponent(category)}`))
        const data = await res.json()
        setBannerUrl(data.banner_url || null)
      } catch (error) {
        console.error("Failed to fetch category banner:", error)
        setBannerUrl(null)
      }
    }
    fetchBanner()
  }, [category])

  // Filter and sort games
  useEffect(() => {
    let result = [...games]

    // Search filter
    if (searchQuery) {
      result = result.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.developer?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Genre filter
    if (selectedGenre !== "All") {
      result = result.filter(game => game.genre === selectedGenre)
    }

    // Sort
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.downloads - a.downloads)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => new Date(b.release_date || 0).getTime() - new Date(a.release_date || 0).getTime())
        break
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredGames(result)
    setTotalPages(Math.ceil(result.length / gamesPerPage))
    setCurrentPage(1)
  }, [searchQuery, selectedGenre, sortBy, games])

  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * gamesPerPage
    return filteredGames.slice(start, start + gamesPerPage)
  }, [filteredGames, currentPage])

  const handleDeleteGame = async (gameId: number) => {
    if (!userToken) return
    
    try {
      const res = await fetch(apiUrl(`/api/games/${gameId}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (res.ok) {
        setGames(games.filter(g => g.id !== gameId))
      }
    } catch (error) {
      console.error("Failed to delete game:", error)
    }
  }

  const handleBannerUpdated = (url: string | null) => {
    setBannerUrl(url)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Banner + Search */}
      <div className={`relative ${bannerUrl ? "pt-28 pb-20 min-h-[50vh]" : "pt-20 pb-16 min-h-[40vh]"}`}>
        {/* Banner background */}
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
                alt={category || pageTitle}
                className="absolute inset-0 w-full h-full object-cover"
                wrapperClassName="absolute inset-0"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
          </>
        )}

        {/* Admin edit banner button */}
        {isAdmin && category && category !== "All" && (
          <button
            onClick={() => setBannerModalOpen(true)}
            className="absolute top-24 right-4 z-20 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-zinc-700/50 text-[10px] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            title={`Edit ${category} banner`}
          >
            <ImageIcon size={12} />
            {bannerUrl ? "Banner" : "Add"}
          </button>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
              Back
            </button>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            {category && category !== "All" ? category : pageTitle}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg mb-8"
          >
            {pageSubtitle}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input
            type="text"
            placeholder={`Search ${pageTitle.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Filters and Games Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Genre Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedGenre === genre
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-900/50 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Sort and Filter Controls */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-zinc-400 text-sm">
            {filteredGames.length} {filteredGames.length === 1 ? (typeFilter === "movie" ? "movie" : typeFilter === "software" ? "software" : "game") : (typeFilter === "movie" ? "movies" : typeFilter === "software" ? "software" : "games")} found
          </p>
          
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Games Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-zinc-400">Loading games...</div>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Search size={48} className="text-zinc-600 mb-4" />
            <p className="text-zinc-400 text-lg">No games found</p>
            <p className="text-zinc-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedGames.map((game, index) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  genre={game.genre}
                  rating={game.rating}
                  downloads={game.downloads}
                  image={game.image}
                  color={game.color}
                  index={index}
                  gameId={game.id}
                  showDelete={isAdmin}
                  onDelete={handleDeleteGame}
                  onClick={() => onGameClick?.(game)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-900/50 text-zinc-400 hover:text-white border border-zinc-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Genre Banner Modal */}
        <GenreBannerModal
          isOpen={bannerModalOpen}
          onClose={() => setBannerModalOpen(false)}
          userToken={userToken || ""}
          genre={category || ""}
          currentBannerUrl={bannerUrl}
          onBannerUpdated={handleBannerUpdated}
        />
      </div>
    </div>
  )
}
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
