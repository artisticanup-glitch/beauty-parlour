import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "../components/SectionHeading"

export default function Bridal() {
  const { t } = useLanguage()

  return (
    <div className="pb-16 lg:pb-0">
      <section className="min-h-[50vh] sm:min-h-[60vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4">
        <div className="site-container py-20">
          <SectionHeading
            eyebrow={t.bridalPage.heroEyebrow}
            title={t.bridalPage.heroTitle}
            subtitle={t.bridalPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      <section className="section-ivory section-padding">
        <div className="site-container text-center">
          <SectionHeading
            eyebrow={t.sections.packageEyebrow}
            title={t.sections.packageTitle}
            subtitle={t.sections.packageSubtitle}
            theme="light"
          />
        </div>
      </section>
    </div>
  )
}
