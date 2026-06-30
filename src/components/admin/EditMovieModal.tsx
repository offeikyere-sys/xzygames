import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Save, Film, Upload, Image as ImageIcon } from "lucide-react"
import { apiUrl } from "@/lib/api"

interface EditMovieModalProps {
  isOpen: boolean
  onClose: () => void
  onMovieEdited: () => void
  userToken: string
  movieData: {
    id: number
    title: string
    genre: string
    year: number | null
    duration: string | null
    rating: number
    description: string | null
    poster_url: string | null
    trailer_url: string | null
    screenshots: string | null
    color: string | null
    director: string | null
    cast: string | null
    download_links: string | null
    type: string | null
  }
}

const movieGenres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Thriller",
  "Sci-Fi",
  "Romance",
  "Adventure",
  "Animation",
  "Documentary",
  "Fantasy",
  "Mystery",
  "Crime",
  "Family",
  "War",
  "Western",
  "Musical",
  "History",
  "Series",
  "Seasonal",
]

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

export function EditMovieModal({ isOpen, onClose, onMovieEdited, userToken, movieData }: EditMovieModalProps) {
  const [title, setTitle] = useState(movieData.title)
  const [selectedGenres, setSelectedGenres] = useState<string[]>(movieData.genre ? movieData.genre.split(",").map(g => g.trim()).filter(Boolean) : [])
  const [movieYear, setMovieYear] = useState(String(movieData.year || ""))
  const [movieDuration, setMovieDuration] = useState(movieData.duration || "")
  const [director, setDirector] = useState(movieData.director || "")
  const [cast, setCast] = useState(movieData.cast || "")
  const [description, setDescription] = useState(movieData.description || "")
  const [downloadLinks, setDownloadLinks] = useState(movieData.download_links || "")
  const [trailerUrl, setTrailerUrl] = useState(movieData.trailer_url || "")
  const [color, setColor] = useState(movieData.color || "#3b82f6")
  const [rating, setRating] = useState(String(movieData.rating))
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string>(movieData.poster_url || "")
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([])
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>(
    movieData.screenshots ? movieData.screenshots.split("\n").filter(l => l.trim()) : []
  )
  
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const screenshotsInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    const updateState = async () => {
      await Promise.resolve()
      if (cancelled) return
      setTitle(movieData.title)
      setSelectedGenres(movieData.genre ? movieData.genre.split(",").map(g => g.trim()).filter(Boolean) : [])
      setMovieYear(String(movieData.year || ""))
      setMovieDuration(movieData.duration || "")
      setDirector(movieData.director || "")
      setCast(movieData.cast || "")
      setDescription(movieData.description || "")
      setDownloadLinks(movieData.download_links || "")
      setTrailerUrl(movieData.trailer_url || "")
      setColor(movieData.color || "#3b82f6")
      setRating(String(movieData.rating))
      setBannerFile(null)
      setBannerPreview(movieData.poster_url || "")
      setScreenshotFiles([])
      setScreenshotPreviews(movieData.screenshots ? movieData.screenshots.split("\n").filter(l => l.trim()) : [])
    }
    updateState()
    return () => { cancelled = true }
  }, [movieData])

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
    setScreenshotPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!title.trim()) { setError("Title is required"); return }
    setError(""); setLoading(true)
    try {
      let posterUrl = movieData.poster_url || ""
      const screenshotsArray = movieData.screenshots ? movieData.screenshots.split("\n").filter(l => l.trim()) : []

      if (bannerFile) {
        const fd = new FormData(); fd.append("file", bannerFile)
        const r = await fetch(apiUrl("/api/upload"), { method: "POST", headers: { Authorization: `Bearer ${userToken}` }, body: fd })
        if (r.ok) posterUrl = (await r.json()).url
      }
      const newScreenshotUrls: string[] = []
      for (const file of screenshotFiles) {
        const fd = new FormData(); fd.append("file", file)
        const r = await fetch(apiUrl("/api/upload"), { method: "POST", headers: { Authorization: `Bearer ${userToken}` }, body: fd })
        if (r.ok) newScreenshotUrls.push((await r.json()).url)
      }

      const body: Record<string, unknown> = {
        title: title.trim(),
        genre: selectedGenres.join(", "),
        year: movieYear ? parseInt(movieYear) : null,
        duration: movieDuration.trim() || null,
        director: director.trim() || null,
        cast: cast.trim() || null,
        description: description.trim(),
        download_links: downloadLinks.trim() || null,
        poster_url: posterUrl || null,
        trailer_url: trailerUrl.trim() || null,
        screenshots: [...screenshotsArray, ...newScreenshotUrls].filter(Boolean).join("\n") || null,
        color,
        rating: parseFloat(rating) || 0,
      }

      const res = await fetch(apiUrl(`/api/movies/${movieData.id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
        body: JSON.stringify(body),
      })
      if (res.status === 401) { setError("Session expired. Please sign out and sign back in."); return }
      if (!res.ok) { const d = await res.json(); setError(d.detail || "Failed to update"); return }
      onMovieEdited(); onClose()
    } catch { setError("Backend not running. Make sure port 5050 is active.") }
    finally { setLoading(false) }
  }

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
                <div className="p-2 rounded-xl border bg-purple-500/10 border-purple-500/20">
                  <Film size={18} className="text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Edit Movie</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"><X size={18} /></button>
            </div>

            {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Movie Title *</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-purple-500/50" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Year</label>
                  <input type="number" min="1900" max="2030" value={movieYear} onChange={e => setMovieYear(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-purple-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Duration</label>
                  <input type="text" value={movieDuration} onChange={e => setMovieDuration(e.target.value)} placeholder="e.g. 2h 15m" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-purple-500/50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Director</label>
                <input type="text" value={director} onChange={e => setDirector(e.target.value)} placeholder="e.g. Christopher Nolan" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-purple-500/50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Cast</label>
                <input type="text" value={cast} onChange={e => setCast(e.target.value)} placeholder="e.g. Leonardo DiCaprio, Joseph Gordon-Levitt" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-purple-500/50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Genre <span className="text-zinc-600">(select multiple)</span></label>
                <div className="flex flex-wrap gap-2">
                  {movieGenres.map(g => (
                    <button key={g} type="button" onClick={() => toggleGenre(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${selectedGenres.includes(g) ? "bg-purple-600/20 text-purple-400 border-purple-500/30" : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-500/50"}`}>
                      {selectedGenres.includes(g) ? "✓ " : ""}{g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Rating (0-10)</label>
                <input type="number" min="0" max="10" step="0.1" value={rating} onChange={e => setRating(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-purple-500/50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-purple-500/50 resize-none" />
              </div>

              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-semibold text-white mb-4">Media</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Poster Image</label>
                  <input ref={bannerInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleBannerSelect} className="hidden" />
                  <div onClick={() => bannerInputRef.current?.click()} className="w-full p-4 rounded-xl bg-zinc-800/50 border border-dashed border-zinc-600/50 hover:border-purple-500/50 cursor-pointer flex flex-col items-center gap-2">
                    {bannerPreview ? <><img src={bannerPreview} alt="" className="w-full h-32 object-cover rounded-lg" /><button onClick={e => { e.stopPropagation(); setBannerFile(null); setBannerPreview("") }} className="absolute top-2 right-2 p-1 rounded bg-red-600/80 text-white text-xs"><X size={14} /></button></> : <><Upload size={24} className="text-zinc-500" /><span className="text-sm text-zinc-400">Click to upload poster</span></>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Screenshots</label>
                  <input ref={screenshotsInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" multiple onChange={handleScreenshotsSelect} className="hidden" />
                  <div onClick={() => screenshotsInputRef.current?.click()} className="w-full p-4 rounded-xl bg-zinc-800/50 border border-dashed border-zinc-600/50 hover:border-purple-500/50 cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon size={24} className="text-zinc-500" /><span className="text-sm text-zinc-400">Click to select screenshots</span>
                  </div>
                  {screenshotPreviews.length > 0 && <div className="mt-3 grid grid-cols-2 gap-2">{screenshotPreviews.map((p, i) => (<div key={i} className="relative"><img src={p} alt="" className="w-full h-20 object-cover rounded-lg" /><button onClick={() => removeScreenshot(i)} className="absolute top-1 right-1 p-0.5 rounded bg-red-600/80 text-white"><X size={12} /></button></div>))}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Trailer URL</label>
                  <input type="url" value={trailerUrl} onChange={e => setTrailerUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-purple-500/50" />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-semibold text-white mb-4">Download</h3>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Download Links</label>
                  <textarea value={downloadLinks} onChange={e => setDownloadLinks(e.target.value)} placeholder={`https://drive.google.com/part01\n...`} rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-purple-500/50 resize-none" />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/50">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Card Color</label>
                <div className="flex gap-2 flex-wrap">{colors.map(c => (<button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-lg transition-all ${color === c ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110" : "hover:scale-105"}`} style={{ backgroundColor: c }} />))}</div>
              </div>

              <button onClick={handleSubmit} disabled={loading || !title.trim()} className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:bg-zinc-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 mt-4">
                <Save size={16} /> {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}