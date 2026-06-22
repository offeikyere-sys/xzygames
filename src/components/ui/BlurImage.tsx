import { useRef, useState, useEffect } from "react"

interface BlurImageProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  width?: number
  height?: number
}

export function BlurImage({ src, alt, className = "", wrapperClassName = "", width, height }: BlurImageProps) {
  const [inView, setInView] = useState(false)
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

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${wrapperClassName}`}>
      {inView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className={className}
        />
      )}
    </div>
  )
}