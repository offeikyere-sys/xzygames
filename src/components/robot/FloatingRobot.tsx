"use client"
import { useState, useCallback, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { SplineScene } from "@/components/ui/splite"
import { Activity, Wifi, WifiOff } from "lucide-react"

interface FloatingRobotProps {
  onDoubleClick: () => void
  chatOpen: boolean
}

export function FloatingRobot({ onDoubleClick, chatOpen }: FloatingRobotProps) {
  const [isOnline] = useState(true)
  const [brainActivity, setBrainActivity] = useState(0.65)
  const [position, setPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth - 400 : 800,
    y: typeof window !== "undefined" ? window.innerHeight / 2 - 200 : 400,
  })
  const controls = useAnimation()

  // Brain activity simulation
  useEffect(() => {
    const brainInterval = setInterval(() => {
      setBrainActivity(Math.random())
    }, 1500)
    return () => clearInterval(brainInterval)
  }, [])

  // Idle animation sequence: gentle float + periodic wave
  useEffect(() => {
    const runSequence = async () => {
      // Always do gentle float
      await controls.start({
        y: [0, -6, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      })
    }

    runSequence()

    // Periodic "hello" wave animation every 10 seconds
    const waveInterval = setInterval(async () => {
      await controls.start({
        rotate: [0, -8, 8, -8, 8, 0],
        scale: [1, 1.05, 1],
        transition: { duration: 0.8, ease: "easeInOut" },
      })
      // Resume floating
      controls.start({
        y: [0, -6, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      })
    }, 10000)

    return () => {
      clearInterval(waveInterval)
    }
  }, [controls])

  // When chat opens, do a little bounce
  useEffect(() => {
    if (chatOpen) {
      controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.6, ease: "easeOut" },
      })
    }
  }, [chatOpen, controls])

  const handleDragEnd = useCallback((_: any, info: any) => {
    setPosition({ x: info.point.x, y: info.point.y })
  }, [])

  // Generate stable particle positions once using lazy state initialization
  const [particlePositions] = useState(() => [
    { top: 20 + Math.random() * 60, left: -10 + Math.random() * 20, yOffset: -20 - Math.random() * 20, duration: 3 + Math.random() * 2 },
    { top: 20 + Math.random() * 60, left: -10 + Math.random() * 20, yOffset: -20 - Math.random() * 20, duration: 3 + Math.random() * 2 },
    { top: 20 + Math.random() * 60, left: -10 + Math.random() * 20, yOffset: -20 - Math.random() * 20, duration: 3 + Math.random() * 2 },
    { top: 20 + Math.random() * 60, left: -10 + Math.random() * 20, yOffset: -20 - Math.random() * 20, duration: 3 + Math.random() * 2 },
  ])

  return (
    <>
      {/* Draggable Robot */}
      <motion.div
        drag
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onDoubleClick={onDoubleClick}
        className="fixed z-30 cursor-grab active:cursor-grabbing select-none"
        style={{ left: position.x, top: position.y }}
        whileDrag={{ scale: 1.08 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={controls}
        transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
      >
        {/* Ring glow pulse behind robot */}
        <motion.div
          className="absolute -inset-4 rounded-full bg-blue-500/10 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Robot container */}
        <div className="relative">
          {/* Spline 3D Robot */}
          <div className="w-64 h-64 md:w-72 md:h-72">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          {/* Floating particles around robot */}
          {Array.from({ length: 4 }).map((_, i) => {
            const particle = particlePositions[i]
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
                style={{
                  top: `${particle.top}%`,
                  left: `${particle.left}%`,
                }}
                animate={{
                  y: [0, particle.yOffset],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeOut",
                }}
              />
            )
          })}

          {/* Status badges below robot */}
          <div className="flex items-center justify-center gap-3 mt-1">
            {/* Online dot */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-zinc-800/50">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isOnline ? (
                  <Wifi size={10} className="text-emerald-400" />
                ) : (
                  <WifiOff size={10} className="text-red-400" />
                )}
              </motion.div>
              <span className="text-[10px] font-medium text-emerald-400/80">
                AI
              </span>
            </div>

            {/* Brain activity mini bar */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-zinc-800/50">
              <Activity size={10} className="text-blue-400" />
              <div className="w-10 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  animate={{ width: `${20 + brainActivity * 60}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Double-click hint (fades out) */}
          {!chatOpen && (
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -10 }}
              transition={{ duration: 3, delay: 2 }}
            >
              <span className="text-[10px] text-zinc-500 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-zinc-800/30">
                Double-click to chat
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}