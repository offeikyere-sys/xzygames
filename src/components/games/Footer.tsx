import { useState } from "react"
import { Gamepad2, Mail, Globe, MessageSquare, Play, X, Monitor } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FooterProps {
  onNavigate?: (page: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null)
  const nav = (page: string) => {
    if (onNavigate) onNavigate(page)
  }

  const supportPages: Record<string, { title: string; body: string }> = {
    "FAQ": {
      title: "Frequently Asked Questions",
      body: "Q: How do I download games?\nA: Browse to any game page, scroll to the download links section, and click each link to download all parts.\n\nQ: Are the games free?\nA: Yes! All games and software on XZY Games are completely free to download.\n\nQ: How do I install a game after downloading?\nA: Extract Part 01 using WinRAR or 7-Zip, then run the installer as Administrator.\n\nQ: Do I need an account?\nA: An account is required to post comments, save favorites, and rate games. Browsing and downloading are free for everyone.",
    },
    "Contact Us": {
      title: "Contact Us",
      body: "For support, inquiries, or feedback, please reach out to us:\n\n📧 Email: support@xzygames.com\n🌐 Website: xzygames.com\n\nWe aim to respond within 24 hours.",
    },
    "Privacy Policy": {
      title: "Privacy Policy",
      body: "XZY Games respects your privacy. We only store:\n\n• Your name and email (for account purposes)\n• Your favorites and comments\n• Basic usage data in local storage\n\nWe do NOT share your personal data with third parties. No tracking cookies are used beyond essential site functionality.",
    },
    "Terms of Service": {
      title: "Terms of Service",
      body: "By using XZY Games, you agree to:\n\n• Use the site for personal, non-commercial purposes only\n• Not redistribute or sell downloaded content\n• Not abuse the commenting or rating systems\n• Not attempt to bypass site security\n\nAll games and software are provided 'as is' without warranty. We reserve the right to update these terms at any time.",
    },
  }

  return (
    <>
      <footer className="relative bg-black border-t border-zinc-800/50 dark:bg-black" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Gamepad2 size={24} className="text-blue-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  XZY GAMES
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Your ultimate destination for the best games, software, and movies. Download, play, and dominate.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all glow-btn"><Globe size={16} /></a>
                <a href="#" className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all glow-btn"><MessageSquare size={16} /></a>
                <a href="#" className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all glow-btn"><Play size={16} /></a>
                <a href="#" className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all glow-btn"><Mail size={16} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => nav("home")} className="text-sm text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0">Home</button></li>
                <li><button onClick={() => nav("games-browse")} className="text-sm text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0">Browse Games</button></li>
                <li><button onClick={() => nav("software-browse")} className="text-sm text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0">Browse Software</button></li>
                <li><button onClick={() => nav("movies-browse")} className="text-sm text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0">Browse Movies</button></li>
                <li><button onClick={() => nav("os-browse")} className="text-sm text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-1"><Monitor size={14} /> Windows OS</button></li>
                <li><button onClick={() => nav("games-view-all")} className="text-sm text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0">Top Downloads</button></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Categories</h3>
              <ul className="space-y-2">
                {["Action", "RPG", "Strategy", "Racing", "Adventure", "Horror", "Sports"].map((link) => (
                  <li key={link}><button onClick={() => nav(link)} className="text-sm text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0">{link}</button></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h3>
              <ul className="space-y-2">
                {Object.keys(supportPages).map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => setModalContent(supportPages[link])}
                      className="text-sm text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} XZY Games. All rights reserved.</p>
            <p className="text-xs text-zinc-500">Built with passion for gaming.</p>
          </div>
        </div>
      </footer>

      {/* Support Content Modal */}
      <AnimatePresence>
        {modalContent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4" onClick={() => setModalContent(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="w-full max-w-md bg-zinc-900/95 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{modalContent.title}</h3>
                <button onClick={() => setModalContent(null)} className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"><X size={18} /></button>
              </div>
              <div className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{modalContent.body}</div>
              <button onClick={() => setModalContent(null)} className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
