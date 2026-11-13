import React, { useState, useEffect } from "react"
import { X, MagnifyingGlassPlus } from "@phosphor-icons/react"
import { galleryFilters, galleryItems, beforeAfterPairs } from "../data/gallery"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "../components/SectionHeading"
import BeforeAfter from "../components/BeforeAfter"
import BookingBanner from "../components/BookingBanner"
import ParallaxImage from "../components/ParallaxImage"

export default function Gallery() {
  const { t, l } = useLanguage()
  const [activeFilter, setActiveFilter] = useState("all")
  const [lightboxItem, setLightboxItem] = useState(null)

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxItem(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxItem) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [lightboxItem])

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <div className="w-full pb-16 lg:pb-0">
      {/* 1. Page Hero (Emerald, 55vh) */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="site-container py-20 max-w-[800px] z-10">
          <SectionHeading
            eyebrow={t.galleryPage.heroEyebrow}
            title={t.galleryPage.heroTitle}
            subtitle={t.galleryPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      {/* 2. Gallery Grid Section (Ivory) */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 sm:mb-16">
            {galleryFilters.map((filt) => {
              const isActive = activeFilter === filt.id
              return (
                <button
                  key={filt.id}
                  onClick={() => setActiveFilter(filt.id)}
                  type="button"
                  style={{ minHeight: "44px" }}
                  className={`px-5 h-11 min-h-[44px] flex items-center justify-center rounded-full text-[14px] font-medium tracking-wide transition-all duration-200 cursor-pointer border box-border ${
                    isActive
                      ? "bg-[#0B2E24] text-[#F3ECDD] border-[#0B2E24] shadow-[0_4px_16px_rgba(8,36,28,0.15)]"
                      : "bg-[#EFE7D7] text-[#4E5F57] border-[rgba(18,63,49,0.14)] hover:border-[#0B2E24] hover:text-[#0B2E24]"
                  }`}
                >
                  {l(filt.label)}
                </button>
              )
            })}
          </div>

          {/* Conditional Display: Before/After Sliders or Photos Grid */}
          {activeFilter === "before-after" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-[1040px] mx-auto">
              {beforeAfterPairs.map((pair) => (
                <div key={pair.id} className="flex justify-center">
                  <BeforeAfter
                    beforeImage={pair.beforeImage}
                    afterImage={pair.afterImage}
                    title={l(pair.title)}
                    description={l(pair.description)}
                    aspectRatio="4/5"
                    theme="light"
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Equal Grid: 3 columns desktop, 2 columns mobile */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  className="group block w-full text-left cursor-pointer"
                >
                  <ParallaxImage
                    src={item.src}
                    alt={l(item.title)}
                    aspectRatio="4/5"
                    objectPosition="center 15%"
                    width={640}
                    height={800}
                    containerClassName="w-full aspect-[4/5] rounded-[16px] border border-[rgba(18,63,49,0.16)] bg-[#EFE7D7] shadow-[0_10px_30px_rgba(8,36,28,0.06)]"
                  >
                    {/* Overlay with title (visible on mobile, hover on desktop) */}
                    <div className="absolute inset-0 bg-[rgba(8,36,28,0.45)] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-6 text-left">
                      <div className="self-end w-9 h-9 rounded-full bg-[rgba(247,242,232,0.9)] text-[#0B2E24] flex items-center justify-center">
                        <MagnifyingGlassPlus size={18} weight="bold" />
                      </div>
                      <div className="w-full">
                        <span className="text-[13px] uppercase tracking-wider text-[#E3C88A] block font-medium">
                          {t.galleryCategories?.[item.category] || item.category}
                        </span>
                        <h3 className="font-heading text-[16px] sm:text-[18px] text-[#F3ECDD] font-medium leading-snug truncate w-full">
                          {l(item.title)}
                        </h3>
                      </div>
                    </div>
                  </ParallaxImage>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Booking Banner (Emerald) */}
      <BookingBanner theme="dark" />

      {/* 4. Full-screen Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={l(lightboxItem.title)}
          className="fixed inset-0 z-50 bg-[rgba(8,36,28,0.94)] flex items-center justify-center p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setLightboxItem(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxItem(null)}
            type="button"
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#123F31] border border-[rgba(201,164,92,0.4)] text-[#E3C88A] flex items-center justify-center hover:bg-[#1F6B4F] transition-colors cursor-pointer"
            aria-label={t.common.close}
          >
            <X size={24} weight="light" />
          </button>

          {/* Modal Container */}
          <div
            className="max-w-[720px] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-[16px] overflow-hidden border border-[rgba(201,164,92,0.3)] bg-[#08241C] shadow-2xl">
              <img
                src={lightboxItem.src}
                alt={l(lightboxItem.title)}
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-[13px] uppercase tracking-wider text-[#C9A45C] block mb-1">
                {t.galleryCategories?.[lightboxItem.category] || lightboxItem.category}
              </span>
              <h3 className="font-heading text-[22px] sm:text-[24px] text-[#F3ECDD]">
                {l(lightboxItem.title)}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
