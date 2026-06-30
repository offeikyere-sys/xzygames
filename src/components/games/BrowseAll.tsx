import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GameCard } from "./GameCard"
import { Gamepad2, Monitor, Film, ArrowDown, Compass, Layers, Sparkles, Infinity, ArrowLeft, Search, SortAsc } from "lucide-react"
import { apiUrl } from "@/lib/api"

const ITEMS_PER_PAGE = 8

interface ItemInfo {
  id?: number
  title: string
  genre: string
  rating: number
  downloads: number
  color: string
  wallpaper_url?: string | null
  download_links?: string | null
  _type: "game" | "software" | "movie"
}

interface BrowseAllProps {
  onGameClick: (game: ItemInfo) => void
  refreshKey?: number
  userToken?: string
  isAdmin?: boolean
  onDeleteGame?: (gameId: number) => void
  typeFilter?: "game" | "software" | "movie"
  onBack?: () => void
}

export function BrowseAll({ onGameClick, refreshKey, userToken: _userToken, isAdmin, onDeleteGame, typeFilter, onBack }: BrowseAllProps) {
  const [allItems, setAllItems] = useState<ItemInfo[]>([])
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(true)
  const [filter, setFilter] = useState<"all" | "game" | "software" | "movie">("all")
  const [sortBy, setSortBy] = useState<"downloads" | "rating" | "title" | "newest">("downloads")
  const [searchQuery, setSearchQuery] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  // Fetch items based on typeFilter
  useEffect(() => {
    setLoading(true)
    setExpanded(true)
    
    // Minimum loading time to prevent skeleton flash (300ms)
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 300))

    if (typeFilter === "movie") {
      fetch(apiUrl("/api/movies"))
        .then((r) => r.json())
        .then((data) => {
          const movies: ItemInfo[] = (data || []).map((g: Record<string, unknown>) => ({
            id: g.id as number,
            title: g.title as string,
            genre: g.genre as string,
            rating: g.rating as number,
            downloads: g.downloads ? Number(g.downloads) : 0,
            color: (g.color as string) || "#a855f7",
            wallpaper_url: g.poster_url as string | undefined,
            download_links: g.download_links as string | undefined,
            _type: "movie" as const,
          }))
          setAllItems(movies)
          setLoading(false)
          setVisibleCount(ITEMS_PER_PAGE)
        })
        .catch(() => { setLoading(false) })
    } else if (typeFilter === "game") {
      fetch(apiUrl("/api/games?type=game"))
        .then((r) => r.json())
        .then((data) => {
          const games: ItemInfo[] = (data || []).map((g: Record<string, unknown>) => ({
            id: g.id as number,
            title: g.title as string,
            genre: g.genre as string,
            rating: g.rating as number,
            downloads: g.downloads ? Number(g.downloads) : 0,
            color: (g.color as string) || "#3b82f6",
            wallpaper_url: g.wallpaper_url as string | undefined,
            download_links: g.download_links as string | undefined,
            _type: "game" as const,
          }))
          setAllItems(games)
          setLoading(false)
          setVisibleCount(ITEMS_PER_PAGE)
        })
        .catch(() => { setLoading(false) })
    } else if (typeFilter === "software") {
      fetch(apiUrl("/api/games?type=software"))
        .then((r) => r.json())
        .then((data) => {
          const software: ItemInfo[] = (data || []).map((g: Record<string, unknown>) => ({
            id: g.id as number,
            title: g.title as string,
            genre: g.genre as string,
            rating: g.rating as number,
            downloads: g.downloads ? Number(g.downloads) : 0,
            color: (g.color as string) || "#10b981",
            wallpaper_url: g.wallpaper_url as string | undefined,
            download_links: g.download_links as string | undefined,
            _type: "software" as const,
          }))
          setAllItems(software)
          setLoading(false)
          setVisibleCount(ITEMS_PER_PAGE)
        })
        .catch(() => { setLoading(false) })
    } else {
      Promise.all([
        fetch(apiUrl("/api/games?type=game")).then((r) => r.json()).catch(() => []),
        fetch(apiUrl("/api/games?type=software")).then((r) => r.json()).catch(() => []),
        fetch(apiUrl("/api/movies")).then((r) => r.json()).catch(() => []),
      ]).then(([gamesData, softwareData, moviesData]) => {
        // Wait for minimum load time
        return minLoadTime.then(() => ({ gamesData, softwareData, moviesData }))
      }).then(({ gamesData, softwareData, moviesData }) => {
        const games: ItemInfo[] = (gamesData || []).map((g: Record<string, unknown>) => ({
          id: g.id as number,
          title: g.title as string,
          genre: g.genre as string,
          rating: g.rating as number,
          downloads: g.downloads ? Number(g.downloads) : 0,
          color: (g.color as string) || "#3b82f6",
          wallpaper_url: g.wallpaper_url as string | undefined,
          download_links: g.download_links as string | undefined,
          _type: "game" as const,
        }))
        const software: ItemInfo[] = (softwareData || []).map((g: Record<string, unknown>) => ({
          id: g.id as number,
          title: g.title as string,
          genre: g.genre as string,
          rating: g.rating as number,
          downloads: g.downloads ? Number(g.downloads) : 0,
          color: (g.color as string) || "#10b981",
          wallpaper_url: g.wallpaper_url as string | undefined,
          download_links: g.download_links as string | undefined,
          _type: "software" as const,
        }))
        const movies: ItemInfo[] = (moviesData || []).map((g: Record<string, unknown>) => ({
          id: g.id as number,
          title: g.title as string,
          genre: g.genre as string,
          rating: g.rating as number,
          downloads: g.downloads ? Number(g.downloads) : 0,
          color: (g.color as string) || "#a855f7",
          wallpaper_url: g.poster_url as string | undefined,
          download_links: g.download_links as string | undefined,
          _type: "movie" as const,
        }))

        const combined: ItemInfo[] = []
        const maxLen = Math.max(games.length, software.length, movies.length)
        for (let i = 0; i < maxLen; i++) {
          if (i < games.length) combined.push(games[i])
          if (i < software.length) combined.push(software[i])
          if (i < movies.length) combined.push(movies[i])
        }
        setAllItems(combined)
        setLoading(false)
        setVisibleCount(ITEMS_PER_PAGE)
      })
    }
  }, [refreshKey, typeFilter])

  // Set filter based on typeFilter
  useEffect(() => {
    if (typeFilter === "game") setFilter("game")
    else if (typeFilter === "software") setFilter("software")
    else if (typeFilter === "movie") setFilter("movie")
    else setFilter("all")
  }, [typeFilter])

  // Reset when filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
  }, [filter])

  const filteredItems = useMemo(() => {
    let items = allItems
    // Type filter
    if (filter !== "all") items = items.filter((item) => item._type === filter)
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter((item) => item.title.toLowerCase().includes(q) || item.genre.toLowerCase().includes(q))
    }
    // Sort
    const sorted = [...items]
    if (sortBy === "downloads") sorted.sort((a, b) => b.downloads - a.downloads)
    else if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating)
    else if (sortBy === "title") sorted.sort((a, b) => a.title.localeCompare(b.title))
    // "newest" keeps default order (by id descending = most recently added first)
    return sorted
  }, [allItems, filter, sortBy, searchQuery])

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount)
  }, [filteredItems, visibleCount])

  const hasMore = visibleCount < filteredItems.length

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length))
  }, [filteredItems.length])

  const handleViewAll = () => {
    setExpanded(true)
    setVisibleCount(ITEMS_PER_PAGE)
    setTimeout(() => {
      footerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const totalGames = allItems.filter((i) => i._type === "game").length
  const totalSoftware = allItems.filter((i) => i._type === "software").length
  const totalMovies = allItems.filter((i) => i._type === "movie").length

  const isFiltered = !!typeFilter
  const title = isFiltered
    ? typeFilter === "game" ? "All Games" : typeFilter === "software" ? "All Software" : "All Movies"
    : "Browse Everything"
  const subtitle = isFiltered
    ? typeFilter === "game"
      ? `Explore all ${totalGames} games in our collection`
      : typeFilter === "software"
        ? `Explore all ${totalSoftware} software titles in our collection`
        : `Explore all ${totalMovies} movies in our collection`
    : "Discover our complete collection of games, software, and movies all in one place. Mix, match, and find your next favorite."

  return (
    <section id="browse-all" className={`relative py-20 bg-black overflow-hidden ${isFiltered ? "pt-28" : ""}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {isFiltered && onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all mb-6"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 mb-4">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-xs font-medium text-zinc-300">
              {isFiltered
                ? `${filteredItems.length} ${typeFilter === "game" ? "Games" : typeFilter === "software" ? "Software" : "Movies"} Available`
                : `${totalGames} Games, ${totalSoftware} Software & ${totalMovies} Movies Available`
              }
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400">
              {title}
            </span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {[
            { key: "all", label: "All", icon: Layers },
            { key: "game", label: "Games", icon: Gamepad2 },
            { key: "software", label: "Software", icon: Monitor },
            { key: "movie", label: "Movies", icon: Film },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === key
                  ? key === "game"
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : key === "software"
                      ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800/50 border border-transparent"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Search & Sort row */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
            <Search size={14} className="text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name..."
              className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-36"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-zinc-500 mr-1"><SortAsc size={14} /></span>
            {[
              { key: "downloads", label: "Most Downloaded" },
              { key: "rating", label: "Highest Rated" },
              { key: "title", label: "Name A-Z" },
              { key: "newest", label: "Newest" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortBy(key as typeof sortBy)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
                  sortBy === key
                    ? "bg-blue-600/20 text-blue-400 border-blue-500/30"
                    : "text-zinc-500 hover:text-white hover:bg-zinc-800/50 border-transparent"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[280px] rounded-xl bg-zinc-900/50 animate-pulse" />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              <AnimatePresence>
                {visibleItems.map((item, i) => (
                  <motion.div
                    key={item.id ? `${item._type}-${item.id}` : i}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      delay: Math.min(i * 0.02, 0.3),
                    }}
                  >
                    <div className="relative group">
                      {!isFiltered && (
                        <div className="absolute top-2 right-2 z-20">
                          <span
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              item._type === "game"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : item._type === "software"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            }`}
                          >
                            {item._type === "game" ? <Gamepad2 size={10} /> : <Monitor size={10} />}
                            {item._type === "game" ? "Game" : item._type === "software" ? "Software" : "Movie"}
                          </span>
                        </div>
                      )}
                      <GameCard
                        title={item.title}
                        genre={item.genre}
                        rating={item.rating}
                        downloads={item.downloads}
                        image={item.wallpaper_url || ""}
                        color={item.color}
                        index={i}
                        gameId={item.id}
                        onClick={() => onGameClick(item)}
                        showDelete={!!isAdmin}
                        onDelete={onDeleteGame}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {hasMore && (
              <motion.div
                ref={bottomRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mt-10"
              >
                <button
                  onClick={loadMore}
                  className="group flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border border-blue-500/20 hover:border-emerald-500/30 text-zinc-300 hover:text-white font-medium text-sm transition-all hover:shadow-lg hover:shadow-blue-500/10"
                >
                <span>Load More</span>
                  <ArrowDown
                    size={16}
                    className="group-hover:animate-bounce transition-all"
                  />
                  <span className="text-xs text-zinc-500">
                    +{Math.min(ITEMS_PER_PAGE, filteredItems.length - visibleCount)} more
                  </span>
                </button>
              </motion.div>
            )}

            {!hasMore && filteredItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center mt-16 mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-zinc-800 flex items-center justify-center mb-4">
                  <Infinity size={24} className="text-zinc-500" />
                </div>
                <p className="text-zinc-500 text-sm font-medium">You've seen it all!</p>
                <p className="text-zinc-600 text-xs mt-1">
                  {filteredItems.length} {filter === "all" ? "games, software & movies" : filter === "game" ? "games" : filter === "software" ? "software" : "movies"} loaded
                </p>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <Compass size={48} className="mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-500 text-sm">
              {searchQuery
                ? `No items found matching "${searchQuery}"`
                : filter === "game"
                  ? "No games available yet"
                  : filter === "software"
                    ? "No software available yet"
                    : "Nothing available yet"}
            </p>
          </div>
        )}

        {!isFiltered && !expanded && filteredItems.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleViewAll}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 glow-btn"
            >
              <Sparkles size={16} />
              View All ({filteredItems.length})
            </button>
          </div>
        )}

        <div ref={footerRef} />
      </div>
    </section>
  )
}