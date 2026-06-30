import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Play, Star, Clock, Download, Share2, Heart, Calendar, Film, User, MessageCircle, Edit3, Trash2 } from "lucide-react"
import { BlurImage } from "@/components/ui/BlurImage"
import { apiUrl, logActivity } from "@/lib/api"
import { TrailerModal } from "@/components/ui/TrailerModal"

interface MovieDetailPageProps {
  movieId: number
  onBack: () => void
  userToken?: string
  isAdmin?: boolean
  onDeleteMovie?: (movieId: number) => void
  onEditMovie?: (movie: any) => void
}

export function MovieDetailPage({ movieId, onBack, userToken, isAdmin, onDeleteMovie, onEditMovie }: MovieDetailPageProps) {
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")
  const [submittingComment, setSubmittingComment] = useState(false)
  const [detailRefreshKey] = useState(0)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch(apiUrl(`/api/movies/${movieId}`))
      .then((res) => res.json())
      .then((data) => {
        setMovie(data)
        setComments(data.comments || [])
        setLoading(false)
        logActivity("viewed", "movie", data.title || "Unknown", movieId)
      })
      .catch(() => setLoading(false))
  }, [movieId, detailRefreshKey])

  const handleDownload = () => {
    if (movie?.download_links) {
      const links = movie.download_links.split("\n").filter((l: string) => l.trim())
      if (links.length > 0) {
        window.open(links[0], "_blank")
      }
    }
  }

  const handleShare = async () => {
    if (navigator.share && movie) {
      try {
        await navigator.share({
          title: movie.title,
          text: `Check out ${movie.title}`,
          url: window.location.href,
        })
      } catch {}
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !userToken) return

    setSubmittingComment(true)
    try {
      const res = await fetch(apiUrl("/api/comments"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ text: newComment.trim(), game_id: movieId }),
      })
      if (res.ok) {
        setNewComment("")
        fetch(apiUrl(`/api/movies/${movieId}`))
          .then((res) => res.json())
          .then((data) => setComments(data.comments || []))
      }
    } catch {}
    setSubmittingComment(false)
  }

  const handleEditClick = () => {
    if (movie && onEditMovie) {
      onEditMovie({
        id: movie.id,
        title: movie.title,
        genre: movie.genre,
        year: movie.year,
        duration: movie.duration,
        rating: movie.rating,
        color: movie.color,
        director: movie.director || "",
        cast: movie.cast || "",
        description: movie.description || "",
        download_links: movie.download_links || "",
        poster_url: movie.poster_url || "",
        trailer_url: movie.trailer_url || "",
        screenshots: movie.screenshots || "",
        type: "movie",
      })
    }
  }

  const handleDelete = async () => {
    if (!movieId || !userToken || !onDeleteMovie) return
    setDeleting(true)
    try {
      const res = await fetch(apiUrl(`/api/movies/${movieId}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (res.ok) {
        setDeleteConfirmOpen(false)
        onBack()
      }
    } catch {}
    setDeleting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-400">Movie not found</p>
      </div>
    )
  }

  const screenshots = movie.screenshots?.split("\n").filter((s: string) => s.trim()) || []
  const downloadLinks = movie.download_links?.split("\n").filter((l: string) => l.trim()) || []

  return (
    <div className="min-h-screen bg-black">
      {/* Backdrop */}
      {movie.backdrop_url && (
        <div className="fixed inset-0 z-0">
          <BlurImage
            src={movie.backdrop_url}
            alt={movie.title}
            className="w-full h-full object-cover opacity-30"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all mb-8"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Poster */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <div className="aspect-[2/3] rounded-2xl overflow-hidden border-2 border-zinc-700/50 shadow-2xl">
                {movie.poster_url ? (
                  <BlurImage
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    wrapperClassName="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                    <Film size={64} className="text-zinc-600" />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 space-y-3">
                {movie.trailer_url && (
                  <button
                    onClick={() => setTrailerOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-all"
                  >
                    <Play size={18} />
                    Watch Trailer
                  </button>
                )}

                {downloadLinks.length > 0 && (
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all"
                  >
                    <Download size={18} />
                    Download Now
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700/50 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all text-sm"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700/50 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all text-sm">
                    <Heart size={16} />
                    Favorite
                  </button>
                </div>

                {/* Admin buttons */}
                {isAdmin && (
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={handleEditClick}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30 hover:text-purple-300 transition-all text-sm"
                    >
                      <Edit3 size={16} />
                      Edit Movie
                    </button>
                    <button
                      onClick={() => setDeleteConfirmOpen(true)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 hover:text-red-300 transition-all text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Title and basic info */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-bold">{movie.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Film size={16} />
                  <span className="px-2 py-0.5 rounded-lg bg-zinc-800/50 border border-zinc-700/30">{movie.genre}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {movie.description && (
              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-300 leading-relaxed">{movie.description}</p>
              </div>
            )}

            {/* Director and Cast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {movie.director && (
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-blue-400" />
                    <span className="text-xs font-medium text-zinc-400">Director</span>
                  </div>
                  <p className="text-sm text-white font-medium">{movie.director}</p>
                </div>
              )}
              {movie.cast && (
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-purple-400" />
                    <span className="text-xs font-medium text-zinc-400">Cast</span>
                  </div>
                  <p className="text-sm text-white font-medium">{movie.cast}</p>
                </div>
              )}
            </div>

            {/* Download Links */}
            {downloadLinks.length > 0 && (
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Download size={18} />
                  Download Links
                </h2>
                <div className="space-y-2">
                  {downloadLinks.map((link: string, i: number) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:border-purple-500/30 hover:bg-zinc-800/50 transition-all group"
                    >
                      <Download size={14} className="text-purple-400" />
                      <span className="text-sm text-white truncate group-hover:text-purple-400 transition-colors">
                        Part {i + 1}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {screenshots.map((screenshot: string, i: number) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-zinc-800/50">
                      <BlurImage
                        src={screenshot}
                        alt={`Screenshot ${i + 1}`}
                        className="w-full h-48 object-cover"
                        wrapperClassName="w-full h-48"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle size={20} />
                Comments ({comments.length})
              </h2>

              {userToken && (
                <form onSubmit={handleComment} className="mb-6">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/30 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500/40"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim() || submittingComment}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all disabled:opacity-50"
                    >
                      Post
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {comments.map((comment: any) => (
                  <div key={comment.id} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ background: comment.avatar_color || "#a855f7" }}
                        >
                          {comment.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{comment.name}</p>
                          <p className="text-xs text-zinc-500">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={async () => {
                            try {
                              await fetch(apiUrl(`/api/admin/comments/${comment.id}`), {
                                method: "DELETE",
                                headers: { Authorization: `Bearer ${userToken}` },
                              })
                              setComments((prev: any[]) => prev.filter((c: any) => c.id !== comment.id))
                            } catch {}
                          }}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Delete comment"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-zinc-300">{comment.text}</p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-sm text-zinc-500 text-center py-8">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        title={movie.title}
        videoUrl={movie.trailer_url}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setDeleteConfirmOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-sm bg-zinc-900/95 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white mb-2">Delete Movie</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{movie.title}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-700/50 text-zinc-300 hover:text-white hover:bg-zinc-800 text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-zinc-700 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}