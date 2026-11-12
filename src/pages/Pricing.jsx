import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "../components/SectionHeading"

export default function Pricing() {
  const { t } = useLanguage()

  return (
    <div className="pb-16 lg:pb-0">
      <section className="min-h-[50vh] sm:min-h-[60vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4">
        <div className="site-container py-20">
          <SectionHeading
            eyebrow={t.pricingPage.heroEyebrow}
            title={t.pricingPage.heroTitle}
            subtitle={t.pricingPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      <section className="section-ivory section-padding">
        <div className="site-container text-center">
          <p className="text-secondary">{t.pricingPage.note}</p>
        </div>
      </section>
    </div>
  )
}
