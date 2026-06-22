import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, User, Gamepad2, Send, Loader2 } from "lucide-react"
import { apiUrl } from "@/lib/api"

export function SignupPage({ onSwitchToSignup, onBack, onSignupSuccess }: {
  onSwitchToSignup: () => void
  onBack: () => void
  onSignupSuccess: (user: any) => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculateStrength = (pw: string) => {
    let strength = 0
    if (pw.length >= 6) strength++
    if (pw.length >= 8) strength++
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) strength++
    if (/\d/.test(pw)) strength++
    if (/[^A-Za-z0-9]/.test(pw)) strength++
    return strength
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setPasswordStrength(calculateStrength(value))
  }

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500"
    if (passwordStrength <= 2) return "bg-orange-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    if (passwordStrength <= 4) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return "Weak"
    if (passwordStrength <= 2) return "Fair"
    if (passwordStrength <= 3) return "Good"
    if (passwordStrength <= 4) return "Strong"
    return "Very Strong"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) { setError("Name is required"); return }
    if (!email.trim()) { setError("Email is required"); return }
    if (!password) { setError("Password is required"); return }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return }
    if (password !== confirmPassword) { setError("Passwords don't match"); return }

    setLoading(true)
    try {
      const res = await fetch(apiUrl("/api/auth/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || "Failed to create account")
        return
      }
      onSignupSuccess({
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
        is_admin: data.is_admin || 0,
        email_verified: data.email_verified || 1,
      })
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm text-zinc-500 hover:text-blue-400 transition-colors"
        >
          ← Back to XZY Games & Software Hub
        </motion.button>

        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
              <Gamepad2 size={24} className="text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-sm text-zinc-500 mt-2">Sign up for XZY Games & Software Hub</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
            >
              {error}
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              {password && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div className={`h-full ${getStrengthColor()} rounded-full`} initial={{ width: 0 }} animate={{ width: `${(passwordStrength / 5) * 100}%` }} transition={{ duration: 0.3 }} />
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">{getStrengthLabel()}</p>
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" />Creating Account...</> : <><Send size={16} />Create Account</>}
            </button>

            <p className="text-xs text-zinc-500 text-center mt-4">
              Already have an account?{" "}
              <button type="button" onClick={onSwitchToSignup} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign In
              </button>
            </p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}
