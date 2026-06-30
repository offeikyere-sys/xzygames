<<<<<<< HEAD
import { useState } from "react"

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

  return (
    <div className={`overflow-hidden ${wrapperClassName}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        onError={onError}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}
=======
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
          onError={onError}
        />
      )}
    </div>
  )
}
>>>>>>> 7c1ffee34b396fd223280ff7eaa1a327684d3d32
