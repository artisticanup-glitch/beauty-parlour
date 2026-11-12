import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function Cursor() {
  const cursorRef = useRef(null)
  const textRef = useRef(null)
  const [isEnabled] = useState(() => {
    if (typeof window === "undefined") return false
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isDesktop = window.innerWidth >= 1024
    return !isTouch && !prefersReducedMotion && isDesktop
  })
  const [isHoveringMedia, setIsHoveringMedia] = useState(false)

  useEffect(() => {
    if (!isEnabled) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Quick setters for smooth 60fps tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3.out" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3.out" })

    const handleMouseMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    // Detect media elements for "View" expansion
    const handleMouseOver = (e) => {
      const target = e.target.closest("img, video, .service-card, [data-cursor='view']")
      if (target) {
        setIsHoveringMedia(true)
      } else {
        setIsHoveringMedia(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[999] flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ${
        isHoveringMedia
          ? "w-[64px] h-[64px] bg-[rgba(201,164,92,0.92)] border border-[#C9A45C]"
          : "w-[28px] h-[28px] bg-transparent border-[1.5px] border-[#C9A45C]"
      }`}
    >
      <span
        ref={textRef}
        className={`font-heading text-[13px] font-semibold text-[#08241C] uppercase tracking-wider select-none transition-opacity duration-200 ${
          isHoveringMedia ? "opacity-100" : "opacity-0"
        }`}
      >
        View
      </span>
    </div>
  )
}
