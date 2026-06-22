import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ImageIcon, Upload, Trash2, LinkIcon } from "lucide-react"
import { apiUrl } from "@/lib/api"
import { isVideoUrl } from "@/lib/media"

interface GenreBannerModalProps {
  isOpen: boolean
  onClose: () => void
  userToken: string
  genre: string
  currentBannerUrl: string | null
  onBannerUpdated: (url: string | null) => void
}

export function GenreBannerModal({ isOpen, onClose, userToken, genre, currentBannerUrl, onBannerUpdated }: GenreBannerModalProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentBannerUrl || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [selectedFileIsVideo, setSelectedFileIsVideo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setSelectedFileIsVideo(file.type.startsWith("video/"))
      setError("")
      setSuccess(false)
      setShowUrlInput(false)
    }
  }

  // Check if current preview should render as video
  const isPreviewVideo = (): boolean => {
    if (selectedFileIsVideo) return true
    if (preview && !preview.startsWith("blob:")) return isVideoUrl(preview)
    return false
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setUrlInput(val)
    if (val.trim()) {
      setPreview(val.trim())
      setError("")
      setSuccess(false)
    } else {
      setPreview("")
    }
  }

  const handleSave = async () => {
    if (!preview) return
    setError("")
    setSuccess(false)
    setUploading(true)
    try {
      // If preview is a blob URL, upload the file first
      let bannerUrl = preview
      if (preview.startsWith("blob:")) {
        const file = fileInputRef.current?.files?.[0]
        if (!file) { setError("No file selected"); return }
        const fd = new FormData()
        fd.append("file", file)
        const r = await fetch(apiUrl("/api/upload"), {
          method: "POST",
          headers: { Authorization: `Bearer ${userToken}` },
          body: fd,
        })
        if (!r.ok) {
          const errData = await r.json().catch(() => ({}))
          throw new Error(errData.detail || "Failed to upload file to server")
        }
        bannerUrl = (await r.json()).url
      }

      const res = await fetch(apiUrl(`/api/category-banners/${encodeURIComponent(genre)}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
        body: JSON.stringify({ banner_url: bannerUrl }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || `Server responded with ${res.status}`)
      }
      setSuccess(true)
      setTimeout(() => {
        onBannerUpdated(bannerUrl)
        onClose()
      }, 800)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save banner")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    setError("")
    setSuccess(false)
    setUploading(true)
    try {
      const res = await fetch(apiUrl(`/api/category-banners/${encodeURIComponent(genre)}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
        body: JSON.stringify({ banner_url: "" }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || `Server responded with ${res.status}`)
      }
      setSuccess(true)
      setTimeout(() => {
        setPreview("")
        setUrlInput("")
        onBannerUpdated(null)
        onClose()
      }, 800)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to remove banner")
    } finally {
      setUploading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-zinc-900/95 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                {genre} Banner
              </h2>
              <button onClick={onClose} className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800">
                <X size={18} />
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-400 flex items-center gap-2">
                ✓ Banner saved successfully!
              </div>
            )}

            {/* Source selector: Upload vs URL */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => { setShowUrlInput(false); fileInputRef.current?.click() }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  !showUrlInput ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-500/50"
                }`}
              >
                <Upload size={12} />
                Upload File
              </button>
              <button
                type="button"
                onClick={() => { setShowUrlInput(true); setPreview(urlInput || "") }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  showUrlInput ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-500/50"
                }`}
              >
                <LinkIcon size={12} />
                URL Link
              </button>
            </div>

            {/* URL Input */}
            {showUrlInput && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Direct image/video URL
                </label>
                <input
                  ref={urlInputRef}
                  type="url"
                  value={urlInput}
                  onChange={handleUrlChange}
                  placeholder="https://example.com/video.mp4 or image.jpg"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
                />
                <p className="text-[10px] text-zinc-600 mt-1">
                  Supports direct .mp4, .webm video links or image URLs
                </p>
              </div>
            )}

            {/* Banner preview */}
            {!showUrlInput && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 rounded-xl bg-zinc-800/50 border border-dashed border-zinc-600/50 hover:border-blue-500/50 cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden mb-4"
              >
                {preview ? (
                  <>
                    {isPreviewVideo() ? (
                      <video src={preview} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                    ) : (
                      <img src={preview} alt="Banner preview" className="w-full h-full object-cover" />
                    )}
                  </>
                ) : (
                  <>
                    <ImageIcon size={32} className="text-zinc-500" />
                    <span className="text-sm text-zinc-400">Click to upload banner image or video</span>
                  </>
                )}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska,video/ogg"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex gap-3">
              {preview && (
                <button
                  onClick={handleRemove}
                  disabled={uploading}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 text-sm font-medium transition-all disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={uploading || !preview}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white text-sm font-medium transition-all"
              >
                <Upload size={16} />
                {uploading ? "Saving..." : "Save Banner"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}