import { useState, useEffect } from "react"
import { BarChart3, Users, Gamepad2, Film, Download, Star, MessageSquare, Activity, TrendingUp, Calendar } from "lucide-react"
import { fetchAdminDashboard } from "@/lib/api"

interface DashboardData {
  total_users: number
  total_games: number
  total_software: number
  total_movies: number
  total_ratings: number
  total_comments: number
  total_activities: number
  new_users_week: number
  activities_week: number
  downloads_today: number
  most_viewed: { item_name: string; item_type: string; cnt: number }[]
  activity_by_day: { day: string; cnt: number }[]
}

export function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminDashboard()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-2 border-blue-500/30 border-t-blue-400 rounded-full animate-spin" />
        <p className="text-zinc-500 text-sm mt-2">Loading dashboard...</p>
      </div>
    )
  }

  if (!data) {
    return <div className="text-center py-12 text-zinc-600">Failed to load dashboard data</div>
  }

  const cards = [
    { label: "Total Users", value: data.total_users, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "Games", value: data.total_games, icon: Gamepad2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Software", value: data.total_software, icon: Download, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { label: "Movies", value: data.total_movies, icon: Film, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { label: "Ratings", value: data.total_ratings, icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
    { label: "Comments", value: data.total_comments, icon: MessageSquare, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
    { label: "Activities", value: data.total_activities, icon: Activity, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { label: "New Users (Week)", value: data.new_users_week, icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 size={22} className="text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`rounded-xl ${card.bg} ${card.border} border p-4 transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">{card.label}</span>
                <Icon size={16} className={card.color} />
              </div>
              <p className="text-2xl font-bold text-white">{card.value.toLocaleString()}</p>
            </div>
          )
        })}
      </div>

      {/* Weekly stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-zinc-900/30 border border-zinc-800/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={14} className="text-cyan-400" />
            <span className="text-xs text-zinc-500 uppercase tracking-wider">This Week</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.activities_week}</p>
          <p className="text-xs text-zinc-600 mt-1">total activities</p>
        </div>

        <div className="rounded-xl bg-zinc-900/30 border border-zinc-800/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Download size={14} className="text-green-400" />
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Downloads Today</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.downloads_today}</p>
          <p className="text-xs text-zinc-600 mt-1">items downloaded</p>
        </div>

        <div className="rounded-xl bg-zinc-900/30 border border-zinc-800/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={14} className="text-blue-400" />
            <span className="text-xs text-zinc-500 uppercase tracking-wider">New Users (Week)</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.new_users_week}</p>
          <p className="text-xs text-zinc-600 mt-1">joined this week</p>
        </div>
      </div>

      {/* Most Viewed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-zinc-900/30 border border-zinc-800/30 p-4">
          <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-blue-400" />
            Most Viewed (All Time)
          </h3>
          {data.most_viewed.length === 0 ? (
            <p className="text-zinc-700 text-xs text-center py-4">No view data yet</p>
          ) : (
            <div className="space-y-1.5">
              {data.most_viewed.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-zinc-700 text-xs w-5 text-right">{i + 1}.</span>
                  <span className="text-zinc-300 truncate flex-1">{item.item_name}</span>
                  <span className="text-[10px] uppercase text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded">{item.item_type}</span>
                  <span className="text-blue-400 font-medium text-xs">{item.cnt} views</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity by Day */}
        <div className="rounded-xl bg-zinc-900/30 border border-zinc-800/30 p-4">
          <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
            <Calendar size={14} className="text-cyan-400" />
            Activity This Week
          </h3>
          {data.activity_by_day.length === 0 ? (
            <p className="text-zinc-700 text-xs text-center py-4">No activity data yet</p>
          ) : (
            <div className="space-y-1.5">
              {data.activity_by_day.map((day, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-zinc-500 w-24 text-xs">{day.day}</span>
                  <div className="flex-1 h-4 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (day.cnt / Math.max(...data.activity_by_day.map(d => d.cnt))) * 100)}%` }}
                    />
                  </div>
                  <span className="text-cyan-400 font-medium text-xs w-8 text-right">{day.cnt}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}