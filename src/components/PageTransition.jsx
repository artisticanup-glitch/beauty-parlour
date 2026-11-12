import React, { useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function PageTransition() {
  const { pathname } = useLocation()
  const overlayRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Kill all previous ScrollTriggers on route change
    ScrollTrigger.getAll().forEach((st) => st.kill())

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      window.scrollTo(0, 0)
      return
    }

    // Skip page transition on initial load (Preloader handles initial entrance)
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const overlay = overlayRef.current
    if (!overlay) return

    const tl = gsap.timeline()

    // 1. Emerald panel wipes up over old page (0.45s)
    tl.set(overlay, { display: "block", yPercent: 100 })
      .to(overlay, {
        yPercent: 0,
        duration: 0.45,
        ease: "power4.inOut",
        onComplete: () => {
          window.scrollTo(0, 0)
        },
      })
      // 2. Panel wipes away to the top (0.45s)
      .to(overlay, {
        yPercent: -100,
        duration: 0.45,
        ease: "power4.inOut",
        delay: 0.05,
        onComplete: () => {
          gsap.set(overlay, { display: "none", yPercent: 100 })
        },
      })

    return () => tl.kill()
  }, [pathname])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] bg-[#0B2E24] hidden pointer-events-none"
      style={{ willChange: "transform" }}
    />
  )
}
