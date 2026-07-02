"use client"

import { useEffect, useRef, useState } from "react"

export function FloatingRobot() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 400

    // Simple robot drawing
    const drawRobot = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Body
      ctx.fillStyle = isHovered ? "#60a5fa" : "#3b82f6"
      ctx.beginPath()
      ctx.roundRect(150, 200, 100, 120, 20)
      ctx.fill()

      // Head
      ctx.beginPath()
      ctx.roundRect(140, 80, 120, 100, 25)
      ctx.fill()

      // Eyes
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(175, 130, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(225, 130, 15, 0, Math.PI * 2)
      ctx.fill()

      // Pupils
      ctx.fillStyle = "#000000"
      ctx.beginPath()
      ctx.arc(175, 130, 7, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(225, 130, 7, 0, Math.PI * 2)
      ctx.fill()

      // Antenna
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(200, 80)
      ctx.lineTo(200, 50)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(200, 45, 8, 0, Math.PI * 2)
      ctx.fillStyle = "#ef4444"
      ctx.fill()
    }

    drawRobot()
    setIsLoaded(true)
  }, [isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s" }}
    />
  )
}