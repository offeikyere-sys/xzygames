import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft, Download, Star, Monitor, HardDrive, Clock,
  MessageSquare, Share2, Play, Trash2, Edit, ChevronDown, ChevronUp, Link, Tag, Info
} from "lucide-react"
import { TrailerModal } from "@/components/ui/TrailerModal"
import { ImageGallery } from "@/components/ui/ImageGallery"
import { BlurImage } from "@/components/ui/BlurImage"
import { EditOSModal } from "@/components/admin/EditOSModal"
import { apiUrl, logActivity } from "@/lib/api"
import { isVideoUrl } from "@/lib/media"

const trackDownload = async (osId?: number, osTitle?: string) => {
  if (!osId) return
  try {
    await fetch(apiUrl(`/api/os/${osId}/download`), { method: "POST" })
    logActivity("downloaded", "os", osTitle || "Unknown", osId)
  } catch {
    // silently fail
  }
}

interface OSDetailPageProps {
  os: {
    id?: number
    title: string
    version: string
    genre: string
    rating: number
    downloads: number
    color: string
  }
  onBack: () => void
  userToken?: string
  isAdmin?: boolean
}

export function OSDetailPage({ os, onBack, userToken, isAdmin }: OSDetailPageProps) {
  const [downloadLinks, setDownloadLinks] = useState<string[]>([])
  const [screenshots, setScreenshots] = useState<string[]>([])
  const [bannerUrl, setBannerUrl] = useState("")
  const [trailerUrl, setTrailerUrl] = useState("")
  const [description, setDescription] = useState("")
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [installGuideText, setInstallGuideText] = useState("")
  const [installVideoUrl, setInstallVideoUrl] = useState("")
  const [installGuideOpen, setInstallGuideOpen] = useState(false)
  const [installVideoOpen, setInstallVideoOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  const [fullOSData, setFullOSData] = useState<Record<string, unknown> | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [buildInfo, setBuildInfo] = useState("")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (os.id) {
      logActivity("viewed", "os", os.title, os.id)
      
      fetch(apiUrl(`/api/os/${os.id}`))
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
          if (data.install_guide_text) {
            setInstallGuideText(data.install_guide_text)
          }
          if (data.install_video_url) {
            setInstallVideoUrl(data.install_video_url)
          }
          if (data.description) {
            setDescription(data.description)
          }
          if (data.build_info) {
            setBuildInfo(data.build_info)
          }
          setFullOSData(data)
        })
        .catch(() => {})
    }
  }, [os.id, refreshKey])

  const handleDelete = async () => {
    if (!os.id || !userToken) return
    setDeleting(true)
    setDeleteError("")
    try {
      const res = await fetch(apiUrl(`/api/os/${os.id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (!res.ok) {
        const data = await res.json()
        setDeleteError(data.detail || "Failed to delete")
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

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      alert("Link copied to clipboard!")
    }
  }

  const displayScreenshots = screenshots.length > 0 ? screenshots : null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      {/* Banner */}
      <div className="relative h-[60vh] min-h-[450px] overflow-hidden">
        {bannerUrl ? (
          <>
            {isVideoUrl(bannerUrl) ? (
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src={bannerUrl} />
              </video>
            ) : (
              <img src={bannerUrl} alt={os.title} className="absolute inset-0 w-full h-full object-cover object-top" />
            )}
          </>
        ) : (
          <div className="absolute inset-0" style={{
            background: `linear-gradient(135deg, ${os.color}40, ${os.color}10, #000000cc)`
          }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute top-28 left-4 z-10">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-zinc-700/50 text-sm text-zinc-300 hover:text-white hover:bg-black/80 transition-all"
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  {os.genre}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                  {os.version}
                </span>
                {buildInfo && (
                  <span className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-800/80 text-zinc-300 border border-zinc-700/30">
                    {buildInfo}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-yellow-400 font-medium">{os.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Download size={12} />
                  <span className="text-xs">{os.downloads} downloads</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white">{os.title}</h1>
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
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: os.color, boxShadow: `0 4px 14px ${os.color}40` }}
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
                  Watch Preview
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
                    className="p-3 rounded-xl border border-zinc-700/50 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                    title="Edit OS"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmOpen(true)}
                    className="p-3 rounded-xl border border-zinc-700/50 text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Info size={18} className="text-blue-400" />
                About this Release
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
                {description || `${os.title} (${os.version}) - A Windows operating system release.`}
              </p>
            </motion.div>

            {/* Build Info */}
            {buildInfo && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.51 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Tag size={18} className="text-cyan-400" />
                  Build Information
                </h2>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-cyan-600/10 border border-cyan-500/20">
                    <code className="text-sm text-cyan-300 font-mono">{buildInfo}</code>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Download Links */}
            {downloadLinks.length > 0 && (
              <motion.div id="download-links-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Link size={18} />
                  Download Links ({downloadLinks.length})
                </h2>
                <p className="text-xs text-zinc-500 mb-3">Click to download the Windows ISO or installer.</p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {downloadLinks.map((link, idx) => (
                    <a key={idx} href={link} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackDownload(os.id)}
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
                    <div key={i} className="h-40 rounded-xl border border-zinc-800/30 overflow-hidden" style={{ background: `linear-gradient(135deg, ${os.color}15, ${os.color}05)` }}>
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
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Monitor size={18} className="text-blue-400" />
                  How to Install
                </h2>
                {installGuideOpen ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
              </button>
              <AnimatePresence>
                {installGuideOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="space-y-3">
                        {(installGuideText ? installGuideText.split("\n").filter(l => l.trim()) : [
                          "Download the ISO file from the links above.",
                          "Create a bootable USB drive using Rufus or similar tool.",
                          "Boot from the USB drive and follow the Windows setup wizard.",
                          "Select your edition and partition, then complete installation.",
                          "Activate Windows using a valid license key if required.",
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
                <p className="text-sm text-zinc-400 mb-4">Watch this video walkthrough to learn how to install this operating system.</p>
                <button
                  onClick={() => setInstallVideoOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 transition-all text-sm font-medium"
                >
                  <Play size={16} />
                  Watch Install Guide
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-zinc-900/30 border border-zinc-800/30 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Monitor size={18} />
                OS Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/30">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Tag size={14} />
                    <span className="text-sm">Version</span>
                  </div>
                  <span className="text-sm text-white font-medium">{os.version}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/30">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Monitor size={14} />
                    <span className="text-sm">Edition</span>
                  </div>
                  <span className="text-sm text-white font-medium">{os.genre}</span>
                </div>
                {buildInfo && (
                  <div className="flex items-center justify-between py-2 border-b border-zinc-800/30">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Info size={14} />
                      <span className="text-sm">Build</span>
                    </div>
                    <span className="text-sm text-white font-mono font-medium">{buildInfo}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/30">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Star size={14} />
                    <span className="text-sm">Rating</span>
                  </div>
                  <span className="text-sm text-yellow-400 font-medium">{os.rating}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/30">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Download size={14} />
                    <span className="text-sm">Downloads</span>
                  </div>
                  <span className="text-sm text-white font-medium">{os.downloads}</span>
                </div>
              </div>

              {downloadLinks.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-800/30">
                  <h3 className="text-sm font-medium text-zinc-400 mb-3">Download</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {downloadLinks.map((link, idx) => (
                      <a key={idx} href={link} target="_blank" rel="noopener noreferrer"
                        onClick={() => trackDownload(os.id)}
                        className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
                        <Download size={12} className="text-blue-400 shrink-0" />
                        <span className="text-xs text-zinc-400">Part {idx + 1}</span>
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
                className="w-full mt-6 py-3 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: os.color, boxShadow: `0 4px 14px ${os.color}40` }}
              >
                <Download size={16} /> {downloadLinks.length > 0 ? `Download ${os.title}` : "No Links Available"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
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
        title={os.title}
        videoUrl={trailerUrl}
      />

      {/* Install Video Modal */}
      <TrailerModal
        isOpen={installVideoOpen}
        onClose={() => setInstallVideoOpen(false)}
        title={`${os.title} - Install Guide`}
        videoUrl={installVideoUrl}
      />

      {/* Edit OS Modal */}
      <EditOSModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onOSEdited={() => setRefreshKey(k => k + 1)}
        userToken={userToken || ""}
        osData={{
          id: os.id || 0,
          title: os.title,
          version: os.version,
          genre: os.genre,
          rating: os.rating,
          description: (fullOSData as any)?.description || null,
          wallpaper_url: (fullOSData as any)?.wallpaper_url || null,
          download_links: (fullOSData as any)?.download_links || null,
          trailer_url: (fullOSData as any)?.trailer_url || null,
          screenshots: (fullOSData as any)?.screenshots || null,
          color: os.color,
          build_info: (fullOSData as any)?.build_info || null,
          install_guide_text: (fullOSData as any)?.install_guide_text || null,
          install_video_url: (fullOSData as any)?.install_video_url || null,
        }}
      />

      {/* Delete Confirmation */}
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
            <h3 className="text-lg font-semibold text-white mb-2">Delete OS</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{os.title}</span>? This action cannot be undone.
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