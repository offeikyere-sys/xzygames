import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Search, Trash2, Shield, Mail, Calendar, MessageCircle, Heart, X } from "lucide-react"
import { apiUrl } from "@/lib/api"

interface UserInfo {
  id: number
  name: string
  email: string
  avatar_color: string
  avatar_url: string
  is_admin: number
  email_verified: number
  created_at: string
  comment_count: number
  favorite_count: number
}

interface AdminUsersPageProps {
  userToken: string
  onBack: () => void
}

export function AdminUsersPage({ userToken, onBack }: AdminUsersPageProps) {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(apiUrl("/api/admin/users"), {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      } else {
        setError("Failed to load users")
      }
    } catch {
      setError("Backend not running")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDeleteUser = async (userId: number) => {
    setDeleting(true)
    setError("")
    try {
      const res = await fetch(apiUrl(`/api/admin/users/${userId}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
      })
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId))
        setSuccess("User deleted successfully")
        setTimeout(() => setSuccess(""), 3000)
      } else {
        const data = await res.json()
        setError(data.detail || "Failed to delete user")
      }
    } catch {
      setError("Backend not running")
    } finally {
      setDeleting(false)
      setDeleteConfirm(null)
    }
  }

  const filteredUsers = users.filter(u => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  })

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric"
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </motion.button>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Shield size={16} />
            <span className="text-sm font-medium">Admin Panel</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield size={20} className="text-blue-400" />
                  Manage Users
                </h1>
                <p className="text-sm text-zinc-500 mt-1">
                  {users.length} registered user{users.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 w-full sm:w-auto">
                <Search size={14} className="text-zinc-500 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full sm:w-64"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-zinc-500 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-400">
                {success}
              </div>
            )}

            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="h-16 rounded-xl bg-zinc-800/30 animate-pulse" />
                ))}
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="space-y-2">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/20 border border-zinc-800/30 hover:bg-zinc-800/40 transition-all"
                  >
                    {/* Avatar */}
                    <div className="shrink-0">
                      {user.avatar_url ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700/50">
                          <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ background: user.avatar_color || "#3b82f6" }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white truncate">{user.name}</span>
                        {user.is_admin === 1 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                            Admin
                          </span>
                        )}
                        {user.email_verified === 1 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-500/20 text-green-400 border border-green-500/30 shrink-0">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                        <span className="flex items-center gap-1"><Mail size={10} />{user.email}</span>
                        <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(user.created_at)}</span>
                        <span className="flex items-center gap-1"><MessageCircle size={10} />{user.comment_count}</span>
                        <span className="flex items-center gap-1"><Heart size={10} />{user.favorite_count}</span>
                      </div>
                    </div>

                    {/* Delete button */}
                    {deleteConfirm === user.id ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={deleting}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-all disabled:opacity-50"
                        >
                          {deleting ? "..." : "Confirm"}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1.5 rounded-lg border border-zinc-700/50 text-zinc-400 hover:text-white text-xs font-medium transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(user.id)}
                        disabled={user.is_admin === 1}
                        className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                        title={user.is_admin === 1 ? "Cannot delete admin" : "Delete user"}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search size={32} className="text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm">
                  {searchQuery ? `No users matching "${searchQuery}"` : "No users found"}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}