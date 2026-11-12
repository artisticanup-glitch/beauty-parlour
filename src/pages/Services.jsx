import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "../components/SectionHeading"

export default function Services() {
  const { t } = useLanguage()

  return (
    <div className="pb-16 lg:pb-0">
      {/* Page Hero (Emerald 60vh) */}
      <section className="min-h-[50vh] sm:min-h-[60vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4">
        <div className="site-container py-20">
          <SectionHeading
            eyebrow={t.servicesPage.heroEyebrow}
            title={t.servicesPage.heroTitle}
            subtitle={t.servicesPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      {/* Services Content Placeholder (Ivory) */}
      <section className="section-ivory section-padding">
        <div className="site-container text-center">
          <p className="text-secondary">
            {t.sections.servicesSubtitle}
          </p>
        </div>
      </section>
    </div>
  )
}
