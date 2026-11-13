import React, { useState, useEffect, useCallback } from "react"
import { ArrowUp } from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"

export default function BackToTop() {
  const { lang, t } = useLanguage()
  const [isVisible, setIsVisible] = useState(() =>
    typeof window !== "undefined"
      ? (window.scrollY || document.documentElement.scrollTop) > window.innerHeight * 0.6
      : false
  )
  const [footerOffset, setFooterOffset] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Listen to prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    // Listener only - initial state read directly on demand
    const handler = () => {}
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Observe mobile menu open state via body attribute
  useEffect(() => {
    const checkMenu = () => {
      setIsMenuOpen(document.body.dataset.mobileMenu === "open")
    }

    const observer = new MutationObserver(checkMenu)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-mobile-menu"],
    })
    return () => observer.disconnect()
  }, [])

  // Scroll position & footer collision detection
  const checkScrollAndFooter = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop
    const threshold = window.innerHeight * 0.6
    setIsVisible(scrollY > threshold)

    // Footer overlap avoidance
    const footer = document.querySelector("footer")
    if (footer) {
      const footerRect = footer.getBoundingClientRect()
      const windowHeight = window.innerHeight
      if (footerRect.top < windowHeight) {
        setFooterOffset(Math.max(0, windowHeight - footerRect.top))
      } else {
        setFooterOffset(0)
      }
    }
  }, [])

  useEffect(() => {
    // Lenis scroll listener
    const lenis = window.lenis
    const onLenisScroll = () => {
      checkScrollAndFooter()
    }
    if (lenis) {
      lenis.on("scroll", onLenisScroll)
    }

    // Native window scroll listener (fallback & touch)
    window.addEventListener("scroll", checkScrollAndFooter, { passive: true })
    window.addEventListener("resize", checkScrollAndFooter, { passive: true })

    return () => {
      if (lenis) {
        lenis.off("scroll", onLenisScroll)
      }
      window.removeEventListener("scroll", checkScrollAndFooter)
      window.removeEventListener("resize", checkScrollAndFooter)
    }
  }, [checkScrollAndFooter])

  // Scroll to top handler
  const handleScrollToTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, behavior: "instant" })
      }
      return
    }

    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const showButton = isVisible && !isMenuOpen
  const ariaLabel = t.common?.backToTop || (lang === "hi" ? "ऊपर जाएं" : "Back to top")

  return (
    <div
      className={`back-to-top-btn fixed z-40 right-3 md:right-6 pointer-events-none transition-all duration-300 ease-out ${
        showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"
      }`}
      style={{
        bottom: `calc(${footerOffset > 0 ? `${footerOffset}px + ` : ""}${
          typeof window !== "undefined" && window.innerWidth > 768
            ? "24px"
            : "76px + env(safe-area-inset-bottom, 0px)"
        })`,
      }}
    >
      <button
        onClick={handleScrollToTop}
        type="button"
        tabIndex={showButton ? 0 : -1}
        aria-hidden={!showButton}
        aria-label={ariaLabel}
        className={`group flex items-center justify-center rounded-full bg-[#0B2E24] hover:bg-[#C9A45C] text-[#C9A45C] hover:text-[#0B2E24] border border-[rgba(201,164,92,0.4)] hover:border-[#E3C88A] shadow-[0_4px_16px_rgba(8,36,28,0.35)] hover:shadow-[0_6px_20px_rgba(201,164,92,0.3)] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2E24] ${
          showButton ? "pointer-events-auto" : "pointer-events-none"
        } w-11 h-11 min-w-[44px] min-h-[44px] md:w-12 md:h-12`}
      >
        <ArrowUp
          size={20}
          weight="regular"
          className="transition-transform duration-200 group-hover:-translate-y-0.5"
        />
      </button>
    </div>
  )
}
