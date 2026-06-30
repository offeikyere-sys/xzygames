import { motion } from "framer-motion"

export function GameCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50">
      <div className="h-48 bg-zinc-800/50 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-800/50 rounded w-3/4 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-zinc-800/50 rounded w-1/4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
          <div className="h-3 bg-zinc-800/50 rounded w-1/5 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center bg-black">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex gap-12">
          <div className="flex-1 space-y-6">
            <div className="h-4 w-40 bg-zinc-800/50 rounded relative overflow-hidden">
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </div>
            <div className="h-16 w-96 bg-zinc-800/50 rounded relative overflow-hidden">
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }} />
            </div>
            <div className="h-4 w-80 bg-zinc-800/50 rounded relative overflow-hidden">
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
            </div>
          </div>
          <div className="flex-1 h-[500px] bg-zinc-800/20 rounded-3xl relative overflow-hidden">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/10 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </div>
      </div>
    </div>
  )
}