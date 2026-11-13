import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import { serviceCategories, services } from "../data/services"
import SectionHeading from "../components/SectionHeading"
import BookingBanner from "../components/BookingBanner"

export default function Pricing() {
  const { lang, t, l } = useLanguage()

  // 6 categories arranged in 3 balanced rows of 2:
  // Row 1: Bridal | Skin (both 6 services)
  // Row 2: Makeup | Hands & Feet (6 & 3 services, equal height)
  // Row 3: Hair | Mehendi (6 & 3 services, equal height)
  const categoryPairs = [
    [serviceCategories.find((c) => c.id === "bridal"), serviceCategories.find((c) => c.id === "skin")],
    [serviceCategories.find((c) => c.id === "makeup"), serviceCategories.find((c) => c.id === "hands-feet")],
    [serviceCategories.find((c) => c.id === "hair"), serviceCategories.find((c) => c.id === "mehendi")],
  ]

  const getServicesForCategory = (catId) => {
    return services.filter((s) => s.category === catId)
  }

  const renderCategoryCard = (cat) => {
    if (!cat) return null
    const catServices = getServicesForCategory(cat.id)
    return (
      <div
        key={cat.id}
        className="h-full flex flex-col justify-between p-8 rounded-[16px] bg-[#EFE7D7] border border-[rgba(18,63,49,0.14)] shadow-[0_10px_30px_rgba(8,36,28,0.06)]"
      >
        <div>
          <div className="border-b-2 border-[#0B2E24] pb-3 mb-6 flex items-center justify-between">
            <h3 className="font-heading text-[24px] sm:text-[26px] text-[#0B2E24] font-semibold">
              {l(cat.name)}
            </h3>
            <span className="text-[13px] uppercase tracking-wider text-[#4E5F57]">
              {catServices.length} {lang === "hi" ? "उपचार" : "services"}
            </span>
          </div>

          <div className="space-y-6">
            {catServices.map((service) => (
              <div key={service.id} className="group">
                {/* Name + Dotted Line + Price */}
                <div className="flex items-baseline justify-between w-full">
                  <span className="font-heading text-[18px] sm:text-[19px] text-[#0B2E24] font-medium whitespace-nowrap">
                    {l(service.name)}
                  </span>
                  <span className="flex-grow border-b-2 border-dotted border-[rgba(18,63,49,0.3)] mx-3" />
                  <span className="font-heading text-[19px] sm:text-[20px] text-[#0B2E24] font-bold whitespace-nowrap">
                    {service.priceFormatted}
                  </span>
                </div>

                {/* Description + Duration */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[13px] text-[#4E5F57] mt-1 gap-1">
                  <span className="leading-snug max-w-[42ch]">
                    {l(service.description)}
                  </span>
                  <span className="whitespace-nowrap text-[13px] font-medium text-[#15251F] bg-[#F7F2E8] px-2 py-0.5 rounded">
                    {l(service.duration)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full pb-16 lg:pb-0">
      {/* 1. Page Hero (Emerald, 60vh) */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="site-container py-20 max-w-[800px] z-10">
          <SectionHeading
            eyebrow={t.pricingPage.heroEyebrow}
            title={t.pricingPage.heroTitle}
            subtitle={t.pricingPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      {/* 2. Menu Card Rate List (Ivory) */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <h2 className="font-heading text-[clamp(2.1rem,4.2vw,3.75rem)] text-[#0B2E24] leading-[1.05] mb-4">
              {lang === "hi" ? "सेवा एवं उपचार दर सूची" : "Parlour & Studio Rates"}
            </h2>
            <p className="text-[#4E5F57] text-[clamp(1rem,1.1vw,1.125rem)] mx-auto leading-[1.65]">
              {t.pricingPage.note}
            </p>
          </div>

          {/* 3 Rows of 2 Symmetrical Equal-Height Cards */}
          <div className="space-y-10 max-w-[1140px] mx-auto">
            {categoryPairs.map(([catA, catB], idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch"
              >
                {renderCategoryCard(catA)}
                {renderCategoryCard(catB)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Booking Banner (Emerald) */}
      <BookingBanner theme="dark" />
    </div>
  )
}
