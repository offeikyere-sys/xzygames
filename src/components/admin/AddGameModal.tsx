import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Gamepad2, Monitor, Film, Upload, Image as ImageIcon, Disc3 } from "lucide-react"
import { apiUrl } from "@/lib/api"

interface AddGameModalProps {
  isOpen: boolean
  onClose: () => void
  onGameAdded: () => void
  userToken: string
}

const allGenres = ["Action", "RPG", "Strategy", "Racing", "Horror", "Adventure", "Sports", "Sci-Fi", "Simulation", "Puzzle", "Shooter", "Open World", "Survival", "Fighting", "Arcade", "Casual", "Indie", "Hypervisor"]
const softwareGenres = ["Antivirus & Security", "Browsers", "Design & 3D", "Development Tools", "Multimedia & Audio", "Productivity & Office", "Utilities & System"]
const movieGenres = ["Action", "Comedy", "Drama", "Horror", "Thriller", "Sci-Fi", "Romance", "Adventure", "Animation", "Documentary", "Fantasy", "Mystery", "Crime", "Family", "War", "Western", "Musical", "History", "Series", "Seasonal"]
const osGenres = ["Windows 11", "Windows 10"]
const osVersions = ["22H2", "23H2", "24H2", "25H2", "26H2"]
const colors = [
  "#3b82f6", "#a855f7", "#10b981", "#ef4444", "#f59e0b", "#ec4899", "#06b6d4", "#dc2626", "#f97316", "#84cc16",
  "#2563eb", "#1d4ed8", "#0ea5e9", "#0891b2", "#14b8a6",
  "#7c3aed", "#6d28d9", "#c026d3", "#db2777", "#e11d48",
  "#16a34a", "#15803d", "#65a30d", "#a3e635",
  "#ea580c", "#d97706", "#ca8a04", "#eab308",
  "#b91c1c", "#991b1b", "#be123c", "#9f1239",
  "#ffffff", "#f4f4f5", "#d4d4d8", "#a1a1aa", "#71717a", "#52525b", "#3f3f46", "#27272a", "#18181b", "#09090b",
  "#bfdbfe", "#c4b5fd", "#bbf7d0", "#fecaca", "#fed7aa", "#fef08a", "#fbcfe8", "#a5f3fc",
]

const licenseTypes = ["Freemium", "Free Trial", "Free", "Subscription", "Shareware"]

