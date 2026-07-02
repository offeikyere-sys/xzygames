import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Save, Monitor, Upload, Image as ImageIcon, Link, Tag, Info, Play, Download } from "lucide-react"
import { apiUrl } from "@/lib/api"

interface EditOSModalProps {
  isOpen: boolean
  onClose: () => void
  onOSEdited: () => void
  userToken: string
  osData: {
    id: number
    title: string
    version: string
    genre: string
    rating: number
    description: string | null
    wallpaper_url: string | null
    download_links: string | null
    trailer_url: string | null
    screenshots: string | null
    color: string | null
    build_info: string | null
    install_guide_text: string | null
    install_video_url: string | null
  }
}

const osGenres = ["Windows 11", "Windows 10"]
const osVersions = ["22H2", "23H2", "24H2", "25H2", "26H2"]
const colors = [
  "#0078d4", "#3b82f6", "#a855f7", "#10b981", "#ef4444", "#f59e0b", "#ec4899", "#06b6d4", "#dc2626", "#f97316",
  "#2563eb", "#1d4ed8", "#0ea5e9", "#0891b2", "#14b8a6",
  "#7c3aed", "#6d28d9", "#c026d3", "#db2777", "#e11d48",
  "#16a34a", "#15803d", "#65a30d", "#a3e635",
  "#ea580c", "#d97706", "#ca8a04", "#eab308",
  "#b91c1c", "#991b1b", "#be123c", "#9f1239",
]

