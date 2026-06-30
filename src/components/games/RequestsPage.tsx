import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { apiUrl } from "@/lib/api"
import { Gamepad2, Monitor, Film, Send, Trash2, Sparkles, Clock, User, MessageSquare } from "lucide-react"

interface RequestItem {
  id: number
  type: string
  title: string
  submitter_name: string
  description: string
  created_at: string
}

export function RequestsPage({ isAdmin, userToken }: { isAdmin?: boolean; userToken?: string }) {
  const [requests, setRequests] = useState<RequestItem[]>([])
  const [type, setType] = useState("game")
  const [title, setTitle] = useState("")
  const [submitterName, setSubmitterName] = useState("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const res = await fetch(apiUrl("/api/requests"))
      const data = await res.json()
      setRequests(data || [])
    } catch {
      // silently fail
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setMessage("Please enter a title")
      return
    }
    setSubmitting(true)
    setMessage("")
    try {
      const res = await fetch(apiUrl("/api/requests"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title: title.trim(),
          submitter_name: submitterName.trim() || "Anonymous",
          description: description.trim(),
        }),
      })
      if (res.ok) {
        const newReq = await res.json()
        setRequests([newReq, ...requests])
        setTitle("")
        setDescription("")
        setMessage("Request submitted! Thanks for the suggestion.")
      } else {
        const err = await res.json().catch(() => ({ detail: "Failed to submit" }))
        setMessage(err.detail || "Failed to submit")
      }
    } catch {
      setMessage("Network error. Try again.")
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: number) => {
    if (!userToken) return
    try {
      const res = await fetch(apiUrl(`/api/requests/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (res.ok) {
        setRequests(requests.filter((r) => r.id !== id))
      }
    } catch {
      // silently fail
    }
  }

  const typeIcon = (t: string) => {
    if (t === "game") return <Gamepad2 size={14} className="text-blue-400" />
    if (t === "software") return <Monitor size={14} className="text-emerald-400" />
    return <Film size={14} className="text-purple-400" />
  }

  const typeLabel = (t: string) => {
    if (t === "game") return "Game"
    if (t === "software") return "Software"
    return "Movie"
  }

  const typeColor = (t: string) => {
    if (t === "game") return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    if (t === "software") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    return "bg-purple-500/10 text-purple-400 border-purple-500/30"
  }

  return (
    <section className="relative py-20 bg-black min-h-screen">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-xs font-medium text-zinc-300">Suggest content for the community</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400">
              Request Content
            </span>
          </h1>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Can't find what you're looking for? Submit a request and the community can vote it up.
            Everyone can see what's been requested.
          </p>
        </motion.div>

        {/* Submit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 mb-10"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-blue-400" />
            Make a Request
          </h2>

          {message && (
            <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${
              message.includes("submitted")
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/10 text-red-400 border border-red-500/30"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              {["game", "software", "movie"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    type === t
                      ? typeColor(t) + " border"
                      : "text-zinc-500 hover:text-white hover:bg-zinc-800/50 border-transparent"
                  }`}
                >
                  {typeIcon(t)}
                  {typeLabel(t)}
                </button>
              ))}
            </div>

            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Please upload Final Fantasy VII Remake"
                className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 outline-none focus:border-blue-500/50 transition-all"
                required
              />
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={submitterName}
                onChange={(e) => setSubmitterName(e.target.value)}
                placeholder="Your name (optional)"
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 outline-none focus:border-blue-500/50 transition-all"
              />
              <button
                type="submit"
                disabled={submitting || !title.trim()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                {submitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock size={18} className="text-purple-400" />
            All Requests ({requests.length})
          </h2>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-zinc-900/50 animate-pulse" />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/30 rounded-2xl border border-zinc-800/30">
              <MessageSquare size={40} className="mx-auto text-zinc-700 mb-3" />
              <p className="text-zinc-500 text-sm">No requests yet. Be the first!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 hover:border-zinc-700/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${typeColor(req.type)}`}>
                          {typeIcon(req.type)}
                          {typeLabel(req.type)}
                        </span>
                        <span className="text-[10px] text-zinc-600">
                          {new Date(req.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-white truncate">{req.title}</h3>
                      {req.description && (
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{req.description}</p>
                      )}
                      <div className="flex items-center gap-1 mt-2">
                        <User size={10} className="text-zinc-600" />
                        <span className="text-[10px] text-zinc-600">{req.submitter_name}</span>
                      </div>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(req.id)}
                        className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                        title="Delete request"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}