import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "dark" | "liquid" | "light" | "cyberpunk"

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("xzy-theme")
    if (saved === "dark" || saved === "liquid" || saved === "light" || saved === "cyberpunk") return saved
    return "dark"
  })

  useEffect(() => {
    localStorage.setItem("xzy-theme", theme)
    document.documentElement.className = theme === "dark" ? "" : theme
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "liquid" : prev === "liquid" ? "light" : prev === "light" ? "cyberpunk" : "dark"
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}