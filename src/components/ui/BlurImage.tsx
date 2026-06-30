import { useRef, useState, useEffect } from "react"

interface BlurImageProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  width?: number
  height?: number
  onError?: () => void
  quality?: number
}

export function BlurImage({ src, alt, className = "", wrapperClassName = "", width, height, onError, quality = 75 }: BlurImageProps) {
  const [inView, setInView] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Add quality parameter to image URL for optimization
  const optimizedSrc = quality < 100 ? `${src}${src.includes('?') ? '&' : '?'}q=${quality}` : src

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${wrapperClassName}`}>
      {inView && !imageLoaded && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
      )}
      {inView && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={onError}
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </div>
  )
}
