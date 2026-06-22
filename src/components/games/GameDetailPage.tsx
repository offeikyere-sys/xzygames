import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SplineScene } from "@/components/ui/splite"
import {
  ArrowLeft, Download, Star, Monitor, Cpu, HardDrive, MemoryStick,
  Shield, MessageSquare, Clock, Users, Share2, Heart, Link, Play, Trash2, Edit, ChevronDown, ChevronUp, Package, DownloadCloud
} from "lucide-react"
import { StarRating } from "@/components/ui/StarRating"
import { TrailerModal } from "@/components/ui/TrailerModal"
import { EditGameModal } from "@/components/admin/EditGameModal"
import { ImageGallery } from "@/components/ui/ImageGallery"
import { BlurImage } from "@/components/ui/BlurImage"
import { GameCard } from "./GameCard"
import { apiUrl, logActivity } from "@/lib/api"
import { isVideoUrl } from "@/lib/media"

// Track download click to increment counter
const trackDownload = async (gameId?: number, gameTitle?: string) => {
  if (!gameId) return
  try {
    await fetch(apiUrl(`/api/games/${gameId}/download`), { method: "POST" })
    logActivity("downloaded", "game", gameTitle || "Unknown", gameId)
  } catch {
    // silently fail - download tracking shouldn't block navigation
  }
}

interface GameDetailPageProps {
  game: {
    id?: number
    title: string
    genre: string
    rating: number
    downloads: number
    color: string
  }
  onBack: () => void
  onGameClick?: (game: { id?: number; title: string; genre: string; rating: number; downloads: number; color: string }) => void
  userToken?: string
  isAdmin?: boolean
}


