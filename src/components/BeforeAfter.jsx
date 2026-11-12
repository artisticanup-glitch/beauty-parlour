import React, { useState, useRef, useEffect, useCallback } from "react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"

export default function BeforeAfter({
  beforeImage,
  afterImage,
  title,
  description,
  aspectRatio = "4/5",
  theme = "light", // "light" (on ivory) | "dark" (on emerald)
}) {
  const { t } = useLanguage()
  const [sliderPos, setSliderPos] = useState(50) // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const isDark = theme === "dark"

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [isDragging, handleMove])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [isDragging, handleMove])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove])

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(0, prev - 5))
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(100, prev + 5))
    }
  }

  return (
    <div className="flex flex-col w-full text-center">
      <div
        ref={containerRef}
        role="slider"
        aria-label={title || "Before and After comparison"}
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className={`relative w-full overflow-hidden rounded-[16px] select-none cursor-ew-resize border shadow-[0_10px_30px_rgba(8,36,28,0.12)] ${
          isDark
            ? "border-[rgba(201,164,92,0.25)] bg-[#08241C]"
            : "border-[rgba(18,63,49,0.18)] bg-[#EFE7D7]"
        }`}
        style={{ aspectRatio }}
      >
        {/* AFTER IMAGE (Background / Full) */}
        <img
          src={afterImage}
          alt={t.sections.afterLabel}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* BEFORE IMAGE (Clipped overlay via clip-path) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={t.sections.beforeLabel}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* LABELS */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="bg-[rgba(8,36,28,0.85)] border border-[rgba(201,164,92,0.3)] text-[#F3ECDD] text-[13px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-[6px]">
            {t.sections.beforeLabel}
          </span>
        </div>
        <div className="absolute top-4 right-4 pointer-events-none">
          <span className="bg-[rgba(8,36,28,0.85)] border border-[rgba(201,164,92,0.3)] text-[#E3C88A] text-[13px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-[6px]">
            {t.sections.afterLabel}
          </span>
        </div>

        {/* DIVIDER LINE & HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#C9A45C] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0B2E24] border-2 border-[#C9A45C] text-[#C9A45C] flex items-center justify-center shadow-lg">
            <div className="flex items-center -space-x-1">
              <CaretLeft size={14} weight="bold" />
              <CaretRight size={14} weight="bold" />
            </div>
          </div>
        </div>
      </div>

      {/* Caption info below */}
      {(title || description) && (
        <div className="mt-4 px-2">
          {title && (
            <h4
              className={`font-heading text-[20px] mb-1 ${
                isDark ? "text-[#F3ECDD]" : "text-[#0B2E24]"
              }`}
            >
              {title}
            </h4>
          )}
          {description && (
            <p
              className={`text-[14px] mx-auto leading-relaxed max-w-[42ch] ${
                isDark ? "text-[#C3CEC4]" : "text-[#4E5F57]"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
