"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react"
import { GameCard } from "@/components/games/GameCard"
import { SimpleCarousel } from "@/components/ui/SimpleCarousel"
import { BlurImage } from "@/components/ui/BlurImage"
import { apiUrl } from "@/lib/api"
import { detectPerformanceMode } from "@/lib/performance"

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

  const gamesPerPage = 24

  // Fetch games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(apiUrl("/api/games"))
        const data = await res.json()
        if (data.success) {
          setGames(data.games || [])
          setFilteredGames(data.games || [])
          
          // Extract unique genres
          const uniqueGenres = Array.from(new Set((data.games || []).map((g: Game) => g.genre))).filter(Boolean) as string[]
          setGenres(["All", ...uniqueGenres.sort()])
        }
      } catch (error) {
        console.error("Failed to fetch games:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

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

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-b from-blue-900/20 to-black pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Games
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg mb-8"
          >
            Discover and download amazing games
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
              placeholder="Search games..."
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
            {filteredGames.length} {filteredGames.length === 1 ? "game" : "games"} found
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
      </div>
    </div>
  )
}