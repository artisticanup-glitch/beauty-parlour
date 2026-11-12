import React, { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"

export default function Preloader({ onComplete }) {
  const { lang, l } = useLanguage()
  const [shouldShow, setShouldShow] = useState(false)
  const preloaderRef = useRef(null)
  const lettersRef = useRef([])
  const lineRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const alreadyVisited = sessionStorage.getItem("roop_nikhar_preloaded")

    if (prefersReducedMotion || alreadyVisited) {
      if (onComplete) onComplete()
      return
    }

    setShouldShow(true)
  }, [onComplete])

  useEffect(() => {
    if (!shouldShow || !preloaderRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("roop_nikhar_preloaded", "true")
        if (onComplete) onComplete()
        setShouldShow(false)
      },
    })

    // 1. Letters rise one by one
    tl.fromTo(
      lettersRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: "power4.out",
      }
    )

    // 2. Thin gold line draws underneath
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    )

    // 3. Subtitle fades up
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    )

    // 4. Brief hold, then ivory screen slides up to reveal hero
    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: "power4.inOut",
      delay: 0.15,
    })

    return () => tl.kill()
  }, [shouldShow, onComplete])

  if (!shouldShow) return null

  const wordmarkText = l(siteData.name)
  const letters = wordmarkText.split("")

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] bg-[#F7F2E8] flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="text-center px-4 overflow-hidden">
        {/* Wordmark Letters */}
        <div className="overflow-hidden flex items-center justify-center pb-2">
          {letters.map((char, index) => (
            <span
              key={index}
              ref={(el) => (lettersRef.current[index] = el)}
              className="inline-block font-heading text-[clamp(2.5rem,7vw,5rem)] text-[#0B2E24] tracking-[0.05em] font-semibold"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Thin Gold Underline */}
        <div
          ref={lineRef}
          className="w-36 sm:w-48 h-[1.5px] bg-[#C9A45C] mx-auto origin-center mt-1"
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[12px] sm:text-[13px] uppercase tracking-[0.25em] text-[#C9A45C] mt-3 font-medium opacity-0"
        >
          Motihari • Bihar
        </p>
      </div>
    </div>
  )
}
