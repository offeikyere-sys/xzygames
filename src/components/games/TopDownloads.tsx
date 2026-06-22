import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Download, TrendingUp, Crown, Medal, Award, Trash2 } from "lucide-react"
import { apiUrl } from "@/lib/api"

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown size={16} className="text-yellow-400" />
  if (rank === 2) return <Medal size={16} className="text-zinc-300" />
  if (rank === 3) return <Award size={16} className="text-amber-600" />
  return <span className="text-sm font-bold text-zinc-500 w-4 text-center">{rank}</span>
}

interface GameInfo {
  id?: number
  title: string
  genre: string
  rating: number
  downloads: number
  color: string
  wallpaper_url?: string | null
  trend?: string
}

interface TopDownloadsProps {
  onGameClick?: (game: GameInfo) => void
  refreshKey?: number
  userToken?: string
  isAdmin?: boolean
  onDeleteGame?: (gameId: number) => void
  onViewAll?: () => void
}

export function TopDownloads({ onGameClick, refreshKey, isAdmin, onDeleteGame, onViewAll }: TopDownloadsProps) {
  const [topGames, setTopGames] = useState<GameInfo[]>([])
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetch(apiUrl("/api/games?type=game"))
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) => (b.downloads as number) - (a.downloads as number))
          .slice(0, 5)
          .map((g: Record<string, unknown>, i: number) => ({
            id: g.id as number,
            rank: i + 1,
            title: g.title as string,
            genre: g.genre as string,
            downloads: g.downloads ? Number(g.downloads) : 0,
            trend: `+${Math.floor(Math.random() * 25 + 5)}%`,
            color: (g.color as string) || "#3b82f6",
            rating: g.rating as number,
            wallpaper_url: g.wallpaper_url as string | undefined,
          }))
        setTopGames(sorted)
      })
      .catch(() => {})
  }, [refreshKey])

  const handleDeleteClick = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation()
    setConfirmDeleteId(gameId)
  }

  const handleConfirmDelete = async () => {
    if (confirmDeleteId && onDeleteGame) {
      onDeleteGame(confirmDeleteId)
    }
    setConfirmDeleteId(null)
  }

  return (
    <section className="relative py-20 bg-black">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy size={24} className="text-yellow-400 float-icon" />
            <h2 className="text-2xl font-bold text-white">Top Downloads</h2>
          </div>
          <button onClick={onViewAll} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors glow-btn">
            View All <TrendingUp size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {topGames.length > 0 ? (
            topGames.map((game, i) => (
              <motion.div
                key={game.id || i}
                initial={{ opacity: 0, rotateX: 10, y: 30, perspective: 800 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0, perspective: 800 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                style={{ perspective: 800, transformStyle: "preserve-3d" }}
                onClick={() => onGameClick?.(game)}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/30 hover:border-zinc-700/50 hover:bg-zinc-900/50 transition-all cursor-pointer group holo-card"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${game.color}15`, border: `1px solid ${game.color}30` }}>
                  {getRankIcon(i + 1)}
                </div>

                <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden" style={{ backgroundColor: `${game.color}20` }}>
                  {game.wallpaper_url ? (
                    <img src={game.wallpaper_url} alt={game.title} className="w-full h-full object-cover" />
                  ) : null}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors truncate holo-title">{game.title}</p>
                  <p className="text-xs text-zinc-500">{game.genre}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-white flex items-center gap-1">
                    <Download size={12} className="text-zinc-500" />
                    {game.downloads}
                  </p>
                  <p className="text-xs text-emerald-400">{game.trend}</p>
                </div>

                {/* Delete button for admin */}
                {isAdmin && game.id && (
                  <button
                    onClick={(e) => handleDeleteClick(e, game.id!)}
                    className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-500 text-sm">No games yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {confirmDeleteId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="bg-zinc-900 border border-zinc-700/50 rounded-xl p-6 max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-white font-medium mb-3">Delete this game?</p>
            <p className="text-xs text-zinc-400 mb-4">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2 rounded-lg border border-zinc-700/50 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}