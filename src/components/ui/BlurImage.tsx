import { useRef, useState, useEffect } from "react"

interface BlurImageProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  width?: number
  height?: number
  onError?: () => void
}

export function BlurImage({ src, alt, className = "", wrapperClassName = "", width, height, onError }: BlurImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageLoaded(false)
          observer.disconnect()
        }
      },
      { rootMargin: "50px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [src])

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${wrapperClassName}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={onError}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}
