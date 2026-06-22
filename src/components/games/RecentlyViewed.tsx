import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GameCard } from "./GameCard"
import { History, Trash2 } from "lucide-react"
import { getRecentItems } from "@/lib/recentItems"

interface GameInfo {
  id?: number
  title: string
  genre: string
  rating: number
  downloads: number
  color: string
  wallpaper_url?: string | null
  _type?: "game" | "software"
}

interface RecentlyViewedProps {
  onGameClick: (game: GameInfo) => void
  isAdmin?: boolean
  onDeleteGame?: (gameId: number) => void
  refreshKey?: number
}

export function RecentlyViewed({ onGameClick, isAdmin, onDeleteGame, refreshKey }: RecentlyViewedProps) {
  const [items, setItems] = useState<GameInfo[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setItems(getRecentItems())
  }, [refreshKey])

  const handleClear = () => {
    try {
      localStorage.removeItem("xzy-recent")
    } catch {}
    setItems([])
  }

  if (items.length === 0) return null

  const displayItems = showAll ? items : items.slice(0, 6)

  return (
    <section className="relative py-16 bg-black overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <History size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Recently Viewed</h2>
              <p className="text-sm text-zinc-500 mt-0.5">Continue where you left off</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 6 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {showAll ? "Show Less" : `View All (${items.length})`}
              </button>
            )}
            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400 transition-colors"
            >
              <Trash2 size={12} /> Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {displayItems.map((item, i) => (
            <motion.div
              key={`${item._type}-${item.id || item.title}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}