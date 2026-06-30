import { useState, useEffect, useRef } from "react"
import { Activity, Eye, Download, Star, MessageSquare } from "lucide-react"
import { fetchActivities } from "@/lib/api"

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

const actionText: Record<string, string> = {
  viewed: "viewed",
  downloaded: "downloaded",
  rated: "rated",
  commented: "commented on",
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchActivities(20)
        setActivities(data)
      } catch {
        // silently fail
      }
    }
    load()
    const interval = setInterval(load, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible || activities.length === 0) return null

  // Duplicate for seamless infinite scroll effect
  const doubled = [...activities, ...activities]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800/50 bg-zinc-950/90 backdrop-blur-xl">
      <div className="flex items-center">
        {/* Label */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-r border-zinc-800/50 cursor-pointer hover:bg-zinc-900/50 transition-colors shrink-0"
          onClick={() => setIsVisible(false)}
          title="Hide activity feed"
        >
          <Activity size={14} className="text-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">LIVE</span>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-zinc-950/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-zinc-950/90 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-0 py-2.5 animate-scroll-ticker"
            style={{
              animation: "scrollTicker 30s linear infinite",
              width: "max-content",
            }}
          >
            {doubled.map((a, i) => {
              const Icon = actionIcons[a.action] || Activity
              const color = actionColors[a.action] || "text-zinc-400"
              return (
                <div
                  key={`${a.id}-${i}`}
                  className="flex items-center gap-2 px-4 whitespace-nowrap text-xs text-zinc-400 border-r border-zinc-800/30"
                >
                  <Icon size={12} className={color} />
                  <span className="font-medium text-zinc-300">{a.user_name}</span>
                  <span className="text-zinc-500">{actionText[a.action] || a.action}</span>
                  <span className="font-medium text-white truncate max-w-[140px]">{a.item_name}</span>
                  <span className="text-zinc-600 text-[10px]">{a.item_type}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsVisible(false)}
          className="px-3 py-2.5 border-l border-zinc-800/50 text-zinc-600 hover:text-zinc-400 transition-colors shrink-0"
          title="Hide"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* CSS for ticker animation */}
      <style>{`
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-ticker {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export function ActivityFeedToggle({ onShow }: { onShow: () => void }) {
  return (
    <button
      onClick={onShow}
      className="fixed bottom-4 right-4 z-50 p-2.5 rounded-xl bg-cyan-900/30 border border-cyan-700/30 text-cyan-400 hover:bg-cyan-900/50 transition-all shadow-lg shadow-cyan-900/10"
      title="Show activity feed"
    >
      <Activity size={18} className="animate-pulse" />
    </button>
  )
}