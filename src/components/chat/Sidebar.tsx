import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquarePlus,
  MessageSquare,
  Trash2,
  PanelLeftClose,
  PanelLeft,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatSession {
  id: string
  title: string
  timestamp: Date
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: "1", title: "Hello, I am D👋", timestamp: new Date() },
  ])
  const [activeId, setActiveId] = useState("1")

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New chat",
      timestamp: new Date(),
    }
    setSessions((prev) => [newSession, ...prev])
    setActiveId(newSession.id)
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSessions((prev) => prev.filter((s) => s.id !== id))
    if (activeId === id && sessions.length > 1) {
      const remaining = sessions.filter((s) => s.id !== id)
      setActiveId(remaining[0].id)
    }
  }

  return (
    <>
      {/* Toggle button (always visible) */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
      >
        {isOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={onToggle}
            />

            {/* Sidebar panel */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-40 h-full w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-zinc-800">
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors border border-zinc-700/50"
                >
                  <MessageSquarePlus size={16} />
                  New chat
                </button>
              </div>

              {/* Sessions */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setActiveId(session.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-colors group",
                      activeId === session.id
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                    )}
                  >
                    <MessageSquare size={14} className="shrink-0" />
                    <span className="truncate flex-1">{session.title}</span>
                    <button
                      onClick={(e) => handleDelete(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-zinc-700 transition-all"
                    >
                      <Trash2 size={12} className="text-zinc-500 hover:text-red-400" />
                    </button>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-zinc-800">
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors">
                  <Settings size={16} />
                  Settings
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}