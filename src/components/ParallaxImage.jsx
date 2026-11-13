import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  aspectRatio,
  speed = 6, // max percentage translation (+/- speed)
  objectPosition = "center",
  loading = "lazy",
  width,
  height,
  children,
}) {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || !containerRef.current || !wrapperRef.current) return

    const container = containerRef.current
    const wrapper = wrapperRef.current

    const anim = gsap.fromTo(
      wrapper,
      { yPercent: -speed },
      {
        yPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    )

    return () => {
      anim.kill()
      if (anim.scrollTrigger) anim.scrollTrigger.kill()
    }
  }, [speed])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Parallax layer with extra vertical bleed */}
      <div
        ref={wrapperRef}
        className="absolute -top-[12%] -bottom-[12%] left-0 right-0 w-full h-[124%] pointer-events-none"
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          width={width}
          height={height}
          style={{ objectPosition }}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${className}`}
        />
      </div>

      {/* Children (badges, captions, overlays) */}
      {children}
    </div>
  )
}
