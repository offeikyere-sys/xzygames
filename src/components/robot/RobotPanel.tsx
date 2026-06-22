import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Wifi, WifiOff } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/splite"

export function RobotPanel() {
  const [isOnline, setIsOnline] = useState(true)
  const [brainActivity, setBrainActivity] = useState(0)

  // Simulate brain activity
  useEffect(() => {
    const interval = setInterval(() => {
      setBrainActivity(Math.random())
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // Toggle online status periodically for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline((prev) => !prev)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full h-full bg-black/[0.96] relative overflow-hidden rounded-none border-0">
      {/* Aceternity-style SVG Spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* 3D Spline Robot Scene */}
      <div className="absolute inset-0 z-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Overlay gradient at bottom for status readability */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

      {/* Status overlay */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-3">
        {/* Online/Offline indicator */}
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
          <span
            className={`text-sm font-medium ${
              isOnline ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        {/* Brain activity bar */}
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-blue-400" />
          <div className="w-32 h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{ width: `${20 + brainActivity * 60}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-zinc-400 w-8">
            {Math.round(brainActivity * 100)}%
          </span>
        </div>

        {/* Signal indicator */}
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-4 bg-blue-500/60 rounded-full"
              animate={{
                height: [4, 12 + i * 4, 4],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
          <span className="text-xs text-zinc-500 ml-2">Signal</span>
        </div>
      </div>

      {/* Model name badge */}
      <motion.div
        className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-zinc-900/70 border border-zinc-700/50 text-[10px] text-zinc-400 backdrop-blur-sm"
        animate={{ borderColor: ["rgba(63,63,70,0.5)", "rgba(59,130,246,0.3)", "rgba(63,63,70,0.5)"] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        D AI Model v1.0
      </motion.div>
    </Card>
  )
}