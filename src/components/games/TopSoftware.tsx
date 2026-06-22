import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, ArrowRight, Crown, Medal, Award, Trash2 } from "lucide-react"
import { apiUrl } from "@/lib/api"

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown size={16} className="text-yellow-400" />
  if (rank === 2) return <Medal size={16} className="text-zinc-300" />
  if (rank === 3) return <Award size={16} className="text-amber-600" />
  return <span className="text-sm font-bold text-zinc-500 w-4 text-center">{rank}</span>
}

interface SoftwareInfo {
  id?: number
  title: string
  genre: string
  rating: number
  downloads: number
  color: string
  wallpaper_url?: string | null
  download_links?: string | null
}

interface TopSoftwareProps {
  onSoftwareClick: (soft: SoftwareInfo) => void
  refreshKey?: number
  userToken?: string
  isAdmin?: boolean
  onDeleteSoftware?: (gameId: number) => void
  onViewAll?: () => void
}

export function TopSoftware({ onSoftwareClick, refreshKey, isAdmin, onDeleteSoftware, onViewAll }: TopSoftwareProps) {
  const [software, setSoftware] = useState<SoftwareInfo[]>([])
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetch(apiUrl("/api/games?type=software"))
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) => (b.downloads as number) - (a.downloads as number))
          .slice(0, 5)
          .map((g: Record<string, unknown>) => ({
            id: g.id as number,
            title: g.title as string,
            genre: g.genre as string,
            rating: g.rating as number,
            downloads: g.downloads ? Number(g.downloads) : 0,
            color: (g.color as string) || "#10b981",
            wallpaper_url: g.wallpaper_url as string | undefined,
            download_links: g.download_links as string | undefined,
          }))
        setSoftware(sorted)
      })
      .catch(() => {})
  }, [refreshKey])

  const handleDeleteClick = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation()
    setConfirmDeleteId(gameId)
  }

  const handleConfirmDelete = async () => {
    if (confirmDeleteId && onDeleteSoftware) {
      onDeleteSoftware(confirmDeleteId)
    }
    setConfirmDeleteId(null)
  }

  return (
    <section className="relative py-20 bg-zinc-900/30 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Download size={18} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Top Downloaded Software</h2>
              <p className="text-sm text-zinc-500 mt-0.5">Most popular software this week</p>
            </div>
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 hover:text-emerald-300 transition-all text-sm font-medium"
            >
              View All
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {software.length > 0 ? (
          <div className="space-y-3">
            {software.map((soft, i) => (
              <motion.div
                key={soft.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                onClick={() => onSoftwareClick(soft)}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/30 hover:border-emerald-700/50 hover:bg-zinc-900/50 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${soft.color}15`, border: `1px solid ${soft.color}30` }}>
                  {getRankIcon(i + 1)}
                </div>

                <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden" style={{ backgroundColor: `${soft.color}20` }}>
                  {soft.wallpaper_url ? (
                    <img src={soft.wallpaper_url} alt={soft.title} className="w-full h-full object-cover" />
                  ) : null}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors truncate">{soft.title}</p>
                  <p className="text-xs text-zinc-500">{soft.genre}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-white flex items-center gap-1">
                    <Download size={12} className="text-zinc-500" />
                    {soft.downloads}
                  </p>
                </div>

                {/* Delete button for admin */}
                {isAdmin && soft.id && (
                  <button
                    onClick={(e) => handleDeleteClick(e, soft.id!)}
                    className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-sm">No software available yet</p>
          </div>
        )}
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
            <p className="text-sm text-white font-medium mb-3">Delete this software?</p>
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