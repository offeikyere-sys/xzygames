import { useState, useEffect } from "react"
import { Trash2, Eye, Download, Star, MessageSquare, Activity, RefreshCw } from "lucide-react"
import { fetchActivities, clearActivities } from "@/lib/api"

interface Activity {
  id: number
  user_name: string
  action: string
  item_type: string
  item_name: string
  created_at: string
}

const actionIcons: Record<string, typeof Eye> = {
  viewed: Eye,
  downloaded: Download,
  rated: Star,
  commented: MessageSquare,
}

const actionColors: Record<string, string> = {
  viewed: "text-blue-400",
  downloaded: "text-green-400",
  rated: "text-yellow-400",
  commented: "text-purple-400",
}

export function AdminActivityPanel() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [clearing, setClearing] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await fetchActivities(100)
      setActivities(data)
    } catch { /* silent */ }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleClear = async () => {
    if (!confirm("Clear all activity logs? This cannot be undone.")) return
    setClearing(true)
    try {
      await clearActivities()
      setActivities([])
    } catch { /* silent */ }
    setClearing(false)
  }

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr + "Z")
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const mins = Math.floor(diffMs / 60000)
    if (mins < 1) return "just now"
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Live Activity Log</h3>
          <span className="text-xs text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded-full">{activities.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleClear}
            disabled={clearing || activities.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/20 border border-red-800/30 text-red-400 hover:bg-red-900/40 disabled:opacity-40 transition-colors text-xs"
          >
            <Trash2 size={13} />
            {clearing ? "Clearing..." : "Clear All"}
          </button>
        </div>
      </div>

      {/* Activity list */}
      {loading && activities.length === 0 ? (
        <div className="text-center py-8">
          <div className="inline-block w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-zinc-600 text-sm mt-2">Loading activity...</p>
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-8 bg-zinc-900/30 rounded-xl border border-zinc-800/30">
          <Activity size={32} className="text-zinc-700 mx-auto mb-2" />
          <p className="text-zinc-600 text-sm">No activity recorded yet</p>
          <p className="text-zinc-700 text-xs mt-1">Activities will appear as users browse the site</p>
        </div>
      ) : (
        <div className="space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin">
          {activities.map((a) => {
            const Icon = actionIcons[a.action] || Activity
            const color = actionColors[a.action] || "text-zinc-400"
            return (
              <div
                key={a.id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors"
              >
                <Icon size={13} className={`${color} shrink-0`} />
                <span className="text-sm font-medium text-zinc-300 min-w-[80px] truncate">{a.user_name}</span>
                <span className="text-xs text-zinc-600 capitalize">{a.action}</span>
                <span className="text-sm text-white truncate flex-1">{a.item_name}</span>
                <span className="text-[10px] uppercase text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded">{a.item_type}</span>
                <span className="text-[10px] text-zinc-700 min-w-[50px] text-right">{formatTime(a.created_at)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}