import React, { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"

export default function Button({
  children,
  variant = "primary", // "primary" | "secondary-dark" | "secondary-light"
  to,
  href,
  onClick,
  className = "",
  type = "button",
  ariaLabel,
}) {
  const btnRef = useRef(null)

  // Subtle magnetic pull on desktop hover
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isTouch || prefersReducedMotion || !btnRef.current) return

    const el = btnRef.current
    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power2.out" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" })

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      xTo(x * 0.18) // gentle magnetic pull factor
      yTo(y * 0.18)
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const getVariantClass = () => {
    switch (variant) {
      case "secondary-dark":
        return "btn-secondary-dark"
      case "secondary-light":
        return "btn-secondary-light"
      case "primary":
      default:
        return "btn-primary"
    }
  }

  const combinedClass = `${getVariantClass()} ${className}`

  if (to) {
    return (
      <Link
        ref={btnRef}
        to={to}
        className={combinedClass}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    )
  }

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("tel:") || href.startsWith("https://wa.me")
    return (
      <a
        ref={btnRef}
        href={href}
        className={combinedClass}
        target={isExternal && !href.startsWith("tel:") ? "_blank" : undefined}
        rel={isExternal && !href.startsWith("tel:") ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      className={combinedClass}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
