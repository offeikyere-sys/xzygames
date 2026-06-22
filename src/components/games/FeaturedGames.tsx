import { useState, useEffect } from "react"
import { GameCard } from "./GameCard"
import { SimpleCarousel } from "@/components/ui/SimpleCarousel"
import { Flame, ArrowRight } from "lucide-react"
import { apiUrl } from "@/lib/api"

interface GameInfo {
  id?: number
  title: string
  genre: string
  rating: number
  downloads: number
  color: string
  wallpaper_url?: string | null
  download_links?: string | null
}

interface FeaturedGamesProps {
  activeCategory: string
  onGameClick: (game: GameInfo) => void
  refreshKey?: number
  userToken?: string
  isAdmin?: boolean
  onDeleteGame?: (gameId: number) => void
  onViewAll?: () => void
}

export function FeaturedGames({ activeCategory, onGameClick, refreshKey, isAdmin, onDeleteGame, onViewAll }: FeaturedGamesProps) {
  const [games, setGames] = useState<GameInfo[]>([])

  useEffect(() => {
    fetch(apiUrl("/api/games?type=game"))
      .then((res) => res.json())
      .then((data) => {
        setGames(data.map((g: Record<string, unknown>) => ({
          id: g.id as number,
          title: g.title as string,
          genre: g.genre as string,
          rating: g.rating as number,
          downloads: g.downloads ? Number(g.downloads) : 0,
          color: (g.color as string) || "#3b82f6",
          wallpaper_url: g.wallpaper_url as string | undefined,
          download_links: g.download_links as string | undefined,
        })))
      })
      .catch(() => {})
  }, [refreshKey])

  const filteredGames =
    activeCategory === "All"
      ? games
      : games.filter((g) => g.genre.includes(activeCategory))

  return (
    <section id="featured-games" className="relative py-20 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Flame size={24} className="text-orange-500 float-icon" />
            <h2 className="text-2xl font-bold text-white">Featured Games</h2>
          </div>

          <button onClick={onViewAll} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors glow-btn">
            View All <ArrowRight size={14} />
          </button>
        </div>

        {filteredGames.length > 0 ? (
          <SimpleCarousel
            items={filteredGames}
            cardWidth={300}
            onItemClick={(item) => onGameClick(item)}
            renderCard={(game, index) => (
              <GameCard
                title={game.title}
                genre={game.genre}
                rating={game.rating}
                downloads={game.downloads}
                image={game.wallpaper_url || ""}
                color={game.color}
                index={index}
                gameId={game.id}
                onClick={() => onGameClick(game)}
                showDelete={!!isAdmin}
                onDelete={onDeleteGame}
              />
            )}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-sm">No games found in this category</p>
          </div>
        )}
      </div>
    </section>
  )
}
