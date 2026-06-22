import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Save, Gamepad2, Monitor, Upload, Image as ImageIcon, Cpu, MemoryStick, Shield, HardDrive } from "lucide-react"
import { apiUrl } from "@/lib/api"

interface EditGameModalProps {
  isOpen: boolean
  onClose: () => void
  onGameEdited: () => void
  userToken: string
  gameData: {
    id: number
    title: string
    genre: string
    rating: number
    description: string | null
    wallpaper_url: string | null
    download_links: string | null
    trailer_url: string | null
    screenshots: string | null
    color: string | null
    os: string | null
    processor: string | null
    memory: string | null
    graphics: string | null
    storage: string | null
    repack_features: string | null
    download_manager_name: string | null
    download_manager_url: string | null
    usage_guide: string | null
    troubleshooting: string | null
    hypervisor_video_url: string | null
    install_guide_text?: string | null
    install_video_url?: string | null
    type?: string | null
    developer?: string | null
    version?: string | null
    license_type?: string | null
  }
}

const genres = ["Action", "RPG", "Strategy", "Racing", "Horror", "Adventure", "Sports", "Sci-Fi", "Simulation", "Puzzle", "Shooter", "Open World", "Survival", "Fighting", "Arcade", "Casual", "Indie", "Hypervisor"]
const softwareGenres = ["Antivirus & Security", "Browsers", "Design & 3D", "Development Tools", "Multimedia & Audio", "Productivity & Office", "Utilities & System"]
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