export function EditOSModal({ isOpen, onClose, onOSEdited, userToken, osData }: EditOSModalProps) {
  const [title, setTitle] = useState(osData.title || "")
  const [genre, setGenre] = useState(osData.genre || "Windows 11")
  const [version, setVersion] = useState(osData.version || "24H2")
  const [buildInfo, setBuildInfo] = useState(osData.build_info || "")
  const [rating, setRating] = useState(osData.rating?.toString() || "0")
  const [description, setDescription] = useState(osData.description || "")
  const [wallpaperUrl, setWallpaperUrl] = useState(osData.wallpaper_url || "")
  const [downloadLinks, setDownloadLinks] = useState(osData.download_links || "")
  const [trailerUrl, setTrailerUrl] = useState(osData.trailer_url || "")
  const [screenshots, setScreenshots] = useState(osData.screenshots || "")
  const [color, setColor] = useState(osData.color || "#0078d4")
  const [installGuideText, setInstallGuideText] = useState(osData.install_guide_text || "")
  const [installVideoUrl, setInstallVideoUrl] = useState(osData.install_video_url || "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadTarget, setUploadTarget] = useState<"wallpaper" | "screenshots" | null>(null)

  // Reset form when osData changes
  useEffect(() => {
    setTitle(osData.title || "")
    setGenre(osData.genre || "Windows 11")
    setVersion(osData.version || "24H2")
    setBuildInfo(osData.build_info || "")
    setRating(osData.rating?.toString() || "0")
    setDescription(osData.description || "")
    setWallpaperUrl(osData.wallpaper_url || "")
    setDownloadLinks(osData.download_links || "")
    setTrailerUrl(osData.trailer_url || "")
    setScreenshots(osData.screenshots || "")
    setColor(osData.color || "#0078d4")
    setInstallGuideText(osData.install_guide_text || "")
    setInstallVideoUrl(osData.install_video_url || "")
    setError("")
    setSuccess(false)
  }, [osData, isOpen])

  const handleUpload = async (file: File, target: "wallpaper" | "screenshots") => {
    setUploading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch(apiUrl("/api/upload"), {
        method: "POST",
        headers: { Authorization: `Bearer ${userToken}` },
        body: formData,
      })
      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()
      if (target === "wallpaper") {
        setWallpaperUrl(data.url)
      } else {
        setScreenshots(prev => prev ? prev + "\n" + data.url : data.url)
      }
    } catch (err: any) {
      setError(err.message || "Upload failed")
    } finally {
      setUploading(false)
      setUploadTarget(null)
    }
  }

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required")
      return
    }
    setSaving(true)
    setError("")
    try {
      const body: Record<string, any> = {
        title: title.trim(),
        genre,
        version,
        rating: parseFloat(rating) || 0,
        color,
      }
      if (buildInfo.trim()) body.build_info = buildInfo.trim()
      if (description.trim()) body.description = description.trim()
      if (wallpaperUrl.trim()) body.wallpaper_url = wallpaperUrl.trim()
      if (downloadLinks.trim()) body.download_links = downloadLinks.trim()
      if (trailerUrl.trim()) body.trailer_url = trailerUrl.trim()
      if (screenshots.trim()) body.screenshots = screenshots.trim()
      if (installGuideText.trim()) body.install_guide_text = installGuideText.trim()
      if (installVideoUrl.trim()) body.install_video_url = installVideoUrl.trim()

      console.log("Saving OS:", body)
      const res = await fetch(apiUrl(`/api/os/${osData.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.detail || `HTTP ${res.status}: Failed to update`)
      }
      setSuccess(true)
      setTimeout(() => {
        onOSEdited()
        onClose()
      }, 1000)
    } catch (err: any) {
      console.error("Save error:", err)
      setError(err.message || "Failed to update")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                  <Monitor size={18} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Edit Operating System</h2>
                  <p className="text-xs text-zinc-500">Update OS details, images, and links</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">
                  OS updated successfully!
                </div>
              )}

              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                  <Info size={14} className="text-cyan-400" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Windows 11 24H2"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Genre</label>
                    <select
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    >
                      {osGenres.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Version</label>
                    <select
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    >
                      {osVersions.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Build Info</label>
                    <input
                      type="text"
                      value={buildInfo}
                      onChange={(e) => setBuildInfo(e.target.value)}
                      placeholder="e.g. 10.0.26100.1742"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Rating (0-5)</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe this Windows release..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                  <ImageIcon size={14} className="text-cyan-400" />
                  Media & Links
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Wallpaper / Banner URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={wallpaperUrl}
                        onChange={(e) => setWallpaperUrl(e.target.value)}
                        placeholder="https://example.com/banner.jpg"
                        className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                      />
                      <button
                        onClick={() => { setUploadTarget("wallpaper"); fileInputRef.current?.click() }}
                        disabled={uploading}
                        className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all disabled:opacity-50"
                        title="Upload image"
                      >
                        <Upload size={16} />
                      </button>
                    </div>
                    {wallpaperUrl && (
                      <div className="mt-2 relative h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                        <img src={wallpaperUrl} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Trailer / Preview URL</label>
                    <input
                      type="text"
                      value={trailerUrl}
                      onChange={(e) => setTrailerUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Screenshots (one URL per line)</label>
                    <div className="flex gap-2">
                      <textarea
                        value={screenshots}
                        onChange={(e) => setScreenshots(e.target.value)}
                        rows={3}
                        placeholder="https://example.com/screenshot1.jpg&#10;https://example.com/screenshot2.jpg"
                        className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                      />
                      <button
                        onClick={() => { setUploadTarget("screenshots"); fileInputRef.current?.click() }}
                        disabled={uploading}
                        className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all disabled:opacity-50"
                        title="Upload screenshot"
                      >
                        <Upload size={16} />
                      </button>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file && uploadTarget) {
                        handleUpload(file, uploadTarget)
                      }
                      e.target.value = ""
                    }}
                  />
                  {uploading && (
                    <div className="text-xs text-cyan-400 animate-pulse">Uploading...</div>
                  )}
                </div>
              </div>

              {/* Download & Install */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                  <Download size={14} className="text-cyan-400" />
                  Download & Installation
                </h3>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Download Links (one per line)</label>
                  <textarea
                    value={downloadLinks}
                    onChange={(e) => setDownloadLinks(e.target.value)}
                    rows={3}
                    placeholder="https://example.com/windows.iso&#10;https://example.com/part2.iso"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Install Guide Text</label>
                  <textarea
                    value={installGuideText}
                    onChange={(e) => setInstallGuideText(e.target.value)}
                    rows={3}
                    placeholder="Step-by-step installation instructions..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Install Video URL</label>
                  <input
                    type="text"
                    value={installVideoUrl}
                    onChange={(e) => setInstallVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/50 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                  <Tag size={14} className="text-cyan-400" />
                  Accent Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${color === c ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || success}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-all disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? "Saving..." : success ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}