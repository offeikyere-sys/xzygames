import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Calendar, ArrowLeft, Heart, Download, User, Save, X, Camera, Settings } from "lucide-react"
import { apiUrl } from "@/lib/api"
import { BlurImage } from "@/components/ui/BlurImage"

interface UserInfo {
  id: number
  name: string
  email: string
  token: string
}

interface ProfilePageProps {
  user: UserInfo
  onBack: () => void
  onLogout: () => void
  onSettings?: () => void
}

const AVATAR_COLORS = ["#3b82f6", "#a855f7", "#10b981", "#ef4444", "#f59e0b", "#ec4899", "#06b6d4", "#14b8a6"]

export function ProfilePage({ user, onBack, onLogout, onSettings }: ProfilePageProps) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[Math.abs(user.name.charCodeAt(0)) % AVATAR_COLORS.length])
  const [avatarUrl, setAvatarUrl] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState<{ downloads: number; favorites: number; comments: number } | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch(apiUrl("/api/auth/me"), {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.avatar_url) setAvatarUrl(data.avatar_url)
      })
      .catch(() => {})
  }, [user.token])

  useEffect(() => {
    fetch(apiUrl("/api/auth/stats"), {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {})
  }, [user.token])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB")
      return
    }

    setUploading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("file", file)

      const uploadRes = await fetch(apiUrl("/api/auth/upload-avatar"), {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData,
      })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) {
        setError(uploadData.detail || "Upload failed")
        return
      }

      // Save avatar_url to profile
      const res = await fetch(apiUrl("/api/auth/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ avatar_url: uploadData.url }),
      })
      if (res.ok) {
        setAvatarUrl(uploadData.url)
        const stored = JSON.parse(localStorage.getItem("xzy-user") || "{}")
        stored.avatar_url = uploadData.url
        localStorage.setItem("xzy-user", JSON.stringify(stored))
        setSuccess("Avatar updated!")
        setTimeout(() => setSuccess(""), 3000)
      }
    } catch {
      setError("Upload failed. Make sure backend is running.")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setError("")
    setSuccess("")

    if (!name.trim()) { setError("Name is required"); return }
    if (!email.trim()) { setError("Email is required"); return }
    if (password && password.length < 6) { setError("Password must be at least 6 characters"); return }
    if (password && password !== confirmPassword) { setError("Passwords don't match"); return }

    setSaving(true)
    try {
      const body: Record<string, string> = { name: name.trim(), email: email.trim(), avatar_color: avatarColor }
      if (password) body.password = password

      const res = await fetch(apiUrl("/api/auth/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.detail || "Failed to update profile")
        return
      }

      const data = await res.json()
      const stored = JSON.parse(localStorage.getItem("xzy-user") || "{}")
      stored.name = data.name
      stored.email = data.email
      localStorage.setItem("xzy-user", JSON.stringify(stored))

      setSuccess("Profile updated successfully!")
      setPassword("")
      setConfirmPassword("")
      setEditing(false)

      setTimeout(() => setSuccess(""), 3000)
    } catch {
      setError("Backend not running")
    } finally {
      setSaving(false)
    }
  }

  const cancelEdit = () => {
    setName(user.name)
    setEmail(user.email)
    setPassword("")
    setConfirmPassword("")
    setError("")
    setSuccess("")
    setEditing(false)
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 backdrop-blur-xl mb-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative group shrink-0">
              {avatarUrl ? (
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-zinc-700/50">
                  <BlurImage src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" wrapperClassName="w-full h-full" />
                </div>
              ) : (
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}cc)` }}
                >
                  <span className="text-3xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <label className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
                <Camera size={20} className="text-white" />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" disabled={uploading} />
              </label>
              {uploading && (
                <div className="absolute inset-0 rounded-2xl bg-black/70 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left w-full">
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 text-left">Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 text-left">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 text-left">Avatar Color</label>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {AVATAR_COLORS.map((c) => (
                        <button key={c} type="button" onClick={() => setAvatarColor(c)}
                          className={`w-8 h-8 rounded-lg border-2 transition-all ${avatarColor === c ? "border-white scale-110" : "border-transparent"}`}
                          style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 text-left">New Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter new password" className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 text-left">Confirm New Password</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50" />
                  </div>
                  {error && <p className="text-sm text-red-400 text-left">{error}</p>}
                  {success && <p className="text-sm text-green-400 text-left">{success}</p>}
                  <div className="flex items-center gap-3">
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-50"><Save size={16} />{saving ? "Saving..." : "Save Changes"}</button>
                    <button onClick={cancelEdit} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700/50 text-zinc-400 hover:text-white transition-all text-sm"><X size={16} />Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                      <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-zinc-400">
                        <Mail size={14} />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-zinc-500"><Calendar size={14} /><span className="text-sm">Joined recently</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all text-sm shrink-0"><User size={16} />Edit Profile</button>
                      {onSettings && (
                        <button onClick={onSettings} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all text-sm shrink-0"><Settings size={16} />Settings</button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-6 justify-center sm:justify-start">
                    <div className="text-center"><div className="text-xl font-bold text-white">{stats?.downloads ?? 0}</div><div className="text-xs text-zinc-500">Downloads</div></div>
                    <div className="text-center"><div className="text-xl font-bold text-white">{stats?.favorites ?? 0}</div><div className="text-xs text-zinc-500">Favorites</div></div>
                    <div className="text-center"><div className="text-xl font-bold text-white">{stats?.comments ?? 0}</div><div className="text-xs text-zinc-500">Comments</div></div>
                  </div>
                  <div className="mt-6 flex items-center gap-3 justify-center sm:justify-start">
                    <button onClick={onLogout} className="px-4 py-2 rounded-lg border border-zinc-700/50 text-sm text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-all">Sign Out</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/30 hover:border-zinc-700/50 transition-all text-left">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20"><Download size={20} className="text-blue-400" /></div>
            <div><h3 className="text-sm font-semibold text-white">My Downloads</h3><p className="text-xs text-zinc-500 mt-1">Games you've downloaded</p></div>
          </motion.button>
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/30 hover:border-zinc-700/50 transition-all text-left">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20"><Heart size={20} className="text-red-400" /></div>
            <div><h3 className="text-sm font-semibold text-white">My Favorites</h3><p className="text-xs text-zinc-500 mt-1">Your saved games</p></div>
          </motion.button>
        </div>
      </div>
    </div>
  )
}