import React, { useRef, useEffect, useState } from "react"

export default function BgVideo({
  videoName, // e.g. "hero", "haldi", "studio", "banner", "makeup-process"
  aspectRatio = "16/9", // "16/9", "4/5", "21/9", "9/16"
  isHero = false,
  className = "",
  rounded = "rounded-[16px]", // "rounded-[16px]" | "rounded-[24px]" | "rounded-none"
  overlay = true,
  isActive = true, // for pinned sections where only active clip plays
}) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [shouldPlayVideo] = useState(() => {
    if (typeof window === "undefined") return true
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = navigator.connection?.saveData === true
    return !(prefersReducedMotion || saveData)
  })
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768)

  // Ensure DOM element has muted and defaultMuted set for strict mobile autoplay policies
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
    }
  }, [])

  // Detect mobile resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // IntersectionObserver to pause when off-screen and play when visible
  useEffect(() => {
    if (!shouldPlayVideo) return

    const videoEl = videoRef.current
    const containerEl = containerRef.current
    if (!videoEl || !containerEl) return

    if (isHero) {
      // Hero plays immediately if active
      if (isActive) {
        videoEl.play().catch(() => {})
      } else {
        videoEl.pause()
      }
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isActive) {
            videoEl.play().catch(() => {})
          } else {
            videoEl.pause()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(containerEl)
    return () => observer.disconnect()
  }, [shouldPlayVideo, isActive, isHero])

  // Select video source based on screen (hero uses hero-m on phone)
  const videoSrc = isHero && isMobile ? `/videos/${videoName}-m.mp4` : `/videos/${videoName}.mp4`
  const posterSrc = isHero && isMobile ? `/videos/${videoName}-m.webp` : `/videos/${videoName}.webp`

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full ${rounded} ${className}`}
      style={{ aspectRatio }}
    >
      {shouldPlayVideo ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload={isHero ? "auto" : "metadata"}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      ) : (
        <img
          src={posterSrc}
          alt={videoName}
          className="w-full h-full object-cover object-[center_20%]"
          loading={isHero ? "eager" : "lazy"}
        />
      )}

      {/* Flat dark overlay over hero or subtle tint */}
      {overlay && (
        <div
          className={`absolute inset-0 pointer-events-none ${
            isHero ? "bg-[rgba(8,36,28,0.45)]" : "bg-[rgba(8,36,28,0.15)]"
          }`}
        />
      )}
    </div>
  )
}
