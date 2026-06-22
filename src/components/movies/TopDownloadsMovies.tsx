import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movies/MovieCard"
import { SimpleCarousel } from "@/components/ui/SimpleCarousel"
import { Download, ArrowRight } from "lucide-react"
import { apiUrl } from "@/lib/api"

interface MovieInfo {
  id?: number
  title: string
  genre: string
  rating: number
  downloads: number
  color: string
  year: number
  duration: string
  poster_url?: string | null
}

interface TopDownloadsMoviesProps {
  onMovieClick: (movie: MovieInfo) => void
  refreshKey?: number
  userToken?: string
  isAdmin?: boolean
  onDeleteMovie?: (movieId: number) => void
  onEditMovie?: (movie: any) => void
  onViewAll?: () => void
}

export function TopDownloadsMovies({ onMovieClick, refreshKey, isAdmin, onDeleteMovie, onEditMovie, onViewAll }: TopDownloadsMoviesProps) {
  const [movies, setMovies] = useState<MovieInfo[]>([])

  useEffect(() => {
    fetch(apiUrl("/api/movies?type=movie"))
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: any, b: any) => (b.downloads || 0) - (a.downloads || 0))
        setMovies(sorted.map((m: Record<string, unknown>) => ({
          id: m.id as number,
          title: m.title as string,
          genre: m.genre as string,
          rating: m.rating as number,
          downloads: m.downloads ? Number(m.downloads) : 0,
          color: (m.color as string) || "#3b82f6",
          year: (m.year as number) || 2024,
          duration: (m.duration as string) || "2h 15m",
          poster_url: m.poster_url as string | undefined,
        })))
      })
      .catch(() => {})
  }, [refreshKey])

  return (
    <section id="top-downloads-movies" className="py-20 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Download size={24} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Top Downloaded Movies</h2>
              <p className="text-sm text-zinc-400 mt-1">Most popular downloads this month</p>
            </div>
          </div>

          {onViewAll && (
            <button
              onClick={onViewAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-700/50 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
            >
              View All
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {movies.length > 0 ? (
          <SimpleCarousel
            items={movies}
            cardWidth={280}
            onItemClick={(item) => onMovieClick(item)}
            renderCard={(movie, index) => (
              <MovieCard
                title={movie.title}
                genre={movie.genre}
                year={movie.year}
                duration={movie.duration}
                rating={movie.rating}
                image={movie.poster_url || ""}
                color={movie.color}
                index={index}
                movieId={movie.id}
                onClick={() => onMovieClick(movie)}
                showDelete={!!isAdmin}
                onDelete={onDeleteMovie}
                onEdit={onEditMovie}
              />
            )}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500">No movies found</p>
          </div>
        )}
      </div>
    </section>
  )
}
