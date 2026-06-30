import { useState, useCallback, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Activity, Wifi, WifiOff } from "lucide-react"

interface Position {
  x: number
  y: number
}

interface FloatingRobotProps {
  onDoubleClick: () => void
  chatOpen: boolean
}

export function FloatingRobot({ onDoubleClick, chatOpen }: FloatingRobotProps) {
  const [isOnline] = useState(true)
  const [brainActivity, setBrainActivity] = useState(0.65)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const [position, setPosition] = useState<Position>({
    x: typeof window !== "undefined" ? window.innerWidth - 400 : 800,
    y: typeof window !== "undefined" ? window.innerHeight / 2 - 200 : 400,
  })

  const controls = useAnimation()
  const [perfMode, setPerfMode] = useState(false)

  useEffect(() => {
    const update = () => {
      const enabled = document?.documentElement?.classList?.contains('perf-mode')
      setPerfMode(Boolean(enabled))
    }
    update()
    const obs = new MutationObserver(() => update())
    if (document?.documentElement) {
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    }
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (perfMode) return
    const brainInterval = setInterval(() => {
      setBrainActivity(Math.random())
    }, 1500)
    return () => clearInterval(brainInterval)
  }, [perfMode])

  useEffect(() => {
    if (perfMode) {
      controls.set({ y: 0, rotate: 0, scale: 1 })
      return
    }

    const runSequence = async () => {
      await controls.start({
        y: [0, -6, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      })
    }
    runSequence()

    const waveInterval = setInterval(async () => {
      await controls.start({
        rotate: [0, -8, 8, -8, 8, 0],
        scale: [1, 1.05, 1],
        transition: { duration: 0.8, ease: "easeInOut" },
      })
      controls.start({
        y: [0, -6, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      })
    }, 10000)

    return () => clearInterval(waveInterval)
  }, [controls, perfMode])

  useEffect(() => {
    if (perfMode) return
    if (chatOpen) {
      controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.6, ease: "easeOut" },
      })
    }
  }, [chatOpen, controls, perfMode])

  // Track mouse for eye-following
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Double-click detector
  const robotRef = useRef<HTMLDivElement>(null)
  const lastClickTime = useRef(0)
  
  useEffect(() => {
    const robotEl = robotRef.current
    if (!robotEl) return

    const handleClick = (e: MouseEvent) => {
      const now = Date.now()
      const timeDiff = now - lastClickTime.current
      
      if (timeDiff < 400 && timeDiff > 0) {
        e.preventDefault()
        e.stopPropagation()
        onDoubleClick()
        lastClickTime.current = 0
      } else {
        lastClickTime.current = now
      }
    }

    robotEl.addEventListener('click', handleClick, true)
    return () => robotEl.removeEventListener('click', handleClick, true)
  }, [onDoubleClick])

  const handleDragStart = useCallback(() => {}, [])
  const handleDrag = useCallback((_: any, info: any) => {}, [])
  const handleDragEnd = useCallback((_: any, info: any) => {
    setPosition({ x: info.point.x, y: info.point.y })
  }, [])

  const [particlePositions] = useState(() => [
    { top: 20 + Math.random() * 60, left: -10 + Math.random() * 20, yOffset: -20 - Math.random() * 20, duration: 3 + Math.random() * 2 },
    { top: 20 + Math.random() * 60, left: -10 + Math.random() * 20, yOffset: -20 - Math.random() * 20, duration: 3 + Math.random() * 2 },
    { top: 20 + Math.random() * 60, left: -10 + Math.random() * 20, yOffset: -20 - Math.random() * 20, duration: 3 + Math.random() * 2 },
    { top: 20 + Math.random() * 60, left: -10 + Math.random() * 20, yOffset: -20 - Math.random() * 20, duration: 3 + Math.random() * 2 },
  ])

  // Calculate eye movement based on mouse position
  const eyeOffsetX = Math.max(-3, Math.min(3, (mousePos.x - window.innerWidth / 2) / 300))
  const eyeOffsetY = Math.max(-3, Math.min(3, (mousePos.y - window.innerHeight / 2) / 300))

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="fixed z-30 select-none pointer-events-none"
        style={{ left: position.x, top: position.y }}
        whileDrag={{ scale: 1.08 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={controls}
        transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
      >
        <motion.div
          className="absolute -inset-4 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div 
          ref={robotRef}
          className="relative cursor-grab active:cursor-grabbing pointer-events-auto"
          style={{ width: '320px', height: '320px' }}
        >
          <div className="w-64 h-64 md:w-72 md:h-64 relative z-0 flex items-center justify-center">
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl" />
                
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-blue-500/50 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                  <div className="flex gap-3">
                    <motion.div
                      className="w-4 h-4 md:w-5 md:h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                      animate={{
                        scale: [1, 1.2, 1],
                        x: eyeOffsetX,
                        y: eyeOffsetY,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      className="w-4 h-4 md:w-5 md:h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                      animate={{
                        scale: [1, 1.2, 1],
                        x: eyeOffsetX,
                        y: eyeOffsetY,
                      }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                    />
                  </div>
                  
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-1 h-6 bg-zinc-600 mx-auto" />
                    <motion.div
                      className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {!perfMode && Array.from({ length: 4 }).map((_, i) => {
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

          <div className="flex items-center justify-center gap-3 mt-1">
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
              <span className="text-[10px] font-medium text-emerald-400/80">AI</span>
            </div>

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