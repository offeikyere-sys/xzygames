import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Search, Menu, X, Sun, Moon, Droplets, Plus, Heart, Gamepad2, Monitor, Settings, Film, Shield, MessageSquare, Disc3 } from "lucide-react"
import { useTheme } from "@/lib/ThemeContext"
import { XzyLogo } from "@/components/ui/XzyLogo"

const gameCategories = ["All", "Action", "RPG", "Strategy", "Racing", "Adventure", "Horror", "Sports", "Sci-Fi", "Simulation", "Puzzle", "Shooter", "Open World", "Survival", "Fighting", "Arcade", "Casual", "Indie", "Hypervisor"]
const softwareCategories = ["All", "Antivirus & Security", "Browsers", "Design & 3D", "Development Tools", "Multimedia & Audio", "Productivity & Office", "Utilities & System"]
const movieCategories = ["All", "Action", "Horror", "Adventure", "Thriller", "Music", "Anime", "Series"]
const osCategories = ["All", "Windows 11", "Windows 10", "22H2", "23H2", "24H2", "25H2", "26H2"]

interface UserInfo {
  id: number
  name: string
  email: string
  token: string
}

interface NavbarProps {
  activeSection: "games" | "software" | "movies" | "os"
  activeCategory: string
  onCategoryChange: (cat: string) => void
  onSectionChange: (section: "games" | "software" | "movies" | "os") => void
  onLogin: () => void
  onSignup: () => void
  onSearch: (query: string) => void
  onHome: () => void
  isHomePage: boolean
  user?: UserInfo | null
  onLogout?: () => void
  onProfile?: () => void
  onSettings?: () => void
  onFavorites?: () => void
  onRequests?: () => void
  onAddGame?: () => void
  onAdminUsers?: () => void
}

