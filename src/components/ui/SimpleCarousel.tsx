import { useState, useRef, useEffect, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SimpleCarouselProps {
  items: any[]
  cardWidth?: number
  renderCard: (item: any, index: number) => ReactNode
  onItemClick?: (item: any) => void
  className?: string
}

export function SimpleCarousel({
  items,
  cardWidth = 300,
  renderCard,
  onItemClick,
  className = "",
}: SimpleCarouselProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [items])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = cardWidth * 2
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  if (items.length === 0) return null

  return (
    <div className={`relative ${className}`}>
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/50 text-white hover:bg-zinc-800 hover:border-blue-500/50 transition-all shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide py-4 px-2"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id || index}
            style={{
              width: cardWidth,
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
            onClick={() => onItemClick?.(item)}
            className="cursor-pointer"
          >
            {renderCard(item, index)}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/50 text-white hover:bg-zinc-800 hover:border-blue-500/50 transition-all shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Fade edges */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />
      )}
    </div>
  )
}