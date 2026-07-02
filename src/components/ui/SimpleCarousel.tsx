"use client"

import { useState, useRef, useEffect } from "react"

interface SimpleCarouselProps {
  items: any[]
  cardWidth: number
  onItemClick: (item: any) => void
  renderCard: (item: any, index: number) => React.ReactNode
}

export function SimpleCarousel({ items, cardWidth, onItemClick, renderCard }: SimpleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
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
    const measure = () => {
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.clientWidth)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Responsive card width: on small screens, fit cards to container
  const effectiveCardWidth = containerWidth > 0 ? Math.min(cardWidth, containerWidth - 32) : cardWidth
  const gap = 12
  const visibleCount = Math.max(1, Math.floor((containerWidth || window.innerWidth) / (effectiveCardWidth + gap)))
  const maxIndex = Math.max(0, items.length - visibleCount)
  }, [items])

  const scroll = (direction: "left" | "right") => {
    setCurrentIndex((prev) => {
      const newIndex = direction === "left" ? prev - 1 : prev + 1
      return Math.max(0, Math.min(newIndex, maxIndex))
    })
  }

  const translateX = currentIndex * (effectiveCardWidth + gap)
  if (items.length === 0) return null

  return (
    <div className="relative">
      <div ref={carouselRef} className="overflow-hidden">
        <div
          className="flex gap-3"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                minWidth: effectiveCardWidth,
              }}
              onClick={() => onItemClick(item)}
            >
              {renderCard(item, index)}
            </div>
          ))}
        </div>
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

      {maxIndex > 0 && (
        <>
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full disabled:opacity-30 z-10"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={currentIndex === maxIndex}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full disabled:opacity-30 z-10"
            aria-label="Next"
          >
            →
          </button>
        </>
      )}
    </div>
  )
}