export function GameDetailPage({ game, onBack, onGameClick, userToken, isAdmin }: GameDetailPageProps) {
  const [downloadLinks, setDownloadLinks] = useState<string[]>([])
  const [relatedItems, setRelatedItems] = useState<Array<{id?: number; title: string; genre: string; rating: number; downloads: number; color: string; wallpaper_url?: string | null}>>([])
  const [screenshots, setScreenshots] = useState<string[]>([])
  const [bannerUrl, setBannerUrl] = useState("")
  const [trailerUrl, setTrailerUrl] = useState("")
  const [description, setDescription] = useState("")
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [hypervisorVideoOpen, setHypervisorVideoOpen] = useState(false)
  const [hypervisorVideoUrl, setHypervisorVideoUrl] = useState("")
  const [installGuideText, setInstallGuideText] = useState("")
  const [installVideoUrl, setInstallVideoUrl] = useState("")
  const [installGuideOpen, setInstallGuideOpen] = useState(false)
  const [installVideoOpen, setInstallVideoOpen] = useState(false)
  const [repackOpen, setRepackOpen] = useState(false)
  const [usageGuideOpen, setUsageGuideOpen] = useState(false)
  const [troubleshootingOpen, setTroubleshootingOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [fullGameData, setFullGameData] = useState<Record<string, unknown> | null>(null)
  const [detailRefreshKey, setDetailRefreshKey] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [postingComment, setPostingComment] = useState(false)
  const [realComments, setRealComments] = useState<Array<{id: number; text: string; created_at: string; name: string}>>([])
  const [_loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [dynamicRating, setDynamicRating] = useState(game.rating)

  useEffect(() => {
    if (game.id) {
      // Log view activity
      logActivity("viewed", game.genre?.toLowerCase().includes("software") ? "software" : "game", game.title, game.id)
      
      setLoading(true)
      fetch(apiUrl(`/api/games/${game.id}`))
        .then((res) => res.json())
        .then((data) => {
          if (data.download_links) {
            setDownloadLinks(data.download_links.split("\n").filter((l: string) => l.trim()))
          }
          if (data.wallpaper_url) {
            setBannerUrl(data.wallpaper_url)
          }
          if (data.screenshots) {
            setScreenshots(data.screenshots.split("\n").filter((l: string) => l.trim()))
          }
          if (data.trailer_url) {
            setTrailerUrl(data.trailer_url)
          }
          if (data.hypervisor_video_url) {
            setHypervisorVideoUrl(data.hypervisor_video_url)
          }
          if (data.install_guide_text) {
            setInstallGuideText(data.install_guide_text)
          }
          if (data.install_video_url) {
            setInstallVideoUrl(data.install_video_url)
          }
          if (data.description) {
            setDescription(data.description)
          }
          // Use Bayesian rating from API (dynamically updated as community rates)
          if (data.avg_rating) {
            setDynamicRating(data.avg_rating)
          }
          setFullGameData(data)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [game.id, detailRefreshKey])

  // Fetch real comments
  useEffect(() => {
    if (game.id) {
      fetch(apiUrl(`/api/comments/${game.id}`))
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setRealComments(data.map((c: Record<string, unknown>) => ({
              id: c.id as number,
              text: c.text as string,
              created_at: c.created_at as string,
              name: c.name as string,
            })))
          }
        })
        .catch(() => {})
    }
  }, [game.id, detailRefreshKey])

  // Check if favorited
  useEffect(() => {
    if (game.id && userToken) {
      fetch(apiUrl("/api/favorites"), {
        headers: { Authorization: `Bearer ${userToken}` },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setIsFavorited(data.some((g: Record<string, unknown>) => g.id === game.id))
          }
        })
        .catch(() => {})
    }
  }, [game.id, userToken, detailRefreshKey])

  const handleRate = async (rating: number) => {
    if (!game.id || !userToken) return
    setUserRating(rating)
    try {
      await fetch(apiUrl("/api/ratings"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
        body: JSON.stringify({ rating, game_id: game.id }),
      })
    } catch {
      // silently fail
    }
  }

  // Fetch related items (same genre, different game)
  useEffect(() => {
    const genre = game.genre.split(",")[0].trim()
    if (!genre || genre === "All") return
    fetch(apiUrl(`/api/games/search?q=${encodeURIComponent(genre)}`))
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return
        const filtered = data
          .filter((g: Record<string, unknown>) => g.id !== game.id)
          .slice(0, 4)
          .map((g: Record<string, unknown>) => ({
            id: g.id as number,
            title: g.title as string,
            genre: g.genre as string,
            rating: g.rating as number,
            downloads: g.downloads ? Number(g.downloads) : 0,
            color: (g.color as string) || "#3b82f6",
            wallpaper_url: g.wallpaper_url as string | undefined,
          }))
        setRelatedItems(filtered)
      })
      .catch(() => {})
  }, [game.id, game.genre])

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (trailerOpen || editModalOpen || deleteConfirmOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [trailerOpen, editModalOpen, deleteConfirmOpen])

  const displayScreenshots = screenshots.length > 0 ? screenshots : null
  const isSoftware = (fullGameData?.type as string) === "software"
  const repackString = String(fullGameData?.repack_features ?? '')
  const guideString = String(fullGameData?.usage_guide ?? '')
  const troubleshootString = String(fullGameData?.troubleshooting ?? '')

  const handleGameEdited = () => {
    setDetailRefreshKey(k => k + 1)
    setEditModalOpen(false)
  }

  const handleToggleFavorite = async () => {
    if (!game.id || !userToken) return
    try {
      const res = await fetch(apiUrl(`/api/favorites/${game.id}`), {
        method: "POST",
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (res.ok) {
        const data = await res.json()
        setIsFavorited(data.favorited)
      }
    } catch {
      // silently fail
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
    } catch {
      // fallback
      const textarea = document.createElement("textarea")
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      alert("Link copied to clipboard!")
    }
  }

  const handlePostComment = async () => {
    if (!commentText.trim() || !game.id || !userToken) return
    setPostingComment(true)
    try {
      const res = await fetch(apiUrl("/api/comments"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
        body: JSON.stringify({ text: commentText.trim(), game_id: game.id }),
      })
      if (res.ok) {
        setCommentText("")
        setDetailRefreshKey(k => k + 1)
      }
    } catch {
      // silently fail
    } finally {
      setPostingComment(false)
    }
  }

  const handleDelete = async () => {
    if (!game.id || !userToken) return
    setDeleting(true)
    setDeleteError("")
    try {
      const res = await fetch(apiUrl(`/api/games/${game.id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (!res.ok) {
        const data = await res.json()
        setDeleteError(data.detail || "Failed to delete game")
        return
      }
      setDeleteConfirmOpen(false)
      onBack()
    } catch {
      setDeleteError("Backend not running")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      {/* Banner - Supports image & video (live wallpaper) */}
      <div className="relative h-[70vh] min-h-[550px] overflow-hidden">
        {bannerUrl ? (
          <>
            {isVideoUrl(bannerUrl) ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={bannerUrl} />
              </video>
            ) : (
              <img
                src={bannerUrl}
                alt={game.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0" style={{
            background: `linear-gradient(135deg, ${game.color}40, ${game.color}10, #000000cc)`
          }} />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />


        {/* 3D Robot subtle in banner */}
        <div className="absolute top-0 right-0 w-[400px] h-full opacity-15">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute top-28 left-4 z-10">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-zinc-700/50 text-sm text-zinc-300 hover:text-white hover:bg-black/80 transition-all glow-btn"
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-3 mb-3">
                {game.genre.split(",").map((g: string) => g.trim()).filter(Boolean).map((g: string, i: number) => (
                  <span key={i} className="px-2 py-1 rounded text-[10px] font-medium bg-zinc-800/80 text-zinc-300 backdrop-blur-sm">{g}</span>
                ))}
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-yellow-400 font-medium">{dynamicRating}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Users size={12} />
                  <span className="text-xs">{game.downloads} downloads</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white">{game.title}</h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Action buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => {
                  document.getElementById("download-links-section")?.scrollIntoView({ behavior: "smooth" })
                }}
                disabled={downloadLinks.length === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg game-accent-bg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                style={{ backgroundColor: game.color, boxShadow: `0 4px 14px ${game.color}40` }}
              >
                <Download size={18} />
                {downloadLinks.length > 0 ? "Download Now" : "No Links Available"}
              </button>
              {trailerUrl && (
                <button
                  onClick={() => setTrailerOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700/50 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all"
                >
                  <Play size={18} />
                  Watch Trailer
                </button>
              )}
              {userToken && (
                <button
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-xl border transition-all ${
                    isFavorited
                      ? "bg-red-500/10 border-red-500/30 text-red-400"
                      : "border-zinc-700/50 text-zinc-400 hover:text-red-400 hover:border-red-500/30"
                  }`}
                >
                  <Heart size={18} className={isFavorited ? "fill-red-400" : ""} />
                </button>
              )}
              <button
                onClick={handleShare}
                className="p-3 rounded-xl border border-zinc-700/50 text-zinc-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"
              >
                <Share2 size={18} />
              </button>
              {isAdmin && (
                <>
                  <button
                    onClick={() => setEditModalOpen(true)}
                    className="p-3 rounded-xl border border-zinc-700/50 text-zinc-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"
                    title={isSoftware ? "Edit Software" : "Edit Game"}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmOpen(true)}
                    className="p-3 rounded-xl border border-zinc-700/50 text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-all"
                    title={isSoftware ? "Delete Software" : "Delete Game"}
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-3">{isSoftware ? "About" : "About the Game"}</h2>
              <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
                {description || `${game.title} is an epic ${game.genre.toLowerCase()} experience that pushes the boundaries of gaming.`}
              </p>
            </motion.div>

            {/* Repack Features (collapsible) */}
            {repackString !== '' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.51 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setRepackOpen(!repackOpen)}
                  className="w-full flex items-center justify-between p-6 hover:bg-zinc-800/20 transition-colors"
                >
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Package size={18} className="text-blue-400" />
                    {isSoftware ? "Features" : "Repack Features"}
                  </h2>
                  {repackOpen ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
                </button>
                <AnimatePresence>
                  {repackOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-6">
                        <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{repackString}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Recommended Download Manager - always shows Internet Download Manager */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.515 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <DownloadCloud size={18} className="text-green-400" />
                Recommended Downloader
              </h2>
              <button
                onClick={() => {
                  window.open("https://download2338.mediafire.com/sp7tyl0ibergPA7V8Fkj82eQXKgjHt9N-LdzjW0YSuXPSSHJmG0xnOZ046DGCL6LnIMT65WivTxqWlxNwUBQqhj6giiq9VHa0LefMLcWJKvtxC43u4uMotWM3BG-WhBMvjYsvrof9WfXWb6ZnSPVDaEsd20G3-dFDRQctFOAG422t-4/hpz3rrch6lcd1qp/Internet+Download+Manager+6.42+Build+64.rar", "_blank")
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30 hover:text-green-300 transition-all text-sm font-medium"
              >
                <Download size={16} />
                Internet Download Manager (IDM) 6.42.64
              </button>
              <p className="text-xs text-zinc-500 mt-2">Get the fastest download manager to accelerate your downloads.</p>
            </motion.div>

            {/* Hypervisor Usage Guide (collapsible) */}
            {guideString !== '' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setUsageGuideOpen(!usageGuideOpen)}
                  className="w-full flex items-center justify-between p-6 hover:bg-zinc-800/20 transition-colors"
                >
                  <h2 className="text-lg font-semibold text-white">How to Use Hypervisor</h2>
                  {usageGuideOpen ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
                </button>
                <AnimatePresence>
                  {usageGuideOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-6">
                        <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{guideString}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Hypervisor Troubleshooting (collapsible) */}
            {troubleshootString !== '' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.53 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setTroubleshootingOpen(!troubleshootingOpen)}
                  className="w-full flex items-center justify-between p-6 hover:bg-zinc-800/20 transition-colors"
                >
                  <h2 className="text-lg font-semibold text-white">Troubleshooting</h2>
                  {troubleshootingOpen ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
                </button>
                <AnimatePresence>
                  {troubleshootingOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-6">
                        <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{troubleshootString}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Hypervisor Video Guide */}
            {hypervisorVideoUrl && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.535 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-3">Hypervisor Video Guide</h2>
                <p className="text-sm text-zinc-400 mb-4">Watch this video walkthrough to learn how to set up and use Hypervisor for this game.</p>
                <button
                  onClick={() => setHypervisorVideoOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30 hover:text-purple-300 transition-all text-sm font-medium"
                >
                  <Play size={16} />
                  Watch Hypervisor Guide
                </button>
              </motion.div>
            )}

            {/* Download Links */}
            {downloadLinks.length > 0 && (
              <motion.div id="download-links-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Link size={18} />
                  {isSoftware ? "Download" : `Download Links (${downloadLinks.length} parts)`}
                </h2>
                <p className="text-xs text-zinc-500 mb-3">{isSoftware ? "Click to download the software." : "Download all parts to get the full game."}</p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {downloadLinks.map((link, idx) => (
                    <a key={idx} href={link} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackDownload(game.id)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:border-blue-500/30 hover:bg-zinc-800/50 transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <Download size={14} className="text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate group-hover:text-blue-400 transition-colors">Part {idx + 1}</p>
                        <p className="text-[10px] text-zinc-500 truncate">{link}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Screenshots */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <h2 className="text-lg font-semibold text-white mb-3">Screenshots</h2>
              <div className="grid grid-cols-2 gap-3">
                {displayScreenshots ? (
                  displayScreenshots.map((url, i) => (
                    <div
                      key={i}
                      className="h-40 rounded-xl overflow-hidden border border-zinc-800/30 cursor-pointer hover:border-blue-500/30 transition-all"
                      onClick={() => { setGalleryIndex(i); setGalleryOpen(true) }}
                    >
                      <BlurImage src={url} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  [0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-40 rounded-xl border border-zinc-800/30 overflow-hidden" style={{ background: `linear-gradient(135deg, ${game.color}15, ${game.color}05)` }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-zinc-700 text-xs">Screenshot {i + 1}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* How to Install */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl overflow-hidden">
              <button
                onClick={() => setInstallGuideOpen(!installGuideOpen)}
                className="w-full flex items-center justify-between p-6 hover:bg-zinc-800/20 transition-colors"
              >
                <h2 className="text-lg font-semibold text-white">How to Install</h2>
                {installGuideOpen ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
              </button>
              <AnimatePresence>
                {installGuideOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="space-y-3">
                        {(installGuideText ? installGuideText.split("\n").filter(l => l.trim()) : [
                          "Click each download link above to download all parts.",
                          "Once all parts are downloaded, locate them in your Downloads folder.",
                          "Extract Part 01 using WinRAR, 7-Zip, or any extraction tool.",
                          "Run the installer (.exe) file as Administrator.",
                          "Follow the installation wizard to complete setup.",
                          "Launch the game from your desktop shortcut or Start Menu.",
                        ]).map((step, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[10px] font-bold text-blue-400">{i + 1}</span>
                            </div>
                            <p className="text-sm text-zinc-400">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Install Video Guide */}
            {installVideoUrl && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.71 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-3">Installation Video Guide</h2>
                <p className="text-sm text-zinc-400 mb-4">Watch this video walkthrough to learn how to install this {isSoftware ? "software" : "game"}.</p>
                <button
                  onClick={() => setInstallVideoOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 transition-all text-sm font-medium"
                >
                  <Play size={16} />
                  Watch Install Guide
                </button>
              </motion.div>
            )}

            {/* Rate */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-3">Rate This {isSoftware ? "Software" : "Game"}</h2>
            <StarRating size={24} initialRating={userRating} onRate={handleRate} />
            </motion.div>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">Similar Items</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedItems.map((item, _i) => (
              <GameCard
                key={item.id || _i}
                title={item.title}
                genre={item.genre}
                rating={item.rating}
                downloads={item.downloads}
                image={item.wallpaper_url || ""}
                color={item.color}
                index={_i}
                gameId={item.id}
                onClick={() => onGameClick?.({
                  id: item.id,
                  title: item.title,
                  genre: item.genre,
                  rating: item.rating,
                  downloads: item.downloads,
                  color: item.color,
                })}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Comments */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><MessageSquare size={18} /> Comments & Reviews</h2>
              {userToken && (
                <div className="bg-zinc-900/30 border border-zinc-800/30 rounded-xl p-4 mb-4">
                  <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={3}
                    className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handlePostComment}
                      disabled={postingComment || !commentText.trim()}
                      className="px-4 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-medium hover:bg-blue-600/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {postingComment ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                {realComments.length > 0 ? realComments.map((comment, _i) => (
                  <div key={comment.id} className="bg-zinc-900/30 border border-zinc-800/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                          <span className="text-xs font-bold text-zinc-400">{comment.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-white">{comment.name}</span>
                        <span className="text-xs text-zinc-600">•</span>
                        <span className="text-xs text-zinc-500 flex items-center gap-1"><Clock size={10} />{comment.created_at}</span>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={async () => {
                            try {
                              await fetch(apiUrl(`/api/admin/comments/${comment.id}`), {
                                method: "DELETE",
                                headers: { Authorization: `Bearer ${userToken}` },
                              })
                              setRealComments(prev => prev.filter(c => c.id !== comment.id))
                            } catch {}
                          }}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Delete comment"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400">{comment.text}</p>
                  </div>
                )) : (
                  <p className="text-sm text-zinc-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Monitor size={18} /> System Requirements</h2>
              <div className="space-y-4">
                {[
                  { icon: Monitor, label: "OS", value: "Windows 10/11 64-bit" },
                  { icon: Cpu, label: "Processor", value: "Intel Core i5-8400" },
                  { icon: MemoryStick, label: "Memory", value: "16 GB RAM" },
                  { icon: Shield, label: "Graphics", value: "GTX 1060 / RX 580" },
                  { icon: HardDrive, label: "Storage", value: "45 GB available" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-zinc-800/30 last:border-0">
                    <div className="flex items-center gap-2 text-zinc-400"><Icon size={14} /><span className="text-sm">{label}</span></div>
                    <span className="text-sm text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
              {downloadLinks.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-800/30">
                  <h3 className="text-sm font-medium text-zinc-400 mb-3">{isSoftware ? "Download" : "Download Parts"}</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                  {downloadLinks.map((link, idx) => (
                    <a key={idx} href={link} target="_blank" rel="noopener noreferrer"
                        onClick={() => trackDownload(game.id)}
                        className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
                        <Download size={12} className="text-blue-400 shrink-0" />
                        <span className="text-xs text-zinc-400">{isSoftware ? "Download" : `Part ${idx + 1}`}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  document.getElementById("download-links-section")?.scrollIntoView({ behavior: "smooth" })
                }}
                disabled={downloadLinks.length === 0}
                className="w-full mt-6 py-3 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 game-accent-bg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                style={{ backgroundColor: game.color, boxShadow: `0 4px 14px ${game.color}40` }}
              >
                <Download size={16} /> {downloadLinks.length > 0 ? `Download ${game.title}` : "No Links Available"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Gallery Lightbox */}
      <ImageGallery
        images={screenshots}
        initialIndex={galleryIndex}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        title={game.title}
        videoUrl={trailerUrl}
      />

      {/* Hypervisor Video Guide Modal */}
      <TrailerModal
        isOpen={hypervisorVideoOpen}
        onClose={() => setHypervisorVideoOpen(false)}
        title={`${game.title} - Hypervisor Guide`}
        videoUrl={hypervisorVideoUrl}
      />

      {/* Install Video Guide Modal */}
      <TrailerModal
        isOpen={installVideoOpen}
        onClose={() => setInstallVideoOpen(false)}
        title={`${game.title} - Install Guide`}
        videoUrl={installVideoUrl}
      />

      {/* Edit Game Modal */}
      {editModalOpen && fullGameData && userToken && (
        <EditGameModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onGameEdited={handleGameEdited}
          userToken={userToken}
          gameData={{
            id: fullGameData.id as number,
            title: fullGameData.title as string,
            genre: fullGameData.genre as string,
            rating: fullGameData.rating as number,
            description: (fullGameData.description as string) || null,
            wallpaper_url: (fullGameData.wallpaper_url as string) || null,
            download_links: (fullGameData.download_links as string) || null,
            trailer_url: (fullGameData.trailer_url as string) || null,
            screenshots: (fullGameData.screenshots as string) || null,
            color: (fullGameData.color as string) || null,
            os: (fullGameData.os as string) || null,
            processor: (fullGameData.processor as string) || null,
            memory: (fullGameData.memory as string) || null,
            graphics: (fullGameData.graphics as string) || null,
            storage: (fullGameData.storage as string) || null,
            repack_features: (fullGameData.repack_features as string) || null,
            download_manager_name: (fullGameData.download_manager_name as string) || null,
            download_manager_url: (fullGameData.download_manager_url as string) || null,
            usage_guide: (fullGameData.usage_guide as string) || null,
            troubleshooting: (fullGameData.troubleshooting as string) || null,
            hypervisor_video_url: (fullGameData.hypervisor_video_url as string) || null,
            install_guide_text: (fullGameData.install_guide_text as string) || null,
            install_video_url: (fullGameData.install_video_url as string) || null,
            type: (fullGameData.type as string) || "game",
            developer: (fullGameData.developer as string) || null,
            version: (fullGameData.version as string) || null,
            license_type: (fullGameData.license_type as string) || null,
          }}
        />
      )}

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
            <h3 className="text-lg font-semibold text-white mb-2">Delete {isSoftware ? "Software" : "Game"}</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{game.title}</span>? This action cannot be undone.
            </p>
            {deleteError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {deleteError}
              </div>
            )}
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
    </motion.div>
  )
}