import { useState, useEffect } from "react"
import { GameCard } from "./GameCard"
import { SimpleCarousel } from "@/components/ui/SimpleCarousel"
import { Monitor, ArrowRight } from "lucide-react"
import { apiUrl } from "@/lib/api"

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

interface FeaturedSoftwareProps {
  onSoftwareClick: (soft: SoftwareInfo) => void
  refreshKey?: number
  userToken?: string
  isAdmin?: boolean
  onDeleteSoftware?: (gameId: number) => void
  onViewAll?: () => void
}

export function FeaturedSoftware({ onSoftwareClick, refreshKey, isAdmin, onDeleteSoftware, onViewAll }: FeaturedSoftwareProps) {
  const [software, setSoftware] = useState<SoftwareInfo[]>([])

  useEffect(() => {
    fetch(apiUrl("/api/games?type=software"))
      .then((res) => res.json())
      .then((data) => {
        setSoftware(data.map((g: Record<string, unknown>) => ({
          id: g.id as number,
          title: g.title as string,
          genre: g.genre as string,
          rating: g.rating as number,
          downloads: g.downloads ? Number(g.downloads) : 0,
          color: (g.color as string) || "#10b981",
          wallpaper_url: g.wallpaper_url as string | undefined,
          download_links: g.download_links as string | undefined,
        })))
      })
      .catch(() => {})
  }, [refreshKey])

  return (
    <section id="featured-software" className="relative py-20 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Monitor size={24} className="text-emerald-400 float-icon" />
            <h2 className="text-2xl font-bold text-white">Featured Software</h2>
          </div>

          <button onClick={onViewAll} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors glow-btn">
            View All <ArrowRight size={14} />
          </button>
        </div>

        {software.length > 0 ? (
          <SimpleCarousel
            items={software}
            cardWidth={300}
            onItemClick={(item) => onSoftwareClick(item)}
            renderCard={(soft, index) => (
              <GameCard
                title={soft.title}
                genre={soft.genre}
                rating={soft.rating}
                downloads={soft.downloads}
                image={soft.wallpaper_url || ""}
                color={soft.color}
                index={index}
                gameId={soft.id}
                onClick={() => onSoftwareClick(soft)}
                showDelete={!!isAdmin}
                onDelete={onDeleteSoftware}
              />
            )}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-sm">No software available yet</p>
          </div>
        )}
      </div>
    </section>
  )
}
