import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Reveal({
  children,
  type = "card", // "card" | "media" | "heading"
  delay = 0,
  className = "",
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const el = containerRef.current
    if (prefersReducedMotion || !el) return

    let anim

    if (type === "card") {
      anim = gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      )
    } else if (type === "media") {
      // Reveal with clip-path inset(100% 0 0 0) -> inset(0) and inner media scale 1.2 -> 1
      const inner = el.querySelector("img, video")
      anim = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      })

      anim.fromTo(
        el,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.1,
          ease: "power4.out",
        }
      )

      if (inner) {
        anim.fromTo(
          inner,
          { scale: 1.2 },
          { scale: 1.0, duration: 1.1, ease: "power4.out" },
          "<"
        )
      }
    } else if (type === "heading") {
      anim = gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      )
    }

    return () => {
      if (anim?.scrollTrigger) anim.scrollTrigger.kill()
      anim?.kill()
    }
  }, [type, delay])

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {children}
    </div>
  )
}
