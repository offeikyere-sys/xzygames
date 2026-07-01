import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { GameCard } from "@/components/games/GameCard"
import { Monitor, ArrowRight, Sparkles, Trophy } from "lucide-react"
import { apiUrl } from "@/lib/api"

interface OSItem {
  id?: number
  title: string
  version: string
  genre: string
  rating: number
  downloads: number
  color: string
  wallpaper_url?: string | null
}

interface TopOSProps {
  onOSClick: (os: OSItem) => void
  refreshKey?: number
  userToken?: string
  isAdmin?: boolean
  onDeleteOS?: (id: number) => void
  onViewAll?: () => void
  activeCategory?: string
}

export function TopOS({ onOSClick, refreshKey, isAdmin, onDeleteOS, onViewAll, activeCategory }: TopOSProps) {
  const [allOsItems, setAllOsItems] = useState<OSItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(apiUrl("/api/os"))
      .then((r) => r.json())
      .then((data) => {
        const items: OSItem[] = (data || []).map((g: Record<string, unknown>) => ({
          id: g.id as number,
          title: g.title as string,
          version: g.version as string,
          genre: g.genre as string,
          rating: g.rating as number,
          downloads: g.downloads ? Number(g.downloads) : 0,
          color: (g.color as string) || "#0078d4",
          wallpaper_url: g.wallpaper_url as string | undefined,
        }))
        // Sort by downloads descending
        setAllOsItems(items)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [refreshKey])

  // Filter items by activeCategory (genre/version)
  const osItems = useMemo(() => {
    let items = allOsItems
    if (activeCategory && activeCategory !== "All") {
      const cat = activeCategory.toLowerCase()
      items = items.filter((item) => {
        const fullGenre = `${item.genre} ${item.version}`.toLowerCase()
        return fullGenre.includes(cat)
      })
    }
    return items.sort((a, b) => b.downloads - a.downloads).slice(0, 8)
  }, [allOsItems, activeCategory])

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
              <Trophy size={12} className="text-cyan-400" />
              <span className="text-[10px] font-medium text-cyan-400">TOP DOWNLOADS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                Most Downloaded
              </span>
            </h2>
            <p className="text-zinc-500 text-sm mt-1">Popular Windows operating systems</p>
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-600/30 text-xs font-medium transition-all"
            >
              <Sparkles size={12} />
              View All
              <ArrowRight size={12} />
            </button>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[280px] rounded-xl bg-zinc-900/50 animate-pulse" />
            ))}
          </div>
        ) : osItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {osItems.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <GameCard
                  title={item.title}
                  genre={`${item.genre} ${item.version}`}
                  rating={item.rating}
                  downloads={item.downloads}
                  image={item.wallpaper_url || ""}
                  color={item.color}
                  index={i}
                  gameId={item.id}
                  onClick={() => onOSClick(item)}
                  showDelete={!!isAdmin}
                  onDelete={onDeleteOS}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Monitor size={48} className="mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-500 text-sm">No operating systems available yet</p>
          </div>
        )}
      </div>
    </section>
  )
}