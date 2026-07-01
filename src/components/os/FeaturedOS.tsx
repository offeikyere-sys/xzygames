import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { GameCard } from "@/components/games/GameCard"
import { Monitor, ArrowRight, Sparkles } from "lucide-react"
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

interface FeaturedOSProps {
  onOSClick: (os: OSItem) => void
  refreshKey?: number
  userToken?: string
  isAdmin?: boolean
  onDeleteOS?: (id: number) => void
  onViewAll?: () => void
  activeCategory?: string
}

export function FeaturedOS({ onOSClick, refreshKey, isAdmin, onDeleteOS, onViewAll, activeCategory }: FeaturedOSProps) {
  const [allOsItems, setAllOsItems] = useState<OSItem[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

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
        setAllOsItems(items)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [refreshKey])

  // Filter items by activeCategory (genre/version)
  const osItems = useMemo(() => {
    if (!activeCategory || activeCategory === "All") return allOsItems
    const cat = activeCategory.toLowerCase()
    return allOsItems.filter((item) => {
      const fullGenre = `${item.genre} ${item.version}`.toLowerCase()
      return fullGenre.includes(cat)
    })
  }, [allOsItems, activeCategory])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section id="featured-os" className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
              <Monitor size={12} className="text-blue-400" />
              <span className="text-[10px] font-medium text-blue-400">OPERATING SYSTEMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Featured Windows
              </span>
            </h2>
            <p className="text-zinc-500 text-sm mt-1">Download the latest Windows operating systems</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 text-xs font-medium transition-all"
              >
                <Sparkles size={12} />
                View All
                <ArrowRight size={12} />
              </button>
            )}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[260px] h-[280px] rounded-xl bg-zinc-900/50 animate-pulse shrink-0" />
            ))}
          </div>
        ) : osItems.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {osItems.map((item, i) => (
              <div key={item.id || i} className="min-w-[260px] max-w-[260px] snap-start shrink-0">
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
              </div>
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