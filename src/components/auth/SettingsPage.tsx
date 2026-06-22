import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, Lock, ArrowLeft, Camera, Save, 
  Calendar, Heart, Download, MessageCircle, LogOut,
  Settings as SettingsIcon, CheckCircle, AlertTriangle,
  Eye, EyeOff
} from "lucide-react"
import { apiUrl } from "@/lib/api"
import { BlurImage } from "@/components/ui/BlurImage"

interface UserInfo {
  id: number
  name: string
  email: string
  token: string
}

interface SettingsPageProps {
  user: UserInfo
  onBack: () => void
  onLogout: () => void
}

type SettingsTab = "profile" | "security" | "account"

const AVATAR_COLORS = ["#3b82f6", "#a855f7", "#10b981", "#ef4444", "#f59e0b", "#ec4899", "#06b6d4", "#14b8a6"]

export function SettingsPage({ user, onBack, onLogout }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")

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
            <SettingsIcon size={16} />
            <span className="text-sm font-medium">Settings</span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:w-56 shrink-0"
          >
            <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
              <TabButton
                icon={<User size={16} />}
                label="Profile"
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              />
              <TabButton
                icon={<Lock size={16} />}
                label="Security"
                active={activeTab === "security"}
                onClick={() => setActiveTab("security")}
              />
              <TabButton
                icon={<SettingsIcon size={16} />}
                label="Account Info"
                active={activeTab === "account"}
                onClick={() => setActiveTab("account")}
              />
            </nav>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <ProfileSettings key="profile" user={user} />
              )}
              {activeTab === "security" && (
                <SecuritySettings key="security" user={user} />
              )}
              {activeTab === "account" && (
                <AccountSettings key="account" user={user} onLogout={onLogout} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ TAB BUTTON ============

function TabButton({ icon, label, active, onClick }: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
        active
          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

// ============ PROFILE SETTINGS ============

function ProfileSettings({ user }: { user: UserInfo }) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[Math.abs(user.name.charCodeAt(0)) % AVATAR_COLORS.length])
  const [avatarUrl, setAvatarUrl] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [saving, setSaving] = useState(false)
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

    setSaving(true)
    try {
      const body: Record<string, string> = { name: name.trim(), email: email.trim(), avatar_color: avatarColor }

      // Update via backend
      const res = await fetch(apiUrl("/api/auth/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.detail || "Failed to sync with backend")
        return
      }

      const data = await res.json()
      const stored = JSON.parse(localStorage.getItem("xzy-user") || "{}")
      stored.name = data.name
      stored.email = data.email
      localStorage.setItem("xzy-user", JSON.stringify(stored))

      setSuccess("Profile updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch {
      setError("Backend not running")
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <User size={18} className="text-blue-400" />
          Profile Settings
        </h2>

        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-zinc-800/50">
          <div className="relative group shrink-0">
            {avatarUrl ? (
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-zinc-700/50">
                <BlurImage src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" wrapperClassName="w-full h-full" />
              </div>
            ) : (
              <div
                className="w-28 h-28 rounded-2xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}cc)` }}
              >
                <span className="text-4xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <label className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
              <Camera size={22} className="text-white" />
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" disabled={uploading} />
            </label>
            {uploading && (
              <div className="absolute inset-0 rounded-2xl bg-black/70 flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-white">Profile Avatar</p>
            <p className="text-xs text-zinc-500 mt-1">Click the avatar to upload a new image. JPG, PNG, GIF, WebP up to 5MB.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white text-sm outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Avatar Color</label>
            <div className="flex items-center gap-2 flex-wrap">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAvatarColor(c)}
                  className={`w-9 h-9 rounded-xl border-2 transition-all ${avatarColor === c ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-400">
              {success}
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============ SECURITY SETTINGS ============

function SecuritySettings({ user }: { user: UserInfo }) {
  // Password change
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  // General
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [changingPassword, setChangingPassword] = useState(false)

  const handleChangePassword = async () => {
    setError("")
    setSuccess("")

    if (!newPassword || newPassword.length < 6) { setError("New password must be at least 6 characters"); return }
    if (newPassword !== confirmNewPassword) { setError("New passwords don't match"); return }

    setChangingPassword(true)
    try {
      // Update via backend
      const res = await fetch(apiUrl("/api/auth/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ password: newPassword }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.detail || "Failed to change password")
        return
      }

      setSuccess("Password changed successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
      setTimeout(() => setSuccess(""), 3000)
    } catch {
      setError("Failed to change password")
    } finally {
      setChangingPassword(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Change Password Section */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Lock size={18} className="text-blue-400" />
          Change Password
        </h2>

        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPw ? "text" : "password"}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showNewPw ? "text" : "password"}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPw ? "text" : "password"}
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPw(!showConfirmPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-400">
              {success}
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleChangePassword}
              disabled={changingPassword}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Save size={16} />
              {changingPassword ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============ ACCOUNT SETTINGS ============

function AccountSettings({ user, onLogout }: { user: UserInfo; onLogout: () => void }) {
  const [stats, setStats] = useState<{ downloads: number; favorites: number; comments: number } | null>(null)
  const [emailVerified, setEmailVerified] = useState<boolean>(false)
  const [createdAt, setCreatedAt] = useState("")

  useEffect(() => {
    fetch(apiUrl("/api/auth/me"), {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmailVerified(!!data.email_verified)
        if (data.created_at) {
          setCreatedAt(new Date(data.created_at).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
          }))
        }
      })
      .catch(() => {})

    fetch(apiUrl("/api/auth/stats"), {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {})
  }, [user.token])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Account Details */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <User size={18} className="text-blue-400" />
          Account Details
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-zinc-800/30">
            <span className="text-sm text-zinc-400">Name</span>
            <span className="text-sm text-white font-medium">{user.name}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-zinc-800/30">
            <span className="text-sm text-zinc-400">Email</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-medium">{user.email}</span>
              {emailVerified ? (
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle size={12} /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-yellow-400">
                  <AlertTriangle size={12} /> Unverified
                </span>
              )}
            </div>
          </div>
          {createdAt && (
            <div className="flex items-center justify-between py-3 border-b border-zinc-800/30">
              <span className="text-sm text-zinc-400">Member Since</span>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-zinc-500" />
                <span className="text-sm text-white font-medium">{createdAt}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Heart size={18} className="text-red-400" />
          Your Activity
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
            <Download size={20} className="text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats?.downloads ?? 0}</div>
            <div className="text-xs text-zinc-500 mt-1">Downloads</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
            <Heart size={20} className="text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats?.favorites ?? 0}</div>
            <div className="text-xs text-zinc-500 mt-1">Favorites</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
            <MessageCircle size={20} className="text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats?.comments ?? 0}</div>
            <div className="text-xs text-zinc-500 mt-1">Comments</div>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <LogOut size={18} className="text-red-400" />
          Sign Out
        </h2>
        <p className="text-sm text-zinc-500 mb-4">
          Sign out of your account on this device. You can sign back in anytime.
        </p>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-red-300 text-sm font-medium transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </motion.div>
  )
}