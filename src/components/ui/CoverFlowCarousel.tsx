import { useState, useEffect, useCallback, useRef, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CoverFlowCarouselProps {
  items: any[]
  cardWidth?: number
  renderCard: (item: any, index: number, isActive: boolean) => ReactNode
  onItemClick?: (item: any, index: number) => void
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
}

const SIDES = 3 // cards visible on each side of center

export function CoverFlowCarousel({
  items,
  cardWidth = 300,
  renderCard,
  onItemClick,
  autoPlay = true,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  className = "",
}: CoverFlowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const animTimer = useRef<number | null>(null)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const total = items.length
  const gap = 28
  const step = cardWidth + gap

  // Measure container width on mount + resize
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const goTo = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    const clamped = Math.max(0, Math.min(index, total - 1))
    setActiveIndex(clamped)
    setDragOffset(0)
    if (animTimer.current !== null) clearTimeout(animTimer.current)
    animTimer.current = window.setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating, total])

  const goNext = useCallback(() => {
    if (total === 0) return
    if (activeIndex < total - 1) goTo(activeIndex + 1)
    else goTo(0)
  }, [activeIndex, total, goTo])

  const goPrev = useCallback(() => {
    if (total === 0) return
    if (activeIndex > 0) goTo(activeIndex - 1)
    else goTo(total - 1)
  }, [activeIndex, total, goTo])

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isHovered || total <= 1) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
      return
    }
    autoPlayRef.current = setInterval(goNext, autoPlayInterval)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [autoPlay, isHovered, goNext, autoPlayInterval, total])

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [goNext, goPrev])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animTimer.current !== null) clearTimeout(animTimer.current)
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [])

  // Drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragOffset(0)
    if (trackRef.current) trackRef.current.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const delta = e.clientX - dragStartX
    setDragOffset(delta)
  }, [isDragging, dragStartX])

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    // If dragged more than 60px, snap to next/prev
    if (dragOffset < -60) goNext()
    else if (dragOffset > 60) goPrev()
    else setDragOffset(0)
  }, [isDragging, dragOffset, goNext, goPrev])

  if (total === 0) return null

  // Build visible range
  const start = Math.max(0, activeIndex - SIDES)
  const end = Math.min(total, activeIndex + SIDES + 1)
  const visible = items.slice(start, end)
  const centerOffset = activeIndex - start

  // Calculate exact pixel position to center the active card
  // We want the center of the active card to be at containerWidth / 2
  const activeCardCenter = centerOffset * step + cardWidth / 2
  const trackLeft = containerWidth / 2 - activeCardCenter

  // Add drag offset for swipe feel
  const dragTranslate = isDragging || dragOffset !== 0 ? dragOffset : 0
  const finalTranslate = trackLeft + dragTranslate

  return (
    <div
      className={`relative w-full select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
    >
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/95 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/95 to-transparent z-10 pointer-events-none" />

      {/* Carousel window */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 420 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="absolute flex items-center"
          style={{
            left: 0,
            top: "50%",
            transform: `translateX(${finalTranslate}px) translateY(-50%)`,
            transition: isAnimating && !isDragging
              ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
              : isDragging
                ? "none"
                : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
            gap,
          }}
        >
          {visible.map((item, i) => {
            const globalIndex = start + i
            const offset = i - centerOffset
            const absOffset = Math.abs(offset)
            const isActive = globalIndex === activeIndex

            // Enhanced 3D transforms
            const scale = 1 - absOffset * 0.2
            const rotateY = offset * 18
            const zDepth = -absOffset * 100
            const yOffset = -absOffset * 15
            const opacity = Math.max(0.3, 1 - absOffset * 0.22)

            return (
              <div
                key={globalIndex}
                onClick={() => {
                  if (!isActive) goTo(globalIndex)
                  else onItemClick?.(item, globalIndex)
                }}
                className="relative shrink-0"
                style={{
                  width: cardWidth,
                  perspective: 1200,
                  transform: `perspective(1200px) rotateY(${rotateY}deg) translateZ(${zDepth}px) translateY(${yOffset}px) scale(${scale})`,
                  opacity,
                  transition: isAnimating && !isDragging
                    ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease"
                    : "none",
                  zIndex: total - absOffset,
                  cursor: "pointer",
                }}
              >
                {/* Glow on active */}
                {isActive && (
                  <div
                    className="absolute inset-0 -inset-x-4 -inset-y-4 rounded-2xl pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, color-mix(in srgb, var(--game-color, #3b82f6) 18%, transparent) 0%, transparent 70%)`,
                      opacity: 0.8,
                    }}
                  />
                )}

                {/* Reflection */}
                <div
                  className="absolute -bottom-4 left-2 right-2 h-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, color-mix(in srgb, var(--game-color, #3b82f6) 8%, transparent), transparent)`,
                    transform: "scaleY(-1)",
                    opacity: isActive ? 0.4 : 0.1,
                    borderRadius: "0 0 50% 50%",
                  }}
                />

                {/* Card */}
                <div style={{ transformStyle: "preserve-3d" }}>
                  {renderCard(item, globalIndex, isActive)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-700/40 text-white hover:bg-zinc-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-700/40 text-white hover:bg-zinc-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Progress bar + dots */}
      {showDots && total > 1 && (
        <div className="flex items-center justify-center gap-3 mt-5">
          {/* Progress bar */}
          <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
            />
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {items.slice(0, Math.min(total, 8)).map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to item ${i + 1}`}>
                <div
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-5 h-1.5 bg-blue-500"
                      : "w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              </button>
            ))}
            {total > 8 && (
              <span className="text-xs text-zinc-600 ml-1">+{total - 8}</span>
            )}
          </div>
        </div>
      )}

      {/* Counter */}
      <div className="text-center mt-1.5">
        <span className="text-xs text-zinc-600">{activeIndex + 1} / {total}</span>
      </div>
    </div>
  )
}