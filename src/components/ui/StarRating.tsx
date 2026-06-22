import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  initialRating?: number
  onRate?: (rating: number) => void
  size?: number
}

export function StarRating({ initialRating = 0, onRate, size = 18 }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hovered, setHovered] = useState(0)

  const handleClick = (value: number) => {
    setRating(value)
    onRate?.(value)
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          onMouseEnter={() => setHovered(value)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={size}
            className={`transition-colors ${
              value <= (hovered || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-zinc-600"
            }`}
          />
        </button>
      ))}
      {rating > 0 && (
        <span className="text-sm text-zinc-400 ml-2">{rating}/5</span>
      )}
    </div>
  )
}