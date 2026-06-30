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

  const visibleCount = Math.floor((carouselRef.current?.clientWidth || window.innerWidth) / (cardWidth + 16))
  const maxIndex = Math.max(0, items.length - visibleCount)

  const scroll = (direction: "left" | "right") => {
    setCurrentIndex((prev) => {
      const newIndex = direction === "left" ? prev - 1 : prev + 1
      return Math.max(0, Math.min(newIndex, maxIndex))
    })
  }

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              minWidth: cardWidth,
              scrollSnapAlign: "start",
            }}
            onClick={() => onItemClick(item)}
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
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full disabled:opacity-30"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={currentIndex === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full disabled:opacity-30"
          >
            →
          </button>
        </>
      )}
    </div>
  )
}