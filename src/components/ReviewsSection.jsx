import React, { useState } from "react"
import { CaretLeft, CaretRight, Quotes } from "@phosphor-icons/react"
import { reviews } from "../data/reviews"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "./SectionHeading"

export default function ReviewsSection() {
  const { t, l } = useLanguage()
  const [startIndex, setStartIndex] = useState(0)

  // 6 reviews in data, 3 visible on desktop at a time
  const visibleCount = 3
  const totalReviews = reviews.length

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalReviews) % totalReviews)
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalReviews)
  }

  // Slice visible reviews (circular wrap)
  const currentReviews = []
  for (let i = 0; i < visibleCount; i++) {
    const idx = (startIndex + i) % totalReviews
    currentReviews.push(reviews[idx])
  }

  return (
    <section className="section-emerald section-padding border-t border-[rgba(201,164,92,0.18)]">
      <div className="site-container">
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-6 text-center sm:text-left">
          <SectionHeading
            eyebrow={t.sections.reviewsEyebrow}
            title={t.sections.reviewsTitle}
            subtitle={t.sections.reviewsSubtitle}
            theme="dark"
            align="left"
            className="!mx-0"
          />

          {/* Manual Control Arrows (NO autoplay) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              type="button"
              className="w-12 h-12 rounded-full border border-[rgba(201,164,92,0.3)] bg-[#123F31] text-[#E3C88A] hover:bg-[#1F6B4F] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous reviews"
            >
              <CaretLeft size={20} weight="light" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="w-12 h-12 rounded-full border border-[rgba(201,164,92,0.3)] bg-[#123F31] text-[#E3C88A] hover:bg-[#1F6B4F] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next reviews"
            >
              <CaretRight size={20} weight="light" />
            </button>
          </div>
        </div>

        {/* 3 Equal Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#123F31] rounded-[16px] p-8 border border-[rgba(201,164,92,0.2)] flex flex-col justify-between shadow-[0_10px_30px_rgba(8,36,28,0.12)] min-h-[300px]"
            >
              <div>
                <Quotes size={32} weight="light" className="text-[#C9A45C] mb-4 opacity-80" />
                <p className="text-[#F3ECDD] text-[15px] leading-relaxed mb-6 italic">
                  "{l(rev.quote)}"
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(201,164,92,0.18)] flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-[18px] text-[#F3ECDD] font-medium">
                    {l(rev.author)}
                  </h4>
                  <span className="text-[13px] text-[#C9A45C] block">
                    {l(rev.location)}
                  </span>
                </div>
                <span className="text-[12px] text-[#C3CEC4] bg-[#08241C] border border-[rgba(201,164,92,0.2)] rounded-full px-3 py-1">
                  {l(rev.service)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
