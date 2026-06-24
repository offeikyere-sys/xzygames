import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/games/Navbar"
import { HeroSection } from "@/components/games/HeroSection"
import { SectionPad } from "@/components/games/SectionPad"
import { BrowseAll } from "@/components/games/BrowseAll"
import { RecentlyViewed } from "@/components/games/RecentlyViewed"
import { addRecentItem } from "@/lib/recentItems"
import { FeaturedGames } from "@/components/games/FeaturedGames"
import { TopDownloads } from "@/components/games/TopDownloads"
import { FeaturedSoftware } from "@/components/games/FeaturedSoftware"
import { TopSoftware } from "@/components/games/TopSoftware"
import { FeaturedMovies } from "@/components/movies/FeaturedMovies"
import { TopDownloadsMovies } from "@/components/movies/TopDownloadsMovies"
import { Footer } from "@/components/games/Footer"
import { CategoryPage } from "@/components/games/CategoryPage"
import { GameDetailPage } from "@/components/games/GameDetailPage"
import { RequestsPage } from "@/components/games/RequestsPage"
import { MovieDetailPage } from "@/components/movies/MovieDetailPage"
import { LoginPage } from "@/components/auth/LoginPage"
import { SignupPage } from "@/components/auth/SignupPage"
import { ProfilePage } from "@/components/auth/ProfilePage"
import { SettingsPage } from "@/components/auth/SettingsPage"
import { FavoritesPage } from "@/components/games/FavoritesPage"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import { SearchResults } from "@/components/games/SearchResults"
import { AddGameModal } from "@/components/admin/AddGameModal"
import { EditMovieModal } from "@/components/admin/EditMovieModal"
import { AdminUsersPage } from "@/components/admin/AdminUsersPage"
import { AdminActivityPanel } from "@/components/admin/AdminActivityPanel"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { ActivityFeed, ActivityFeedToggle } from "@/components/ui/ActivityFeed"
import { apiUrl } from "@/lib/api"

type Page =
  | "home"
  | "games-browse"
  | "software-browse"
  | "movies-browse"
  | "games-view-all"
  | "software-view-all"
  | "movies-view-all"
  | "login"
  | "signup"
  | "profile"
  | "settings"
  | "favorites"
  | "requests"
  | "game"
  | "movie"
  | "search"
  | "admin-users"
  | string

interface GameInfo {
  id?: number
  title: string
  genre: string
  rating: number
  downloads: number
  color: string
}

interface UserInfo {
  id: number
  name: string
  email: string
  token: string
  is_admin: number
}

