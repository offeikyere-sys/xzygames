"use client"

import { useEffect, useRef, useState } from "react"

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Simple animated placeholder
    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw a simple animated shape as placeholder
      const gradient = ctx.createRadialGradient(400, 300, 0, 400, 300, 200)
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)")
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)")
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(400, 300, 200 + Math.sin(time) * 20, 0, Math.PI * 2)
      ctx.fill()

      time += 0.02
      animationId = requestAnimationFrame(animate)
    }

    animate()
    setIsLoaded(true)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [scene])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s" }}
    />
  )
}