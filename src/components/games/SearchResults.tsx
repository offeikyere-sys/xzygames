import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GameCard } from "./GameCard"
import { MovieCard } from "@/components/movies/MovieCard"
import { Search, ArrowLeft, Film } from "lucide-react"
import { apiUrl } from "@/lib/api"

interface GameInfo {
  id?: number
  title: string
  genre: string
  rating: number
  downloads: number
  image: string
  color: string
  type?: string
}

interface SearchResultsProps {
  query: string
  onBack: () => void
  onGameClick: (game: { id?: number; title: string; genre: string; rating: number; downloads: number; color: string }) => void
}

export function SearchResults({ query, onBack, onGameClick }: SearchResultsProps) {
  const [results, setResults] = useState<GameInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(12)

  useEffect(() => {
    setLoading(true)
    setDisplayCount(12)
    
    Promise.all([
      fetch(apiUrl(`/api/games/search?q=${encodeURIComponent(query)}`)).then(res => res.json()),
      fetch(apiUrl(`/api/movies/search?q=${encodeURIComponent(query)}`)).then(res => res.json())
    ])
      .then(([games, movies]) => {
        const combined = [
          ...games.map((g: Record<string, unknown>) => ({
            id: g.id as number,
            title: g.title as string,
            genre: g.genre as string,
            rating: g.rating as number,
            downloads: g.downloads ? Number(g.downloads) : 0,
            image: g.wallpaper_url ? String(g.wallpaper_url) : "",
            color: (g.color as string) || "#3b82f6",
            type: "game" as const
          })),
          ...movies.map((m: Record<string, unknown>) => ({
            id: m.id as number,
            title: m.title as string,
            genre: m.genre as string,
            rating: m.rating as number,
            downloads: m.downloads ? Number(m.downloads) : 0,
            image: m.poster_url ? String(m.poster_url) : "",
            color: (m.color as string) || "#3b82f6",
            type: "movie" as const
          }))
        ].sort((a, b) => b.downloads - a.downloads)
        
        setResults(combined)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [query])

  const visibleResults = results.slice(0, displayCount)
  const hasMore = displayCount < results.length
  const games = visibleResults.filter(r => r.type !== "movie")
  const movies = visibleResults.filter(r => r.type === "movie")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-24 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button>

        {/* Search info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <Search size={24} className="text-blue-400" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Search Results
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50 h-[330px] animate-pulse" />
            ))}
          </div>
        ) : results.length > 0 ? (
          <>
            {games.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold text-white">Games & Software</h2>
                  <span className="text-sm text-zinc-500">({games.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
                  {games.map((game, index) => (
                    <GameCard
                      key={`game-${game.id}`}
                      title={game.title}
                      genre={game.genre}
                      rating={game.rating}
                      downloads={game.downloads}
                      image={game.image}
                      color={game.color}
                      index={index}
                      onClick={() => onGameClick({ id: game.id, title: game.title, genre: game.genre, rating: game.rating, downloads: game.downloads, color: game.color })}
                    />
                  ))}
                </div>
              </>
            )}
            
            {movies.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Film size={20} className="text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Movies</h2>
                  <span className="text-sm text-zinc-500">({movies.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
                  {movies.map((movie, index) => (
                    <MovieCard
                      key={`movie-${movie.id}`}
                      title={movie.title}
                      genre={movie.genre}
                      year={(movie as any).year || 2024}
                      duration={(movie as any).duration || "2h 15m"}
                      rating={movie.rating}
                      image={movie.image}
                      color={movie.color}
                      index={index}
                      movieId={movie.id}
                      onClick={() => onGameClick({ id: movie.id, title: movie.title, genre: movie.genre, rating: movie.rating, downloads: movie.downloads, color: movie.color })}
                    />
                  ))}
                </div>
              </>
            )}

            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setDisplayCount(prev => prev + 12)}
                  className="px-8 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 hover:text-white hover:border-zinc-700/50 transition-all text-sm font-medium"
                >
                  Load More ({results.length - displayCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <Search size={48} className="text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">No results found for "{query}"</p>
            <p className="text-zinc-600 text-sm mt-2">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}