import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles } from "lucide-react"
import { MessageBubble } from "./MessageBubble"
import { TypingIndicator } from "./TypingIndicator"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm **Neo**, your AI assistant. How can I help you today? 👋",
  },
]

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch("http://localhost:5050/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`)
      }

      const data = await response.json()
      const reply = data.response || "I couldn't process that. Please try again."

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Neo API error:", err)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `⚠️ Could not reach the AI brain. Make sure the Python API server is running on port 5050.\n\nError: ${err instanceof Error ? err.message : "Unknown error"}`,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-blue-400" />
          <h1 className="text-lg font-semibold text-white">Neo</h1>
          <span className="px-2 py-0.5 text-[10px] font-medium text-emerald-400 bg-emerald-400/10 rounded-full border border-emerald-400/20">
            ACTIVE
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-zinc-800 rounded-2xl rounded-bl-sm">
              <TypingIndicator />
            </div>
          </motion.div>
        )}

        {/* Empty spacer for auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-zinc-800 px-4 py-4">
        <div className="flex items-end gap-2 bg-zinc-900 rounded-2xl border border-zinc-700/50 focus-within:border-blue-500/50 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Neo..."
            rows={1}
            className="flex-1 bg-transparent text-white placeholder-zinc-500 px-4 py-3 outline-none resize-none text-sm leading-relaxed max-h-[200px]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="m-2 p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all disabled:cursor-not-allowed shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-zinc-600 text-center mt-2">
          Neo can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  )
}