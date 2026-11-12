import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "../components/SectionHeading"

export default function About() {
  const { t } = useLanguage()

  return (
    <div className="pb-16 lg:pb-0">
      <section className="min-h-[50vh] sm:min-h-[60vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4">
        <div className="site-container py-20">
          <SectionHeading
            eyebrow={t.aboutPage.heroEyebrow}
            title={t.aboutPage.heroTitle}
            subtitle={t.aboutPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      <section className="section-ivory section-padding">
        <div className="site-container max-w-[800px] text-center">
          <h2 className="font-heading text-[28px] sm:text-[36px] mb-6 text-[#0B2E24]">
            {t.aboutPage.storyHeading}
          </h2>
          <p className="mb-4 text-[#4E5F57] mx-auto text-left">
            {t.aboutPage.storyP1}
          </p>
          <p className="text-[#4E5F57] mx-auto text-left">
            {t.aboutPage.storyP2}
          </p>
        </div>
      </section>
    </div>
  )
}