export function Navbar({ activeSection, activeCategory, onCategoryChange, onSectionChange, onLogin, onSignup, onSearch, onHome, isHomePage, user, onLogout, onProfile, onSettings, onFavorites, onRequests, onAddGame, onAdminUsers }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const navRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
        hideTimerRef.current = null
      }
    }

    const startHideTimer = () => {
      clearHideTimer()
      hideTimerRef.current = setTimeout(() => {
        setVisible(false)
      }, 5000)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 10) {
        setVisible(true)
        clearHideTimer()
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down → hide
        setVisible(false)
        clearHideTimer()
      } else {
        // Scrolling up → show
        setVisible(true)
        clearHideTimer()
      }
      lastScrollY.current = currentScrollY
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        // Mouse near top edge → show immediately and start 5-sec idle timer
        setVisible(true)
        startHideTimer()
      } else if (window.scrollY > 100 && !navRef.current?.contains(e.target as Node)) {
        // Mouse not on nav and scrolled down → hide
        setVisible(false)
        clearHideTimer()
      }
    }

    // Mouse movement on the navbar itself → show and start 5-sec idle timer
    const handleNavMouseMove = () => {
      setVisible(true)
      startHideTimer()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    // Listen on nav element for idle timeout
    const navEl = navRef.current
    if (navEl) {
      navEl.addEventListener("mousemove", handleNavMouseMove)
    }
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (navEl) {
        navEl.removeEventListener("mousemove", handleNavMouseMove)
      }
      clearHideTimer()
    }
  }, [])

  return (
    <motion.nav
      ref={navRef}
      animate={{ y: visible ? 0 : -120 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50 glass-navbar"
    >
      {/* Main Navbar Row */}
      <div className="flex items-center justify-between h-16 px-2 sm:px-4">
        {/* Left: Logo + Nav Tabs */}
        <div className="flex items-center gap-0 sm:gap-1">
          <div className="flex items-center gap-1 shrink-0 pl-0 sm:pl-0">
            <XzyLogo size={32} />
            <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 whitespace-nowrap">
              XZY Games & Software Hub
            </span>
          </div>

          {/* Nav Tabs - Home / Games / Software / Movies / Request */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            <button
              onClick={onHome}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isHomePage
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onSectionChange("games")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                !isHomePage && activeSection === "games"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Gamepad2 size={14} />
              Games
            </button>
            <button
              onClick={() => onSectionChange("software")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                !isHomePage && activeSection === "software"
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Monitor size={14} />
              Software
            </button>
            <button
              onClick={() => onSectionChange("movies")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                !isHomePage && activeSection === "movies"
                  ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Film size={14} />
              Movies
            </button>
            <button
              onClick={() => onSectionChange("os")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                !isHomePage && activeSection === "os"
                  ? "bg-cyan-600/20 text-cyan-400 border border-cyan-500/30"
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Disc3 size={14} />
              OS
            </button>
            {onRequests && (
              <button
                onClick={() => { onRequests(); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10"
                title="Request Content"
              >
                <MessageSquare size={14} />
                Request
              </button>
            )}
          </div>
        </div>

        {/* Right: Search + Theme + Auth + Mobile */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              searchFocused
                ? "border-blue-500/50 bg-zinc-900"
                : "border-zinc-700/50 bg-zinc-900/50"
            }`}
          >
            <Search size={14} className="text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  onSearch(searchQuery.trim())
                  setSearchQuery("")
                }
              }}
              placeholder="Search..."
              className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-24 lg:w-36"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Mobile search icon button */}
          <button
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen)
              setMobileSearchQuery("")
              if (!mobileSearchOpen) {
                setTimeout(() => {
                  const input = document.getElementById("mobile-search-input")
                  if (input) (input as HTMLInputElement).focus()
                }, 200)
              }
            }}
            className="sm:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Search"
          >
            <Search size={18} />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors glow-btn"
            title={theme === "dark" ? "Switch to liquid glass" : theme === "liquid" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" && <Droplets size={18} />}
            {theme === "liquid" && <Sun size={18} />}
            {theme === "light" && <Moon size={18} />}
          </button>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {user ? (
              <div className="flex items-center gap-1 sm:gap-2">
                {onAddGame && (
                  <button
                    onClick={onAddGame}
                    className="p-2 rounded-lg text-emerald-400 hover:bg-zinc-800/50 transition-all"
                    title="Add Game"
                  >
                    <Plus size={18} />
                  </button>
                )}
                {onAdminUsers && (
                  <button
                    onClick={onAdminUsers}
                    className="p-2 rounded-lg text-blue-400 hover:bg-zinc-800/50 transition-all"
                    title="Manage Users"
                  >
                    <Shield size={18} />
                  </button>
                )}
                <button
                  onClick={onFavorites}
                  className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800/50 transition-all"
                  title="My Favorites"
                >
                  <Heart size={18} />
                </button>
                <button
                  onClick={onProfile}
                  className="flex items-center gap-2 hover:bg-zinc-800/50 rounded-lg px-2 py-1 transition-all"
                  title="Profile"
                >
                  {((user as any).avatar_url) ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700/50">
                      <img src={(user as any).avatar_url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: user.email ? `linear-gradient(135deg, ${["#3b82f6","#a855f7","#10b981","#ef4444","#f59e0b","#ec4899"][Math.abs(user.email.charCodeAt(0) || 0) % 6]}, ${["#3b82f6","#a855f7","#10b981","#ef4444","#f59e0b","#ec4899"][Math.abs(user.email.charCodeAt(0) || 0) % 6]}cc)` : undefined }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm text-zinc-300 hidden sm:inline">{user.name}</span>
                </button>
                {onSettings && (
                  <button
                    onClick={onSettings}
                    className="p-2 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-zinc-800/50 transition-all"
                    title="Settings"
                  >
                    <Settings size={18} />
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all glow-btn"
                >
                  Sign In
                </button>
                <button
                  onClick={onSignup}
                  className="px-3 sm:px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all glow-btn"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Categories Sub-Row - only on Games/Software pages */}
      {!isHomePage && (
        <div className="hidden md:block border-t border-zinc-800/30 bg-black/60">
          <div className="flex items-center gap-1 overflow-x-auto px-4 py-1.5 scrollbar-thin">
            {(activeSection === "games" ? gameCategories : activeSection === "movies" ? movieCategories : activeSection === "os" ? osCategories : softwareCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-sm font-medium transition-all cat-btn ${
                  activeCategory === cat
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 cat-btn-active"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="sm:hidden border-t border-zinc-800/50 bg-black/95 backdrop-blur-xl overflow-hidden"
        >
          <div className="px-4 py-4">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 focus-within:border-blue-500/50 transition-all">
              <Search size={16} className="text-zinc-500 shrink-0" />
              <input
                id="mobile-search-input"
                type="text"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && mobileSearchQuery.trim()) {
                    onSearch(mobileSearchQuery.trim())
                    setMobileSearchOpen(false)
                    setMobileSearchQuery("")
                  }
                }}
                placeholder="Search games & software..."
                className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
              />
              {mobileSearchQuery && (
                <button
                  onClick={() => setMobileSearchQuery("")}
                  className="p-1 rounded text-zinc-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => {
                  if (mobileSearchQuery.trim()) {
                    onSearch(mobileSearchQuery.trim())
                    setMobileSearchOpen(false)
                    setMobileSearchQuery("")
                  }
                }}
                disabled={!mobileSearchQuery.trim()}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white text-sm font-medium transition-all"
              >
                Search
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-zinc-800/50 bg-black/95 backdrop-blur-xl"
        >
          {/* Nav Tabs for Mobile */}
          <div className="px-4 py-3 border-b border-zinc-800/30">
            <div className="flex items-center gap-1">
              <button
                onClick={() => { onHome(); setMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all text-center ${
                  isHomePage
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => { onSectionChange("games"); setMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all text-center ${
                  !isHomePage && activeSection === "games"
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                Games
              </button>
              <button
                onClick={() => { onSectionChange("software"); setMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all text-center ${
                  !isHomePage && activeSection === "software"
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                Software
              </button>
              <button
                onClick={() => { onSectionChange("movies"); setMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all text-center ${
                  !isHomePage && activeSection === "movies"
                    ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => { onSectionChange("os"); setMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all text-center ${
                  !isHomePage && activeSection === "os"
                    ? "bg-cyan-600/20 text-cyan-400 border border-cyan-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                OS
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="px-4 py-3 space-y-1">
            {(activeSection === "games" ? gameCategories : activeSection === "movies" ? movieCategories : activeSection === "os" ? osCategories : softwareCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategoryChange(cat)
                  setMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Auth / User actions */}
          <div className="px-4 py-3 border-t border-zinc-800/50 space-y-2">
            {user ? (
              <div className="flex flex-col gap-2">
                {onAddGame && (
                  <button
                    onClick={() => { onAddGame(); setMenuOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-emerald-400 hover:bg-zinc-800/50 transition-all"
                  >
                    <Plus size={16} /> Add Game
                  </button>
                )}
                {onAdminUsers && (
                  <button
                    onClick={() => { onAdminUsers(); setMenuOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-blue-400 hover:bg-zinc-800/50 transition-all"
                  >
                    <Shield size={16} /> Manage Users
                  </button>
                )}
                <button
                  onClick={() => { onFavorites?.(); setMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-zinc-800/50 transition-all"
                >
                  <Heart size={16} /> My Favorites
                </button>
                 <button
                   onClick={() => { onProfile?.(); setMenuOpen(false); }}
                   className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
                 >
                  {((user as any).avatar_url) ? (
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-zinc-700/50">
                      <img src={(user as any).avatar_url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: user.email ? `linear-gradient(135deg, ${["#3b82f6","#a855f7","#10b981","#ef4444","#f59e0b","#ec4899"][Math.abs(user.email.charCodeAt(0) || 0) % 6]}, ${["#3b82f6","#a855f7","#10b981","#ef4444","#f59e0b","#ec4899"][Math.abs(user.email.charCodeAt(0) || 0) % 6]}cc)` : undefined }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                   Profile
                 </button>
                 {onSettings && (
                   <button
                     onClick={() => { onSettings?.(); setMenuOpen(false); }}
                     className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-blue-400 hover:bg-zinc-800/50 transition-all"
                   >
                     <Settings size={16} />
                     Settings
                   </button>
                 )}
                 <button
                   onClick={() => { onLogout?.(); setMenuOpen(false); }}
                  className="w-full py-2 rounded-lg text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { onLogin(); setMenuOpen(false); }}
                  className="flex-1 py-2 rounded-lg text-sm font-medium text-zinc-400 border border-zinc-700/50 hover:text-white hover:bg-zinc-800/50 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { onSignup(); setMenuOpen(false); }}
                  className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}