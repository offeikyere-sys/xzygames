import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ArrowLeft } from "lucide-react"
import { apiUrl } from "@/lib/api"
import { GameCard } from "./GameCard"

interface FavoritesPageProps {
  userToken: string
  onBack: () => void
  onGameClick: (game: { id?: number; title: string; genre: string; rating: number; downloads: number; color: string }) => void
}

interface Game {
  id: number
  title: string
  genre: string
  rating: number
  downloads: number
  color: string
  wallpaper_url?: string | null
}

export function FavoritesPage({ userToken, onBack, onGameClick }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFavorites = async () => {
    try {
      const res = await fetch(apiUrl("/api/favorites"), {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (res.ok) {
        const data = await res.json()
        setFavorites(data)
      }
    } catch {
      // If backend is not running, use empty list
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  const handleRemoveFavorite = async (gameId: number) => {
    try {
      const res = await fetch(apiUrl(`/api/favorites/${gameId}`), {
        method: "POST",
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (res.ok) {
        setFavorites(prev => prev.filter(g => g.id !== gameId))
      }
    } catch {
      // silently fail
    }
  }


  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
            <Heart size={20} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">My Favorites</h1>
            <p className="text-sm text-zinc-500">
              {favorites.length} game{favorites.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-72 rounded-2xl bg-zinc-900/30 border border-zinc-800/30 animate-pulse" />
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favorites.map((game, index) => (
              <GameCard
                key={game.id}
                title={game.title}
                genre={game.genre}
                rating={game.rating}
                downloads={game.downloads}
                image={game.wallpaper_url || ""}
                color={game.color}
                index={index}
                showDelete={true}
                onDelete={handleRemoveFavorite}
                onClick={() => onGameClick({ id: game.id, title: game.title, genre: game.genre, rating: game.rating, downloads: game.downloads, color: game.color })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart size={48} className="text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">No favorites yet</p>
            <p className="text-zinc-600 text-sm mt-2">Click the heart icon on any game to save it here</p>
          </div>
        )}
      </div>
    </div>
  )
}