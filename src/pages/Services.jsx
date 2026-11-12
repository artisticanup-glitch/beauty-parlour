import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "../components/SectionHeading"
import ServiceTabs from "../components/ServiceTabs"
import HygieneProducts from "../components/HygieneProducts"
import BookingBanner from "../components/BookingBanner"

export default function Services() {
  const { t } = useLanguage()

  return (
    <div className="w-full pb-16 lg:pb-0">
      {/* 1. Page Hero (Emerald, 60vh, centred title) */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="site-container py-20 max-w-[800px] z-10">
          <SectionHeading
            eyebrow={t.servicesPage.heroEyebrow}
            title={t.servicesPage.heroTitle}
            subtitle={t.servicesPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      {/* 2. Services Tabs with ALL services (Ivory) */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          <ServiceTabs limitCount={100} showAll={true} theme="light" />
        </div>
      </section>

      {/* 3. Hygiene Section (Emerald) */}
      <HygieneProducts theme="dark" />

      {/* 4. Booking Banner (Ivory) */}
      <BookingBanner theme="light" />
    </div>
  )
}