export function EditGameModal({ isOpen, onClose, onGameEdited, userToken, gameData }: EditGameModalProps) {
  const [itemType, setItemType] = useState<"game" | "software">((gameData.type as "game" | "software") || "game")
  const [title, setTitle] = useState(gameData.title)
  const [selectedGenres, setSelectedGenres] = useState<string[]>(gameData.genre ? gameData.genre.split(",").map(g => g.trim()).filter(Boolean) : [])
  const [description, setDescription] = useState(gameData.description || "")
  const [downloadLinks, setDownloadLinks] = useState(gameData.download_links || "")
  const [trailerUrl, setTrailerUrl] = useState(gameData.trailer_url || "")
  const [repackFeatures, setRepackFeatures] = useState(gameData.repack_features || "")
  const [usageGuide, setUsageGuide] = useState(gameData.usage_guide || "")
  const [troubleshooting, setTroubleshooting] = useState(gameData.troubleshooting || "")
  const [hypervisorVideoUrl, setHypervisorVideoUrl] = useState(gameData.hypervisor_video_url || "")
  const [installGuideText, setInstallGuideText] = useState(gameData.install_guide_text || "")
  const [installVideoUrl, setInstallVideoUrl] = useState(gameData.install_video_url || "")
  const [developer, setDeveloper] = useState(gameData.developer || "")
  const [version, setVersion] = useState(gameData.version || "")
  const [licenseType, setLicenseType] = useState(gameData.license_type || "")
  const toggleGenre = (g: string) => {
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }
  const [color, setColor] = useState(gameData.color || "#3b82f6")
  const [rating, setRating] = useState(String(gameData.rating))
  const [os, setOs] = useState(gameData.os || "Windows 10/11 64-bit")
  const [processor, setProcessor] = useState(gameData.processor || "Intel Core i5-8400")
  const [memory, setMemory] = useState(gameData.memory || "16 GB RAM")
  const [graphics, setGraphics] = useState(gameData.graphics || "GTX 1060 / RX 580")
  const [storage, setStorage] = useState(gameData.storage || "45 GB available")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string>(gameData.wallpaper_url || "")
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([])
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>(
    gameData.screenshots ? gameData.screenshots.split("\n").filter(l => l.trim()) : []
  )
  
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const screenshotsInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    const updateState = async () => {
      await Promise.resolve()
      if (cancelled) return
      setItemType((gameData.type as "game" | "software") || "game")
      setTitle(gameData.title)
      setSelectedGenres(gameData.genre ? gameData.genre.split(",").map(g => g.trim()).filter(Boolean) : [])
      setDescription(gameData.description || "")
      setDownloadLinks(gameData.download_links || "")
      setTrailerUrl(gameData.trailer_url || "")
      setRepackFeatures(gameData.repack_features || "")
      setUsageGuide(gameData.usage_guide || "")
      setTroubleshooting(gameData.troubleshooting || "")
      setHypervisorVideoUrl(gameData.hypervisor_video_url || "")
      setInstallGuideText(gameData.install_guide_text || "")
      setInstallVideoUrl(gameData.install_video_url || "")
      setDeveloper(gameData.developer || "")
      setVersion(gameData.version || "")
      setLicenseType(gameData.license_type || "")
      setColor(gameData.color || "#3b82f6")
      setRating(String(gameData.rating))
      setOs(gameData.os || "Windows 10/11 64-bit")
      setProcessor(gameData.processor || "Intel Core i5-8400")
      setMemory(gameData.memory || "16 GB RAM")
      setGraphics(gameData.graphics || "GTX 1060 / RX 580")
      setStorage(gameData.storage || "45 GB available")
      setBannerFile(null)
      setBannerPreview(gameData.wallpaper_url || "")
      setScreenshotFiles([])
      setScreenshotPreviews(
        gameData.screenshots ? gameData.screenshots.split("\n").filter(l => l.trim()) : []
      )
    }
    updateState()
    return () => { cancelled = true }
  }, [gameData])

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
    setScreenshotPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!title.trim()) { setError("Title is required"); return }
    setError(""); setLoading(true)
    try {
      let wallpaperUrl = gameData.wallpaper_url || ""
      const screenshotsArray = gameData.screenshots ? gameData.screenshots.split("\n").filter(l => l.trim()) : []

      if (bannerFile) {
        const fd = new FormData(); fd.append("file", bannerFile)
        const r = await fetch(apiUrl("/api/upload"), { method: "POST", headers: { Authorization: `Bearer ${userToken}` }, body: fd })
        if (r.ok) wallpaperUrl = (await r.json()).url
      }
      const newScreenshotUrls: string[] = []
      for (const file of screenshotFiles) {
        const fd = new FormData(); fd.append("file", file)
        const r = await fetch(apiUrl("/api/upload"), { method: "POST", headers: { Authorization: `Bearer ${userToken}` }, body: fd })
        if (r.ok) newScreenshotUrls.push((await r.json()).url)
      }

      const body: Record<string, unknown> = {
        title: title.trim(), genre: selectedGenres.join(", "), description: description.trim(),
        download_links: downloadLinks.trim() || null,
        wallpaper_url: wallpaperUrl || null,
        trailer_url: trailerUrl.trim() || null,
        screenshots: [...screenshotsArray, ...newScreenshotUrls].filter(Boolean).join("\n") || null,
        repack_features: repackFeatures.trim() || null,
        usage_guide: usageGuide.trim() || null,
        troubleshooting: troubleshooting.trim() || null,
        hypervisor_video_url: hypervisorVideoUrl.trim() || null,
        install_guide_text: installGuideText.trim() || null,
        install_video_url: installVideoUrl.trim() || null,
        color, rating: parseFloat(rating) || 0,
        os: os.trim() || null, processor: processor.trim() || null,
        memory: memory.trim() || null, graphics: graphics.trim() || null, storage: storage.trim() || null,
        type: itemType,
        developer: itemType === "software" ? (developer.trim() || null) : null,
        version: itemType === "software" ? (version.trim() || null) : null,
        license_type: itemType === "software" ? (licenseType || null) : null,
      }

      const res = await fetch(apiUrl(`/api/games/${gameData.id}`), {
        method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` }, body: JSON.stringify(body),
      })
      if (res.status === 401) { setError("Session expired. Please sign out and sign back in."); return }
      if (!res.ok) { const d = await res.json(); setError(d.detail || "Failed to update"); return }
      onGameEdited(); onClose()
    } catch { setError("Backend not running. Make sure port 5050 is active.") }
    finally { setLoading(false) }
  }

  const isSoftware = itemType === "software"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 bg-black/80 backdrop-blur-sm px-4"
          onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-zinc-900/95 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${isSoftware ? "bg-purple-500/10 border-purple-500/20" : "bg-blue-500/10 border-blue-500/20"}`}>
                  {isSoftware ? <Monitor size={18} className="text-purple-400" /> : <Gamepad2 size={18} className="text-blue-400" />}
                </div>
                <h2 className="text-lg font-semibold text-white">{isSoftware ? "Edit Software" : "Edit Game"}</h2>
              </div>
              <div className="flex items-center gap-2">
                {/* Game / Software Toggle */}
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
                </div>
                <button onClick={onClose} className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"><X size={18} /></button>
              </div>
            </div>

            {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">{isSoftware ? "Software Title" : "Game Title"} *</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
              </div>

              {/* Software-specific fields */}
              {isSoftware && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Developer</label>
                      <input type="text" value={developer} onChange={e => setDeveloper(e.target.value)} placeholder="e.g. Adobe Inc." className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-purple-500/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Version</label>
                      <input type="text" value={version} onChange={e => setVersion(e.target.value)} placeholder="e.g. 26.0" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-purple-500/50" />
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

              {/* Genres - Checkboxes */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Genre <span className="text-zinc-600">(select multiple)</span></label>
                <div className="flex flex-wrap gap-2">
                  {(isSoftware ? softwareGenres : genres).map(g => (
                    <button key={g} type="button" onClick={() => toggleGenre(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${selectedGenres.includes(g) ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-500/50"}`}>
                      {selectedGenres.includes(g) ? "✓ " : ""}{g}
                    </button>
                  ))}
                </div>
                {selectedGenres.length > 0 && <p className="text-[10px] text-zinc-600 mt-1">Selected: {selectedGenres.join(", ")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Rating</label>
                <input type="number" min="0" max="5" step="0.1" value={rating} onChange={e => setRating(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50 resize-none" />
              </div>

              {/* Install Guide */}
              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-semibold text-white mb-4">How to Install</h3>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Installation Instructions</label>
                  <textarea value={installGuideText} onChange={e => setInstallGuideText(e.target.value)}
                    placeholder={`Step 1: Download all parts from the links above.\nStep 2: Extract Part 01 using WinRAR or 7-Zip.\nStep 3: Run the installer as Administrator.\nStep 4: Follow the installation wizard.\nStep 5: Launch the game from your desktop shortcut.`}
                    rows={5} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors resize-none" />
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

              {/* Hypervisor Guides */}
              {(selectedGenres.includes("Hypervisor") || usageGuide || troubleshooting || hypervisorVideoUrl) && (
                <div className="pt-4 border-t border-zinc-800/50">
                  <h3 className="text-sm font-semibold text-white mb-4">Hypervisor Guides</h3>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">How to Use Hypervisor</label>
                    <textarea value={usageGuide} onChange={e => setUsageGuide(e.target.value)}
                      placeholder="Step-by-step guide on using Hypervisor for this game..."
                      rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors resize-none" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Troubleshooting / Fix Issues</label>
                    <textarea value={troubleshooting} onChange={e => setTroubleshooting(e.target.value)}
                      placeholder="Common issues and fixes for Hypervisor..."
                      rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Hypervisor Video URL</label>
                    <input type="url" value={hypervisorVideoUrl} onChange={e => setHypervisorVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... or direct video link"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
                    <p className="text-[10px] text-zinc-600 mt-1">YouTube, Vimeo, or direct .mp4/.webm link</p>
                  </div>
                </div>
              )}

              {/* Media */}
              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-semibold text-white mb-4">Media</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Banner Image</label>
              <input ref={bannerInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska,video/ogg" onChange={handleBannerSelect} className="hidden" />
                  <div onClick={() => bannerInputRef.current?.click()} className="w-full p-4 rounded-xl bg-zinc-800/50 border border-dashed border-zinc-600/50 hover:border-blue-500/50 cursor-pointer flex flex-col items-center gap-2">
                    {bannerPreview ? <img src={bannerPreview} alt="" className="w-full h-32 object-cover rounded-lg" />
                    : <><Upload size={24} className="text-zinc-500" /><span className="text-sm text-zinc-400">Click to upload banner image</span></>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Screenshots</label>
                  <input ref={screenshotsInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" multiple onChange={handleScreenshotsSelect} className="hidden" />
                  <div onClick={() => screenshotsInputRef.current?.click()} className="w-full p-4 rounded-xl bg-zinc-800/50 border border-dashed border-zinc-600/50 hover:border-blue-500/50 cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon size={24} className="text-zinc-500" /><span className="text-sm text-zinc-400">Click to add more screenshots</span>
                  </div>
                  {screenshotPreviews.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {screenshotPreviews.map((p, i) => (
                        <div key={i} className="relative">
                          <img src={p} alt="" className="w-full h-20 object-cover rounded-lg" />
                          <button onClick={e => { e.stopPropagation(); removeScreenshot(i) }} className="absolute top-1 right-1 p-0.5 rounded-lg bg-red-600/80 text-white"><X size={12} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Trailer URL</label>
                  <input type="url" value={trailerUrl} onChange={e => setTrailerUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
                </div>
              </div>

              {/* Repack Features */}
              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-semibold text-white mb-4">{isSoftware ? "Features" : "Repack Features"}</h3>
                <textarea value={repackFeatures} onChange={e => setRepackFeatures(e.target.value)}
                  placeholder={`• Repack by FitGirl\n• Compressed from 74.4 GB to 49.5 GB\n• Installation takes 15-30 minutes`}
                  rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50 resize-none" />
              </div>

              {/* System Requirements */}
              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-semibold text-white mb-4">System Requirements</h3>
                <div className="space-y-3">
                  {[
                    { icon: Monitor, label: "Operating System", val: os, set: setOs, placeholder: "Windows 10/11 64-bit" },
                    { icon: Cpu, label: "Processor", val: processor, set: setProcessor, placeholder: "Intel Core i5-8400" },
                    { icon: MemoryStick, label: "Memory", val: memory, set: setMemory, placeholder: "16 GB RAM" },
                    { icon: Shield, label: "Graphics", val: graphics, set: setGraphics, placeholder: "GTX 1060 / RX 580" },
                    { icon: HardDrive, label: "Storage", val: storage, set: setStorage, placeholder: "45 GB available" },
                  ].map(({ icon: Icon, label, val, set, placeholder }) => (
                    <div key={label}>
                      <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2"><Icon size={14} /> {label}</label>
                      <input type="text" value={val} onChange={e => set(e.target.value)} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Download */}
              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-semibold text-white mb-4">Download</h3>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Download Links</label>
                  <textarea value={downloadLinks} onChange={e => setDownloadLinks(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50 resize-none" />
                </div>
              </div>

              {/* Color */}
              <div className="pt-4 border-t border-zinc-800/50">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Card Color</label>
                <div className="flex gap-2 flex-wrap">
                  {colors.map(c => (
                    <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-lg transition-all ${color === c ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110" : "hover:scale-105"}`} style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>

              <button onClick={handleSubmit} disabled={loading || !title.trim()}
                className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 mt-4 ${isSoftware ? "bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700" : "bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700"}`}>
                <Save size={16} /> {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}