export function NeoGamesLayout() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null)
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [cameFromSearch, setCameFromSearch] = useState(false)
  const [cameFromViewAll, setCameFromViewAll] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(() => {
    const saved = localStorage.getItem("xzy-user")
    return saved ? JSON.parse(saved) : null
  })
  const [addGameOpen, setAddGameOpen] = useState(false)
  const [editMovieOpen, setEditMovieOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [showActivityFeed, setShowActivityFeed] = useState(true)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  // Refresh user data (especially avatar_url) from backend on mount
  useEffect(() => {
    const saved = localStorage.getItem("xzy-user")
    if (!saved) return
    const parsed = JSON.parse(saved)
    if (!parsed.token) return
    fetch(apiUrl("/api/auth/me"), {
      headers: { Authorization: `Bearer ${parsed.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          const updated = { ...parsed, avatar_url: data.avatar_url || "" }
          localStorage.setItem("xzy-user", JSON.stringify(updated))
          setUser(updated)
        }
      })
      .catch(() => {})
  }, [])

  // Remember the section user was browsing so category page can go back correctly
  const [categorySection, setCategorySection] = useState<"games" | "software" | "movies">("games")

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]
    const pressed: string[] = []
    const handler = (e: KeyboardEvent) => {
      pressed.push(e.key)
      if (pressed.length > konamiCode.length) pressed.shift()
      if (pressed.join(",") === konamiCode.join(",")) {
        setShowAdminPanel(true)
        pressed.length = 0
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // Scroll position preservation: save positions per page key
  const scrollPositions = useRef<Record<string, number>>({})

  // Save scroll position before page changes
  const previousPageRef = useRef<Page>("home")

  // Track page transitions to restore scroll positions
  useEffect(() => {
    const prev = previousPageRef.current
    // Save current scroll position for the previous page
    scrollPositions.current[prev] = window.scrollY
    previousPageRef.current = currentPage

    // Restore scroll position if we have one, else scroll to top
    const savedPos = scrollPositions.current[currentPage]
    if (savedPos !== undefined && savedPos > 0) {
      // Use requestAnimationFrame to wait for DOM to render
      requestAnimationFrame(() => window.scrollTo(0, savedPos))
    }
  }, [currentPage])

  // Determine if we're in games or software browsing mode
  const isCategoryPage = currentPage !== "home" &&
    currentPage !== "games-browse" &&
    currentPage !== "software-browse" &&
    currentPage !== "movies-browse" &&
    currentPage !== "games-view-all" &&
    currentPage !== "software-view-all" &&
    currentPage !== "movies-view-all" &&
    currentPage !== "login" &&
    currentPage !== "signup" &&
    currentPage !== "profile" &&
    currentPage !== "settings" &&
    currentPage !== "favorites" &&
    currentPage !== "requests" &&
    currentPage !== "game" &&
    currentPage !== "movie" &&
    currentPage !== "search" &&
    currentPage !== "admin-users"
  const activeSection: "games" | "software" | "movies" = (isCategoryPage || currentPage === "game" || currentPage === "movie" || currentPage === "search") ? categorySection : (currentPage === "software-browse" || currentPage === "software-view-all" ? "software" : currentPage === "movies-browse" || currentPage === "movies-view-all" ? "movies" : "games")

  const handleCategoryClick = (cat: string) => {
    if (cat === "All") {
      setActiveCategory("All")
      if (categorySection === "software") {
        setCurrentPage("software-browse")
      } else if (categorySection === "movies") {
        setCurrentPage("movies-browse")
      } else {
        setCurrentPage("games-browse")
      }
    } else {
      setActiveCategory(cat)
      setCategorySection(activeSection)
      setCurrentPage(cat)
    }
    window.scrollTo(0, 0)
  }

  const handleGameClick = (game: GameInfo) => {
    setSelectedGame(game)
    setCameFromSearch(currentPage === "search")
    setCameFromViewAll(currentPage === "games-view-all" || currentPage === "software-view-all" || currentPage === "movies-view-all")
    setCategorySection(activeSection)
    setCurrentPage("game")
    window.scrollTo(0, 0)
    addRecentItem(game as any)
  }

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie)
    setCategorySection("movies")
    setCurrentPage("movie")
    window.scrollTo(0, 0)
  }

  const handleSectionChange = (section: "games" | "software" | "movies") => {
    setActiveCategory("All")
    setCategorySection(section)
    if (section === "games") {
      setCurrentPage("games-browse")
    } else if (section === "software") {
      setCurrentPage("software-browse")
    } else {
      setCurrentPage("movies-browse")
    }
    window.scrollTo(0, 0)
  }

  const handleBrowseGames = () => {
    setActiveCategory("All")
    setCategorySection("games")
    setCurrentPage("games-browse")
    window.scrollTo(0, 0)
  }

  const handleBrowseSoftware = () => {
    setActiveCategory("All")
    setCategorySection("software")
    setCurrentPage("software-browse")
    window.scrollTo(0, 0)
  }

  const handleBrowseMovies = () => {
    setActiveCategory("All")
    setCategorySection("movies")
    setCurrentPage("movies-browse")
    window.scrollTo(0, 0)
  }

  const handleBackToHome = () => {
    setCurrentPage("home")
    window.scrollTo(0, 0)
  }

  // Dynamic color theming
  useEffect(() => {
    if (selectedGame && currentPage === "game") {
      document.documentElement.style.setProperty("--game-color", selectedGame.color)
    } else {
      document.documentElement.style.setProperty("--game-color", "#3b82f6")
    }
  }, [selectedGame, currentPage])

  const handleLogin = () => {
    setCurrentPage("login")
    window.scrollTo(0, 0)
  }

  const handleSignup = () => {
    setCurrentPage("signup")
    window.scrollTo(0, 0)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCategorySection(activeSection)
    setCurrentPage("search")
    window.scrollTo(0, 0)
  }

  const handleLoginSuccess = (userData: UserInfo) => {
    setUser(userData)
    localStorage.setItem("xzy-user", JSON.stringify(userData))
    setCurrentPage("home")
    window.scrollTo(0, 0)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("xzy-token")
    localStorage.removeItem("xzy-user")
    setCurrentPage("home")
    window.scrollTo(0, 0)
  }

  const handleProfile = () => {
    setCurrentPage("profile")
    window.scrollTo(0, 0)
  }

  const handleSettings = () => {
    setCurrentPage("settings")
    window.scrollTo(0, 0)
  }

  const handleFavorites = () => {
    setCurrentPage("favorites")
    window.scrollTo(0, 0)
  }

  const handleRequests = () => {
    setCurrentPage("requests")
    window.scrollTo(0, 0)
  }

  const handleAdminUsers = () => {
    setCurrentPage("admin-users")
    window.scrollTo(0, 0)
  }

  const handleGameAdded = useCallback(() => {
    setRefreshKey((k) => k + 1)
    setAddGameOpen(false)
  }, [])

  const handleMovieEdited = useCallback(() => {
    setRefreshKey((k) => k + 1)
    setEditMovieOpen(false)
    setEditingMovie(null)
  }, [])

  const handleEditMovie = useCallback((movie: any) => {
    setEditingMovie(movie)
    setEditMovieOpen(true)
  }, [])

  const handleDeleteGame = useCallback(async (gameId: number) => {
    if (!user?.token) return
    try {
      const res = await fetch(apiUrl(`/api/games/${gameId}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      })
      if (res.ok) {
        setRefreshKey((k) => k + 1)
      }
    } catch {
      // silently fail
    }
  }, [user])

  const handleDeleteMovie = useCallback(async (movieId: number) => {
    if (!user?.token) return
    try {
      const res = await fetch(apiUrl(`/api/movies/${movieId}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      })
      if (res.ok) {
        setRefreshKey((k) => k + 1)
      }
    } catch {
      // silently fail
    }
  }, [user])

  const hideNav = currentPage === "login" || currentPage === "signup"

  const handleFooterNavigate = (page: string) => {
    if (page === "home") {
      setCurrentPage("home")
    } else if (page === "games-browse") {
      setActiveCategory("All")
      setCategorySection("games")
      setCurrentPage("games-browse")
    } else if (page === "software-browse") {
      setActiveCategory("All")
      setCategorySection("software")
      setCurrentPage("software-browse")
    } else if (page === "movies-browse") {
      setActiveCategory("All")
      setCategorySection("movies")
      setCurrentPage("movies-browse")
    } else if (page === "games-view-all") {
      setCurrentPage("games-view-all")
    } else if (page === "software-view-all") {
      setCurrentPage("software-view-all")
    } else if (page === "movies-view-all") {
      setCurrentPage("movies-view-all")
    } else {
      // It's a category name — navigate to it
      setActiveCategory(page)
      setCategorySection("games")
      setCurrentPage(page)
    }
    window.scrollTo(0, 0)
  }

  // For navbar: the active category label shown is different for browse pages
  const navActiveCategory = currentPage === "games-browse" || currentPage === "software-browse" || currentPage === "movies-browse"
    ? activeCategory
    : currentPage

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden game-themed">
      {!hideNav && (
        <Navbar
          activeSection={activeSection}
          activeCategory={navActiveCategory}
          onCategoryChange={handleCategoryClick}
          onSectionChange={handleSectionChange}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onSearch={handleSearch}
          onHome={handleBackToHome}
          isHomePage={currentPage === "home"}
          user={user}
          onLogout={handleLogout}
          onProfile={handleProfile}
          onSettings={handleSettings}
          onFavorites={handleFavorites}
          onRequests={handleRequests}
          onAddGame={user?.is_admin === 1 ? () => setAddGameOpen(true) : undefined}
          onAdminUsers={user?.is_admin === 1 ? handleAdminUsers : undefined}
        />
      )}

      <AnimatePresence mode="wait">
        {/* ===== HOME PAGE ===== */}
        {currentPage === "home" && (
          <motion.div
            key={"home" + refreshKey}
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <HeroSection
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              activeSection={activeSection}
              isHomePage={true}
              onBrowse={() => {
                document.getElementById("browse-all")?.scrollIntoView({ behavior: "smooth" })
              }}
            />

            {/* Section Pads - only on home page */}
            <section className="py-16 bg-black">
              <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <SectionPad
                    type="games"
                    onBrowse={handleBrowseGames}
                    isAdmin={user?.is_admin === 1}
                    userToken={user?.token}
                  />
                  <SectionPad
                    type="software"
                    onBrowse={handleBrowseSoftware}
                    isAdmin={user?.is_admin === 1}
                    userToken={user?.token}
                  />
                  <SectionPad
                    type="movies"
                    onBrowse={handleBrowseMovies}
                    isAdmin={user?.is_admin === 1}
                    userToken={user?.token}
                  />
                </div>
              </div>
            </section>

            {/* Unified Browse All section - games, software & movies */}
            <BrowseAll
              onGameClick={(item: any) => {
                if (item._type === "movie") {
                  handleMovieClick(item)
                } else {
                  handleGameClick(item)
                }
              }}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteGame={handleDeleteGame}
            />

            <RecentlyViewed
              onGameClick={handleGameClick}
              isAdmin={user?.is_admin === 1}
              onDeleteGame={handleDeleteGame}
              refreshKey={refreshKey}
            />

            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {/* ===== GAMES BROWSE PAGE ===== */}
        {currentPage === "games-browse" && (
          <motion.div
            key={"games-browse" + refreshKey}
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <HeroSection
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              activeSection={activeSection}
              isHomePage={false}
              onBrowse={() => {
                document.getElementById("featured-games")?.scrollIntoView({ behavior: "smooth" })
              }}
            />

            {/* Only games sections */}
            <FeaturedGames
              activeCategory={activeCategory}
              onGameClick={handleGameClick}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteGame={handleDeleteGame}
              onViewAll={() => { setCurrentPage("games-view-all"); window.scrollTo(0, 0) }}
            />
            <TopDownloads
              onGameClick={handleGameClick}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteGame={handleDeleteGame}
              onViewAll={() => { setCurrentPage("games-view-all"); window.scrollTo(0, 0) }}
            />

            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {/* ===== SOFTWARE BROWSE PAGE ===== */}
        {currentPage === "software-browse" && (
          <motion.div
            key={"software-browse" + refreshKey}
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <HeroSection
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              activeSection={activeSection}
              isHomePage={false}
              onBrowse={() => {
                document.getElementById("featured-software")?.scrollIntoView({ behavior: "smooth" })
              }}
            />

            {/* Only software sections - no games, no pads */}
            <FeaturedSoftware
              onSoftwareClick={handleGameClick}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteSoftware={handleDeleteGame}
              onViewAll={() => { setCurrentPage("software-view-all"); window.scrollTo(0, 0) }}
            />
            <TopSoftware
              onSoftwareClick={handleGameClick}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteSoftware={handleDeleteGame}
              onViewAll={() => { setCurrentPage("software-view-all"); window.scrollTo(0, 0) }}
            />

            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {/* ===== MOVIES BROWSE PAGE ===== */}
        {currentPage === "movies-browse" && (
          <motion.div
            key={"movies-browse" + refreshKey}
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <HeroSection
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              activeSection={activeSection}
              isHomePage={false}
              onBrowse={() => {
                document.getElementById("featured-movies")?.scrollIntoView({ behavior: "smooth" })
              }}
            />

            {/* Movies sections */}
            <FeaturedMovies
              activeCategory={activeCategory}
              onMovieClick={handleMovieClick}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteMovie={handleDeleteMovie}
              onEditMovie={handleEditMovie}
              onViewAll={() => { setCurrentPage("movies-view-all"); window.scrollTo(0, 0) }}
            />
            <TopDownloadsMovies
              onMovieClick={handleMovieClick}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteMovie={handleDeleteMovie}
              onEditMovie={handleEditMovie}
              onViewAll={() => { setCurrentPage("movies-view-all"); window.scrollTo(0, 0) }}
            />

            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {/* ===== GAMES VIEW ALL PAGE ===== */}
        {currentPage === "games-view-all" && (
          <motion.div
            key={"games-view-all" + refreshKey}
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <BrowseAll
              onGameClick={handleGameClick}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteGame={handleDeleteGame}
              typeFilter="game"
              onBack={() => setCurrentPage("games-browse")}
            />
            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {/* ===== SOFTWARE VIEW ALL PAGE ===== */}
        {currentPage === "software-view-all" && (
          <motion.div
            key={"software-view-all" + refreshKey}
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <BrowseAll
              onGameClick={handleGameClick}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteGame={handleDeleteGame}
              typeFilter="software"
              onBack={() => setCurrentPage("software-browse")}
            />
            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {/* ===== MOVIES VIEW ALL PAGE ===== */}
        {currentPage === "movies-view-all" && (
          <motion.div
            key={"movies-view-all" + refreshKey}
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <BrowseAll
              onGameClick={(item: any) => handleMovieClick(item)}
              refreshKey={refreshKey}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteGame={handleDeleteMovie}
              typeFilter="movie"
              onBack={() => setCurrentPage("movies-browse")}
            />
            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {currentPage === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <LoginPage onSwitchToSignup={handleSignup} onBack={handleBackToHome} onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {currentPage === "signup" && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SignupPage onSwitchToSignup={handleLogin} onBack={handleBackToHome} onSignupSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {currentPage === "profile" && user && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ProfilePage user={user} onBack={handleBackToHome} onLogout={handleLogout} onSettings={handleSettings} />
          </motion.div>
        )}

        {currentPage === "settings" && user && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SettingsPage user={user} onBack={handleBackToHome} onLogout={handleLogout} />
          </motion.div>
        )}

        {currentPage === "favorites" && user && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <FavoritesPage userToken={user.token} onBack={handleBackToHome} onGameClick={handleGameClick} />
            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {currentPage === "requests" && (
          <div key="requests">
            <RequestsPage isAdmin={user?.is_admin === 1} userToken={user?.token} />
            <Footer onNavigate={handleFooterNavigate} />
          </div>
        )}

        {currentPage === "game" && selectedGame && (
          <motion.div
            key="game-detail"
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <GameDetailPage game={selectedGame} onBack={() => {
              if (cameFromSearch) {
                setCameFromSearch(false)
                setCurrentPage("search")
              } else if (cameFromViewAll) {
                setCameFromViewAll(false)
                if (categorySection === "software") {
                  setCurrentPage("software-view-all")
                } else if (categorySection === "movies") {
                  setCurrentPage("movies-view-all")
                } else {
                  setCurrentPage("games-view-all")
                }
              } else if (categorySection === "software") {
                setCurrentPage("software-browse")
              } else if (categorySection === "movies") {
                setCurrentPage("movies-browse")
              } else {
                setCurrentPage("games-browse")
              }
              window.scrollTo(0, 0)
            }} onGameClick={handleGameClick} userToken={user?.token} isAdmin={user?.is_admin === 1} />
            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {currentPage === "movie" && selectedMovie && (
          <motion.div
            key="movie-detail"
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <MovieDetailPage 
              movieId={selectedMovie.id} 
              onBack={() => {
                setCurrentPage("movies-browse")
                window.scrollTo(0, 0)
              }} 
              userToken={user?.token} 
              isAdmin={user?.is_admin === 1}
              onDeleteMovie={handleDeleteMovie}
              onEditMovie={(movie) => {
                setEditingMovie(movie)
                setEditMovieOpen(true)
              }}
            />
            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}

        {currentPage === "admin-users" && user && (
          <motion.div
            key="admin-users"
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <AdminUsersPage userToken={user.token} onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentPage === "search" && (
          <motion.div
            key="search"
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SearchResults query={searchQuery} onBack={handleBackToHome} onGameClick={handleGameClick} />
            <Footer />
          </motion.div>
        )}

        {/* Category pages (for games/movies categories when clicked) */}
        {currentPage !== "home" &&
          currentPage !== "games-browse" &&
          currentPage !== "software-browse" &&
          currentPage !== "movies-browse" &&
          currentPage !== "games-view-all" &&
          currentPage !== "software-view-all" &&
          currentPage !== "movies-view-all" &&
          currentPage !== "login" &&
          currentPage !== "signup" &&
          currentPage !== "profile" &&
          currentPage !== "settings" &&
          currentPage !== "favorites" &&
          currentPage !== "requests" &&
          currentPage !== "game" &&
          currentPage !== "movie" &&
          currentPage !== "search" && (
          <motion.div
            key={currentPage + refreshKey}
            initial={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CategoryPage
              category={currentPage}
              onBack={() => {
                if (categorySection === "software") {
                  setCurrentPage("software-browse")
                } else if (categorySection === "movies") {
                  setCurrentPage("movies-browse")
                } else {
                  setCurrentPage("games-browse")
                }
                window.scrollTo(0, 0)
              }}
              onGameClick={handleGameClick}
              userToken={user?.token}
              isAdmin={user?.is_admin === 1}
              onDeleteGame={categorySection === "movies" ? handleDeleteMovie : handleDeleteGame}
              onEditGame={categorySection === "movies" ? handleEditMovie : undefined}
              typeFilter={categorySection === "software" ? "software" : categorySection === "movies" ? "movie" : "game"}
            />
            <Footer onNavigate={handleFooterNavigate} />
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />

      {/* Live Activity Feed (admin only) */}
      {showActivityFeed && user?.is_admin === 1 && <ActivityFeed />}
      {!showActivityFeed && user?.is_admin === 1 && <ActivityFeedToggle onShow={() => setShowActivityFeed(true)} />}

      {/* Admin Activity Panel (toggle with Konami code: ↑↑↓↓←→←→BA) */}
      {showAdminPanel && user && user.is_admin === 1 && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAdminPanel(false)}>
          <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Admin Panel</h2>
              <button onClick={() => setShowAdminPanel(false)} className="text-zinc-500 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="space-y-6">
              <AdminDashboard />
              <AdminActivityPanel />
            </div>
          </div>
        </div>
      )}

      {/* Add Game/Software Modal */}
      {user && (
        <AddGameModal
          isOpen={addGameOpen}
          onClose={() => setAddGameOpen(false)}
          onGameAdded={handleGameAdded}
          userToken={user.token}
        />
      )}

      {/* Edit Movie Modal */}
      {editingMovie && user && (
        <EditMovieModal
          isOpen={editMovieOpen}
          onClose={() => { setEditMovieOpen(false); setEditingMovie(null) }}
          onMovieEdited={handleMovieEdited}
          userToken={user.token}
          movieData={editingMovie}
        />
      )}
    </div>
  )
}
