import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/splite"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { Activity, Wifi, WifiOff } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function NeoLayout() {
  const [isOnline, setIsOnline] = useState(true)
  const [brainActivity, setBrainActivity] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBrainActivity(Math.random())
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline((prev) => !prev)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen w-screen bg-black flex overflow-hidden">
      {/* LEFT: Chat Panel - wider */}
      <div className="flex-1 border-r border-zinc-800">
        <ChatPanel />
      </div>

      {/* RIGHT: 3D Robot Panel - narrower */}
      <div className="w-[420px] xl:w-[480px] relative overflow-hidden bg-gradient-to-b from-zinc-900/30 to-black shrink-0">
        {/* Spotlight effect */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

        {/* 3D Spline Robot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 md:w-[450px] md:h-[450px]">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Status overlay at bottom */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3 z-10">
          {/* Online/Offline */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={isOnline ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isOnline ? (
                <Wifi size={14} className="text-emerald-400" />
              ) : (
                <WifiOff size={14} className="text-red-400" />
              )}
            </motion.div>
            <span className={`text-sm font-medium ${isOnline ? "text-emerald-400" : "text-red-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          {/* Brain activity */}
          <div className="flex items-center gap-3">
            <Activity size={14} className="text-blue-400" />
            <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                animate={{ width: `${20 + brainActivity * 60}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs text-zinc-400 w-8">{Math.round(brainActivity * 100)}%</span>
          </div>

          {/* Signal */}
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-4 bg-blue-500/60 rounded-full"
                animate={{ height: [4, 12 + i * 4, 4], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
            <span className="text-xs text-zinc-500 ml-2">Signal</span>
          </div>
        </div>

        {/* Model badge */}
        <motion.div
          className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-zinc-900/70 border border-zinc-700/50 text-[10px] text-zinc-400 backdrop-blur-sm"
          animate={{ borderColor: ["rgba(63,63,70,0.5)", "rgba(59,130,246,0.3)", "rgba(63,63,70,0.5)"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          D AI Model v1.0
        </motion.div>
      </div>
    </div>
  )
}