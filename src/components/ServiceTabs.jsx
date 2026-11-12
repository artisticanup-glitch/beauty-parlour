import React, { useState, useRef, useEffect } from "react"
import { Clock, ArrowRight } from "@phosphor-icons/react"
import { serviceCategories, services } from "../data/services"
import { useLanguage } from "../i18n/LanguageContext"
import Button from "./Button"

export default function ServiceTabs({ limitCount = 6, showAll = false }) {
  const { lang, t, l } = useLanguage()
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id)
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const tabsRef = useRef([])

  // Filter services by category
  const activeServices = showAll
    ? services.filter((s) => s.category === activeTab)
    : services.filter((s) => s.category === activeTab).slice(0, limitCount)

  // Update underline indicator position
  useEffect(() => {
    const activeIndex = serviceCategories.findIndex((c) => c.id === activeTab)
    const activeTabEl = tabsRef.current[activeIndex]
    if (activeTabEl) {
      setUnderlineStyle({
        left: activeTabEl.offsetLeft,
        width: activeTabEl.offsetWidth,
      })
    }
  }, [activeTab, lang])

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
      <div className="relative mb-12 border-b border-[rgba(201,164,92,0.28)] pb-1">
        <div
          role="tablist"
          aria-label="Service categories"
          className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-6 px-2"
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
                className={`py-3 px-4 text-[15px] sm:text-[16px] whitespace-nowrap tracking-wide transition-colors cursor-pointer select-none ${
                  isActive
                    ? "text-[#C9A45C] font-medium"
                    : "text-[#C3CEC4] hover:text-[#F3ECDD]"
                }`}
              >
                {l(cat.name)}
              </button>
            )
          })}
        </div>

        {/* Animated Gold Underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-[#C9A45C] transition-all duration-300 pointer-events-none"
          style={{
            left: `${underlineStyle.left}px`,
            width: `${underlineStyle.width}px`,
          }}
        />
      </div>

      {/* Services Grid (3 columns desktop, 1 on mobile) */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-opacity duration-300"
      >
        {activeServices.map((service) => (
          <div
            key={service.id}
            className="service-card group bg-[#123F31] rounded-[16px] overflow-hidden border border-[rgba(201,164,92,0.2)] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Card Media with 1.05 zoom on hover */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#08241C]">
              <img
                src={service.image}
                alt={l(service.name)}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-[rgba(8,36,28,0.85)] border border-[rgba(201,164,92,0.3)] rounded-full px-3 py-1 flex items-center gap-1.5 text-[13px] text-[#E3C88A]">
                <Clock size={14} weight="light" className="text-[#C9A45C]" />
                <span>{l(service.duration)}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-heading text-[22px] sm:text-[24px] text-[#F3ECDD] mb-2 leading-snug">
                  {l(service.name)}
                </h3>
                <p className="text-[#C3CEC4] text-[14px] leading-relaxed mb-6">
                  {l(service.description)}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(201,164,92,0.18)] flex items-center justify-between">
                <div>
                  <span className="text-[12px] uppercase tracking-wider text-[#C3CEC4] block">
                    {t.common.fromPrice}
                  </span>
                  <span className="font-heading text-[24px] font-semibold text-[#E3C88A]">
                    {service.priceFormatted}
                  </span>
                </div>

                <Button
                  to={`/booking?service=${service.id}`}
                  variant="primary"
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