export function AddGameModal({ isOpen, onClose, onGameAdded, userToken }: AddGameModalProps) {
  const [itemType, setItemType] = useState<"game" | "software" | "movie" | "os">("game")
  const [title, setTitle] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [downloadLinks, setDownloadLinks] = useState("")
  const [trailerUrl, setTrailerUrl] = useState("")
  const [showGuideFields, setShowGuideFields] = useState(false)
  const [usageGuide, setUsageGuide] = useState("")
  const [troubleshooting, setTroubleshooting] = useState("")
  const [hypervisorVideoUrl, setHypervisorVideoUrl] = useState("")
  const [installGuideText, setInstallGuideText] = useState("")
  const [installVideoUrl, setInstallVideoUrl] = useState("")
  const [repackFeatures, setRepackFeatures] = useState("")
  const [color, setColor] = useState("#3b82f6")
  const [rating, setRating] = useState("4.5")
  // Software-specific fields
  const [developer, setDeveloper] = useState("")
  const [version, setVersion] = useState("")
  const [licenseType, setLicenseType] = useState("")
  // Movie-specific fields
  const [movieYear, setMovieYear] = useState("")
  const [movieDuration, setMovieDuration] = useState("")
  const [director, setDirector] = useState("")
  const [cast, setCast] = useState("")
  // OS-specific fields
  const [osVersion, setOsVersion] = useState("24H2")
  const [osBuildInfo, setOsBuildInfo] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState("")
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([])
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>([])
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const screenshotsInputRef = useRef<HTMLInputElement>(null)

  const toggleGenre = (g: string) => {
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }

  const handleBannerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { setBannerFile(file); setBannerPreview(URL.createObjectURL(file)) }
  }
  const handleScreenshotsSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setScreenshotFiles(prev => [...prev, ...files])
      setScreenshotPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
    }
  }
  const removeScreenshot = (index: number) => {
    setScreenshotFiles(prev => prev.filter((_, i) => i !== index))
    setScreenshotPreviews(prev => { URL.revokeObjectURL(prev[index]); return prev.filter((_, i) => i !== index) })
  }

  const resetForm = () => {
    setTitle(""); setSelectedGenres([]); setDescription(""); setDownloadLinks(""); setTrailerUrl("")
    setShowGuideFields(false); setUsageGuide(""); setTroubleshooting(""); setHypervisorVideoUrl(""); setInstallGuideText(""); setInstallVideoUrl(""); setRepackFeatures("")
    setColor("#3b82f6"); setRating("4.5")
    setDeveloper(""); setVersion(""); setLicenseType("")
    setMovieYear(""); setMovieDuration(""); setDirector(""); setCast("")
    setOsVersion("24H2"); setOsBuildInfo("")
    setBannerFile(null); setBannerPreview(""); setScreenshotFiles([]); setScreenshotPreviews([])
  }

  const handleSubmit = async () => {
    const label = itemType === "game" ? "Game" : itemType === "software" ? "Software" : itemType === "movie" ? "Movie" : "OS"
    if (!title.trim()) { setError(`${label} title is required`); return }
    setError(""); setLoading(true)
    try {
      let bannerUrl = ""
      const screenshotsUrls: string[] = []
      if (bannerFile) {
        const fd = new FormData(); fd.append("file", bannerFile)
        const r = await fetch(apiUrl("/api/upload"), { method: "POST", headers: { Authorization: `Bearer ${userToken}` }, body: fd })
        if (r.ok) bannerUrl = (await r.json()).url
      }
      for (const file of screenshotFiles) {
        const fd = new FormData(); fd.append("file", file)
        const r = await fetch(apiUrl("/api/upload"), { method: "POST", headers: { Authorization: `Bearer ${userToken}` }, body: fd })
        if (r.ok) screenshotsUrls.push((await r.json()).url)
      }
      const genreString = selectedGenres.join(", ")
      const body: Record<string, unknown> = {
        title: title.trim(), genre: genreString || "Action",
        description: description.trim(),
        download_links: downloadLinks.trim() || null,
        ...(itemType === "movie" ? { poster_url: bannerUrl || null } : { wallpaper_url: bannerUrl || null }),
        trailer_url: trailerUrl.trim() || null,
        screenshots: screenshotsUrls.length > 0 ? screenshotsUrls.join("\n") : null,
        repack_features: repackFeatures.trim() || null,
        color, rating: parseFloat(rating) || 0,
        type: itemType,
        developer: itemType === "software" ? (developer.trim() || null) : null,
        version: itemType === "software" ? (version.trim() || null) : itemType === "os" ? osVersion : null,
        license_type: itemType === "software" ? (licenseType || null) : null,
        year: itemType === "movie" ? (movieYear.trim() || null) : null,
        duration: itemType === "movie" ? (movieDuration.trim() || null) : null,
        director: itemType === "movie" ? (director.trim() || null) : null,
        cast: itemType === "movie" ? (cast.trim() || null) : null,
        // OS-specific fields
        build_info: itemType === "os" ? (osBuildInfo.trim() || null) : null,
        install_guide_text: itemType === "os" ? (installGuideText.trim() || null) : null,
        install_video_url: itemType === "os" ? (installVideoUrl.trim() || null) : null,
      }
      const endpoint = itemType === "movie" ? "/api/movies" : itemType === "os" ? "/api/os" : "/api/games"
      const res = await fetch(apiUrl(endpoint), { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` }, body: JSON.stringify(body) })
      if (res.status === 401) { setError("Session expired. Please sign out and sign back in."); return }
      if (!res.ok) { const d = await res.json(); setError(d.detail || `Failed to add ${label.toLowerCase()}`); return }
      resetForm()
      onGameAdded(); onClose()
    } catch (err) { setError(err instanceof TypeError ? "Backend not running. Make sure port 5050 is active." : "Failed to add item. Please try again.") }
    finally { setLoading(false) }
  }

  const isSoftware = itemType === "software"
  const isMovie = itemType === "movie"
  const isOS = itemType === "os"
  const hasGuideContent = selectedGenres.includes("Hypervisor") || usageGuide || troubleshooting || hypervisorVideoUrl || showGuideFields

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="w-full max-w-lg bg-zinc-900/95 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-zinc-900/95 z-10">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${isMovie ? "bg-purple-500/10 border-purple-500/20" : isSoftware ? "bg-purple-500/10 border-purple-500/20" : isOS ? "bg-cyan-500/10 border-cyan-500/20" : "bg-blue-500/10 border-blue-500/20"}`}>
                  {isMovie ? <Film size={18} className="text-purple-400" /> : isSoftware ? <Monitor size={18} className="text-purple-400" /> : isOS ? <Disc3 size={18} className="text-cyan-400" /> : <Gamepad2 size={18} className="text-blue-400" />}
                </div>
                <h2 className="text-lg font-semibold text-white">{isMovie ? "Add New Movie" : isSoftware ? "Add New Software" : isOS ? "Add New OS" : "Add New Game"}</h2>
              </div>
              <div className="flex items-center gap-2">
                {/* Game / Software / Movie / OS Toggle */}
                <div className="flex rounded-lg bg-zinc-800 border border-zinc-700/50 p-0.5">
                  <button
                    onClick={() => setItemType("game")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${itemType === "game" ? "bg-blue-600 text-white shadow-lg" : "text-zinc-400 hover:text-white"}`}
                  >
                    <Gamepad2 size={12} /> Game
                  </button>
                  <button
                    onClick={() => setItemType("software")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${itemType === "software" ? "bg-purple-600 text-white shadow-lg" : "text-zinc-400 hover:text-white"}`}
                  >
                    <Monitor size={12} /> Software
                  </button>
                  <button
                    onClick={() => setItemType("movie")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${itemType === "movie" ? "bg-pink-600 text-white shadow-lg" : "text-zinc-400 hover:text-white"}`}
                  >
                    <Film size={12} /> Movie
                  </button>
                  <button
                    onClick={() => setItemType("os")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${itemType === "os" ? "bg-cyan-600 text-white shadow-lg" : "text-zinc-400 hover:text-white"}`}
                  >
                    <Disc3 size={12} /> OS
                  </button>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"><X size={18} /></button>
              </div>
            </div>
            {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">{isMovie ? "Movie Title" : isSoftware ? "Software Title" : isOS ? "OS Title" : "Game Title"} *</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={isMovie ? "Enter movie name" : isSoftware ? "Enter software name" : isOS ? "e.g. Windows 11 Pro" : "Enter game name"} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors" />
              </div>

              {/* Software-specific fields */}
              {isSoftware && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Developer</label>
                      <input type="text" value={developer} onChange={e => setDeveloper(e.target.value)} placeholder="e.g. Adobe Inc." className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-purple-500/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Version</label>
                      <input type="text" value={version} onChange={e => setVersion(e.target.value)} placeholder="e.g. 26.0" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-purple-500/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">License Type</label>
                    <div className="flex flex-wrap gap-2">
                      {licenseTypes.map(lt => (
                        <button key={lt} type="button" onClick={() => setLicenseType(lt === licenseType ? "" : lt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${licenseType === lt ? "bg-purple-600/20 text-purple-400 border-purple-500/30" : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-500/50"}`}>
                          {licenseType === lt ? "✓ " : ""}{lt}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* OS-specific fields */}
              {isOS && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Version</label>
                      <div className="flex flex-wrap gap-2">
                        {osVersions.map(v => (
                          <button key={v} type="button" onClick={() => setOsVersion(v)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${osVersion === v ? "bg-cyan-600/20 text-cyan-400 border-cyan-500/30" : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-500/50"}`}>
                            {osVersion === v ? "✓ " : ""}{v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Build Info</label>
                      <input type="text" value={osBuildInfo} onChange={e => setOsBuildInfo(e.target.value)} placeholder="e.g. Build 26100.1742" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {osGenres.map(g => (
                        <button key={g} type="button" onClick={() => toggleGenre(g)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${selectedGenres.includes(g) ? "bg-cyan-600/20 text-cyan-400 border-cyan-500/30" : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-500/50"}`}>
                          {selectedGenres.includes(g) ? "✓ " : ""}{g}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Movie-specific fields */}
              {isMovie && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Year</label>
                    <input type="number" min="1900" max="2030" value={movieYear} onChange={e => setMovieYear(e.target.value)} placeholder="e.g. 2024" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-pink-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Duration</label>
                    <input type="text" value={movieDuration} onChange={e => setMovieDuration(e.target.value)} placeholder="e.g. 2h 15m" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-pink-500/50 transition-colors" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Director</label>
                    <input type="text" value={director} onChange={e => setDirector(e.target.value)} placeholder="e.g. Christopher Nolan" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-pink-500/50 transition-colors" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Cast</label>
                    <input type="text" value={cast} onChange={e => setCast(e.target.value)} placeholder="e.g. Leonardo DiCaprio, Joseph Gordon-Levitt" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-pink-500/50 transition-colors" />
                  </div>
                </div>
              )}

              {/* Genres - Checkboxes (not for OS) */}
              {!isOS && (
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Genre <span className="text-zinc-600">(select multiple)</span></label>
                <div className="flex flex-wrap gap-2">
                  {(isMovie ? movieGenres : isSoftware ? softwareGenres : allGenres).map(g => (
                    <button key={g} type="button" onClick={() => toggleGenre(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${selectedGenres.includes(g) ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-500/50"}`}>
                      {selectedGenres.includes(g) ? "✓ " : ""}{g}
                    </button>
                  ))}
                </div>
                {selectedGenres.length > 0 && <p className="text-[10px] text-zinc-600 mt-1">Selected: {selectedGenres.join(", ")}</p>}
              </div>
              )}
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Rating (0-10)</label>
                <input type="number" min="0" max="10" step="0.1" value={rating} onChange={e => setRating(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder={isMovie ? "Describe the movie..." : isSoftware ? "Describe the software..." : isOS ? "Describe this Windows release..." : "Describe the game..."} rows={3} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 resize-none" />
              </div>
              {/* Media */}
              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-semibold text-white mb-4">Media</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">{isMovie ? "Poster Image" : "Banner Image"}</label>
              <input ref={bannerInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska,video/ogg" onChange={handleBannerSelect} className="hidden" />
                  <div onClick={() => bannerInputRef.current?.click()} className="w-full p-4 rounded-xl bg-zinc-800/50 border border-dashed border-zinc-600/50 hover:border-blue-500/50 cursor-pointer flex flex-col items-center gap-2">
                    {bannerPreview ? <><img src={bannerPreview} alt="" className="w-full h-32 object-cover rounded-lg" /><button onClick={e => { e.stopPropagation(); setBannerFile(null); setBannerPreview("") }} className="absolute top-2 right-2 p-1 rounded bg-red-600/80 text-white text-xs"><X size={14} /></button></> : <><Upload size={24} className="text-zinc-500" /><span className="text-sm text-zinc-400">Click to upload {isMovie ? "poster" : "banner"} image</span></>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Screenshots</label>
                  <input ref={screenshotsInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" multiple onChange={handleScreenshotsSelect} className="hidden" />
                  <div onClick={() => screenshotsInputRef.current?.click()} className="w-full p-4 rounded-xl bg-zinc-800/50 border border-dashed border-zinc-600/50 hover:border-blue-500/50 cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon size={24} className="text-zinc-500" /><span className="text-sm text-zinc-400">Click to select screenshots</span>
                  </div>
                  {screenshotPreviews.length > 0 && <div className="mt-3 grid grid-cols-2 gap-2">{screenshotPreviews.map((p, i) => (<div key={i} className="relative"><img src={p} alt="" className="w-full h-20 object-cover rounded-lg" /><button onClick={() => removeScreenshot(i)} className="absolute top-1 right-1 p-0.5 rounded bg-red-600/80 text-white"><X size={12} /></button></div>))}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Trailer URL</label>
                  <input type="url" value={trailerUrl} onChange={e => setTrailerUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50" />
                </div>
              </div>
              {/* OS Install Guide */}
              {isOS && (
                <div className="pt-4 border-t border-zinc-800/50">
                  <h3 className="text-sm font-semibold text-white mb-4">Installation Guide</h3>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Installation Instructions</label>
                    <textarea value={installGuideText} onChange={e => setInstallGuideText(e.target.value)}
                      placeholder={`Step 1: Download the ISO file.\nStep 2: Create a bootable USB using Rufus.\nStep 3: Boot from USB and follow setup.\nStep 4: Select edition and partition.\nStep 5: Complete installation.`}
                      rows={5} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-cyan-500/50 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Install Video URL</label>
                    <input type="url" value={installVideoUrl} onChange={e => setInstallVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-cyan-500/50" />
                  </div>
                </div>
              )}
              {/* Install Guide (for games/software) */}
              {!isMovie && !isOS && (
                <div className="pt-4 border-t border-zinc-800/50">
                  <h3 className="text-sm font-semibold text-white mb-4">How to Install</h3>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Installation Instructions</label>
                    <textarea value={installGuideText} onChange={e => setInstallGuideText(e.target.value)}
                      placeholder={`Step 1: Download all parts from the links above.\nStep 2: Extract Part 01 using WinRAR or 7-Zip.\nStep 3: Run the installer as Administrator.\nStep 4: Follow the installation wizard.\nStep 5: Launch the game from your desktop shortcut.`}
                      rows={5} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 resize-none" />
                    <p className="text-[10px] text-zinc-600 mt-1">Each line will be displayed as a separate step. Leave empty for default instructions.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Install Video URL</label>
                    <input type="url" value={installVideoUrl} onChange={e => setInstallVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
                    <p className="text-[10px] text-zinc-600 mt-1">YouTube, Vimeo, or direct .mp4/.webm link for a video walkthrough</p>
                  </div>
                </div>
              )}
              {/* Hypervisor Guides */}
              {hasGuideContent && !isMovie && !isOS && (
                <div className="pt-4 border-t border-zinc-800/50">
                  <h3 className="text-sm font-semibold text-white mb-4">Hypervisor Guides</h3>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">How to Use Hypervisor</label>
                    <textarea value={usageGuide} onChange={e => setUsageGuide(e.target.value)} placeholder="Step-by-step guide..." rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Troubleshooting / Fix Issues</label>
                    <textarea value={troubleshooting} onChange={e => setTroubleshooting(e.target.value)} placeholder="Common issues and fixes..." rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 resize-none" />
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Hypervisor Video URL</label>
                    <input type="url" value={hypervisorVideoUrl} onChange={e => setHypervisorVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... or direct video link"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
                    <p className="text-[10px] text-zinc-600 mt-1">YouTube, Vimeo, or direct .mp4/.webm link</p>
                  </div>
                </div>
              )}
              {!showGuideFields && !usageGuide && !troubleshooting && !hypervisorVideoUrl && !isMovie && !isOS && (
                <button type="button" onClick={() => setShowGuideFields(true)} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">+ Add Hypervisor Guides</button>
              )}
              {/* Repack Features */}
              {!isMovie && !isOS && (
                <div className="pt-4 border-t border-zinc-800/50">
                  <h3 className="text-sm font-semibold text-white mb-4">{isSoftware ? "Features" : "Repack Features"}</h3>
                  <textarea value={repackFeatures} onChange={e => setRepackFeatures(e.target.value)} placeholder={`• Repack by FitGirl\n• Compressed from 74.4 GB to 49.5 GB\n• Installation takes 15-30 minutes`} rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 resize-none" />
                </div>
              )}
              {/* Download */}
              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-semibold text-white mb-4">Download</h3>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Download Links</label>
                  <textarea value={downloadLinks} onChange={e => setDownloadLinks(e.target.value)} placeholder={`https://drive.google.com/part01\n...`} rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 resize-none" />
                  <p className="text-xs text-zinc-500 mt-1">Each line = separate download part</p>
                </div>
              </div>
              {/* Color */}
              <div className="pt-4 border-t border-zinc-800/50">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Card Color</label>
                <div className="flex gap-2 flex-wrap">{colors.map(c => (<button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-lg transition-all ${color === c ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110" : "hover:scale-105"}`} style={{ backgroundColor: c }} />))}</div>
              </div>
              {/* Submit */}
              <button onClick={handleSubmit} disabled={loading || !title.trim()} className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 mt-4 ${isMovie ? "bg-pink-600 hover:bg-pink-500 disabled:bg-zinc-700" : isSoftware ? "bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700" : isOS ? "bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-700" : "bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700"}`}>
                <Plus size={16} /> {loading ? `Adding ${isMovie ? "Movie" : isSoftware ? "Software" : isOS ? "OS" : "Game"}...` : `Add ${isMovie ? "Movie" : isSoftware ? "Software" : isOS ? "OS" : "Game"}`}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}