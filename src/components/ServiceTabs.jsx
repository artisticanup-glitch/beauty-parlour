import React, { useState, useRef, useEffect, useCallback } from "react"
import { Clock, ArrowRight } from "@phosphor-icons/react"
import { serviceCategories, services } from "../data/services"
import { useLanguage } from "../i18n/LanguageContext"
import Button from "./Button"
import ParallaxImage from "./ParallaxImage"

export default function ServiceTabs({
  limitCount = 6,
  showAll = false,
  theme = "dark", // "dark" (on emerald) | "light" (on ivory)
}) {
  const { lang, t, l } = useLanguage()
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id)
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const tabsRef = useRef([])
  const tablistRef = useRef(null)

  const isLight = theme === "light"

  // Filter services by category
  const activeServices = showAll
    ? services.filter((s) => s.category === activeTab)
    : services.filter((s) => s.category === activeTab).slice(0, limitCount)

  // Update underline indicator position using relative bounding rect (bulletproof with flex justify-center)
  const updateUnderline = useCallback(() => {
    const activeIndex = serviceCategories.findIndex((c) => c.id === activeTab)
    const activeTabEl = tabsRef.current[activeIndex]
    const tablistEl = tablistRef.current

    if (activeTabEl && tablistEl) {
      const tablistRect = tablistEl.getBoundingClientRect()
      const tabRect = activeTabEl.getBoundingClientRect()
      const left = tabRect.left - tablistRect.left + tablistEl.scrollLeft
      const width = tabRect.width
      setUnderlineStyle({ left, width })
    }
  }, [activeTab])

  useEffect(() => {
    updateUnderline()
    const activeIndex = serviceCategories.findIndex((c) => c.id === activeTab)
    const activeTabEl = tabsRef.current[activeIndex]
    if (activeTabEl) {
      activeTabEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    }

    const handleResize = () => updateUnderline()
    window.addEventListener("resize", handleResize)

    // Re-check after web fonts load
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateUnderline)
    }

    const timer = setTimeout(updateUnderline, 50)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [activeTab, lang, updateUnderline])

  // Keyboard navigation for tabs
  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % serviceCategories.length
      setActiveTab(serviceCategories[nextIndex].id)
      tabsRef.current[nextIndex]?.focus()
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + serviceCategories.length) % serviceCategories.length
      setActiveTab(serviceCategories[prevIndex].id)
      tabsRef.current[prevIndex]?.focus()
    }
  }

  return (
    <div className="w-full">
      {/* Category Tabs Container */}
      <div
        className={`relative mb-12 border-b pb-1 ${
          isLight ? "border-[rgba(18,63,49,0.16)]" : "border-[rgba(201,164,92,0.28)]"
        }`}
      >
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Service categories"
          className="relative flex items-center justify-start sm:justify-center overflow-x-auto gap-6 px-4 whitespace-nowrap scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {serviceCategories.map((cat, idx) => {
            const isActive = activeTab === cat.id
            return (
              <button
                key={cat.id}
                ref={(el) => (tabsRef.current[idx] = el)}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${cat.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(cat.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`py-3 px-4 shrink-0 text-[15px] sm:text-[16px] whitespace-nowrap tracking-wide transition-colors cursor-pointer select-none min-h-[48px] flex items-center justify-center ${
                  isActive
                    ? isLight
                      ? "text-[#0B2E24] font-semibold border-b-2 border-[#0B2E24]"
                      : "text-[#C9A45C] font-medium"
                    : isLight
                    ? "text-[#4E5F57] hover:text-[#0B2E24]"
                    : "text-[#C3CEC4] hover:text-[#F3ECDD]"
                }`}
              >
                {l(cat.name)}
              </button>
            )
          })}

          {/* Animated Gold Underline (Dark mode) inside scroll list */}
          {!isLight && (
            <div
              className="absolute bottom-0 h-[2px] bg-[#C9A45C] transition-all duration-300 pointer-events-none"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />
          )}
        </div>
      </div>

      {/* Services: Horizontal Snap Carousel on Mobile (≤768px), 3 cols on Desktop */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 w-full max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-300"
      >
        {activeServices.map((service) => (
          <div
            key={service.id}
            className={`service-card group rounded-[16px] overflow-hidden border flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none ${
              isLight
                ? "bg-[#EFE7D7] border-[rgba(18,63,49,0.14)] shadow-[0_10px_30px_rgba(8,36,28,0.06)]"
                : "bg-[#123F31] border-[rgba(201,164,92,0.2)]"
            }`}
          >
            {/* Card Media with parallax & 1.05 zoom on hover */}
            <ParallaxImage
              src={service.image}
              alt={l(service.name)}
              aspectRatio="4/3"
              objectPosition="center 20%"
              speed={5}
              width={800}
              height={600}
              containerClassName={`w-full aspect-[4/3] ${
                isLight ? "bg-[#F7F2E8]" : "bg-[#08241C]"
              }`}
            >
              <div
                className={`absolute top-3 right-3 rounded-full px-3 py-1 flex items-center gap-1.5 text-[13px] border z-10 ${
                  isLight
                    ? "bg-[rgba(247,242,232,0.92)] border-[rgba(18,63,49,0.18)] text-[#0B2E24]"
                    : "bg-[rgba(8,36,28,0.85)] border-[rgba(201,164,92,0.3)] text-[#E3C88A]"
                }`}
              >
                <Clock
                  size={14}
                  weight="light"
                  className={isLight ? "text-[#0B2E24]" : "text-[#C9A45C]"}
                />
                <span className="font-medium">{l(service.duration)}</span>
              </div>
            </ParallaxImage>

            {/* Card Body */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3
                  className={`font-heading text-[22px] sm:text-[24px] mb-2 leading-snug ${
                    isLight ? "text-[#0B2E24]" : "text-[#F3ECDD]"
                  }`}
                >
                  {l(service.name)}
                </h3>
                <p
                  className={`text-[14px] leading-relaxed mb-6 ${
                    isLight ? "text-[#4E5F57]" : "text-[#F3ECDD] opacity-85"
                  }`}
                >
                  {l(service.description)}
                </p>
              </div>

              <div
                className={`pt-4 border-t flex items-center justify-between ${
                  isLight
                    ? "border-[rgba(18,63,49,0.12)]"
                    : "border-[rgba(201,164,92,0.18)]"
                }`}
              >
                <div>
                  <span
                    className={`text-[13px] uppercase tracking-wider block ${
                      isLight ? "text-[#4E5F57]" : "text-[#F3ECDD] opacity-75"
                    }`}
                  >
                    {t.common.fromPrice}
                  </span>
                  <span
                    className={`font-heading text-[24px] font-semibold ${
                      isLight ? "text-[#0B2E24]" : "text-[#E3C88A]"
                    }`}
                  >
                    {service.priceFormatted}
                  </span>
                </div>

                <Button
                  to={`/booking?service=${service.id}`}
                  variant={isLight ? "primary" : "primary"}
                  className="!py-2.5 !px-4 !text-[13px]"
                  ariaLabel={`${t.common.bookNow}: ${l(service.name)}`}
                >
                  <span>{t.common.bookNow}</span>
                  <ArrowRight size={14} weight="light" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
