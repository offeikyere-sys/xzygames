import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, User, Send, X, Sparkles, Cpu, Loader2, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { apiUrl } from "@/lib/api"
import { useTheme } from "@/lib/ThemeContext"

interface Message {
  role: "ai" | "user"
  text: string
}

interface AIChatModalProps {
  isOpen: boolean
  onClose: () => void
}

const quickReplies = [
  "How do I download games?",
  "Show me popular games",
  "What is Liquid Glass theme?",
  "How to install games",
  "Are games really free?",
  "Tell me about XZY Games",
]

const WELCOME_MESSAGE = "Welcome to XZY Games! I'm your AI assistant powered by D AI. How can I help you today?"

export function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const { theme } = useTheme()
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: WELCOME_MESSAGE },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const userScrolledUp = useRef(false)

  // Track if user has manually scrolled away from the bottom
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight
      userScrolledUp.current = distanceFromBottom > 40
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-scroll only when user hasn't manually scrolled up
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container || userScrolledUp.current) return
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" })
  }, [messages])

  // Send message to backend Groq API
  const fetchAIResponse = useCallback(async (msg: string): Promise<string> => {
    try {
      const res = await fetch(apiUrl("/api/ai/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      return data.response || "*AI returned an empty response*"
    } catch {
      return "*Backend offline — I'm running in offline mode with preset responses. Start the backend server for full AI capabilities.*"
    }
  }, [])

  const handleSend = async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg || isTyping) return

    setMessages((prev) => [...prev, { role: "user", text: msg }])
    setInput("")
    setIsTyping(true)

    // Get response from Groq via backend
    const response = await fetchAIResponse(msg)
    setMessages((prev) => [...prev, { role: "ai", text: response }])
    setIsTyping(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl h-[600px] sm:h-[650px] bg-zinc-900/95 backdrop-blur-2xl border border-zinc-700/40 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800/50 bg-zinc-900/70 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-500/30 flex items-center justify-center">
                <Bot size={20} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-white">XZY AI Assistant</p>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 tracking-wider uppercase">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
                  <Cpu size={12} />
                  Powered by D AI — Ask me anything about the site!
                </p>
              </div>
              <button
                onClick={() => setMessages([{ role: "ai", text: WELCOME_MESSAGE }])}
                className="p-2 rounded-xl hover:bg-zinc-800/50 text-zinc-400 hover:text-red-400 transition-all"
                title="Clear conversation"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-zinc-800/50 text-zinc-400 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles size={14} className="text-blue-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600/20 border border-blue-500/30 text-blue-200 rounded-tr-md"
                        : "bg-zinc-800/50 border border-zinc-700/30 text-zinc-200 rounded-tl-md"
                    }`}
                  >
                    {msg.role === "ai" ? (
                      <div className="ai-markdown">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-inside space-y-0.5 mb-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside space-y-0.5 mb-1">{children}</ol>,
                            li: ({ children }) => <li className="text-zinc-200">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                            em: ({ children }) => <em className="italic text-zinc-300">{children}</em>,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 mt-1">
                      <User size={14} className="text-blue-300" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Loader2 size={14} className="text-blue-400 animate-spin" />
                  </div>
                  <div className="bg-zinc-800/50 border border-zinc-700/30 rounded-2xl px-4 py-3 rounded-tl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-5 py-2 border-t border-zinc-800/30 bg-zinc-900/50">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(reply)}
                    disabled={isTyping}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-zinc-800/50 border border-zinc-700/30 text-[11px] text-zinc-400 hover:text-white hover:bg-zinc-700/50 hover:border-zinc-600/50 transition-all whitespace-nowrap disabled:opacity-50"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-5 py-3 border-t border-zinc-800/50 bg-zinc-900/70 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about XZY Games..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/30 text-sm text-white placeholder-zinc-500 outline-none focus:border-blue-500/40 focus:bg-zinc-800/70 transition-all disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
                >
                  {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <p className={`text-xs mt-2 text-center ${
                theme === "light" 
                  ? "text-zinc-500" 
                  : "text-zinc-400"
              }`}>
                XZY AI is powered by D AI — double-click the 3D robot anytime to open this chat
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}