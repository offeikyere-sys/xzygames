import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, Gamepad2, Loader2, KeyRound } from "lucide-react"
import { apiUrl } from "@/lib/api"

type Step = "login" | "forgot" | "reset-sent"

export function LoginPage({ onSwitchToSignup, onBack, onLoginSuccess }: {
  onSwitchToSignup: () => void
  onBack: () => void
  onLoginSuccess: (user: any) => void
}) {
  const [step, setStep] = useState<Step>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) { setError("Email is required"); return }
    if (!password) { setError("Password is required"); return }

    setLoading(true)
    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || "Login failed")
        return
      }
      onLoginSuccess({
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

  const handleForgotPassword = async () => {
    if (!email.trim()) { setError("Please enter your email first"); return }
    setError("")
    setLoading(true)
    try {
      const res = await fetch(apiUrl("/api/auth/send-reset-code"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || "Failed to send reset email")
        return
      }
      setResetSent(true)
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
            <h1 className="text-2xl font-bold text-white">
              {step === "login" && "Welcome Back"}
              {step === "forgot" && "Reset Password"}
              {step === "reset-sent" && "Check Your Email"}
            </h1>
            <p className="text-sm text-zinc-500 mt-2">
              {step === "login" && "Sign in to continue to XZY Games & Software Hub"}
              {step === "forgot" && "We'll send you a reset code"}
              {step === "reset-sent" && `We sent a reset code to ${email}`}
            </p>
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

          {step === "login" && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleEmailLogin}
              className="space-y-4"
            >
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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 accent-blue-500" />
                  <span className="text-xs text-zinc-400">Remember me</span>
                </label>
                <button type="button" onClick={() => setStep("forgot")} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" />Signing in...</> : "Sign In"}
              </button>

              <p className="text-xs text-zinc-500 text-center mt-4">
                Don't have an account?{" "}
                <button type="button" onClick={onSwitchToSignup} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign Up
                </button>
              </p>
            </motion.form>
          )}

          {step === "forgot" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {!resetSent ? (
                <>
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
                  <button
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" />Sending...</> : <><KeyRound size={16} />Send Reset Code</>}
                  </button>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto">
                    <Mail size={28} className="text-blue-400" />
                  </div>
                  <p className="text-sm text-zinc-300">We sent a password reset code to <strong className="text-blue-400">{email}</strong></p>
                  <p className="text-xs text-zinc-500">Check your inbox and use the code to reset your password.</p>
                </motion.div>
              )}
              <button onClick={() => { setStep("login"); setResetSent(false); setError("") }} className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                ← Back to Sign In
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}