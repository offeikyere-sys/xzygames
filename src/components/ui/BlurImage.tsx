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
