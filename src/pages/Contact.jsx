import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "../components/SectionHeading"
import { siteData } from "../data/site"
import Button from "../components/Button"

export default function Contact() {
  const { t, l } = useLanguage()

  return (
    <div className="pb-16 lg:pb-0">
      <section className="min-h-[50vh] sm:min-h-[60vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4">
        <div className="site-container py-20">
          <SectionHeading
            eyebrow={t.contactPage.heroEyebrow}
            title={t.contactPage.heroTitle}
            subtitle={t.contactPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      <section className="section-ivory section-padding">
        <div className="site-container max-w-[800px] text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-8">
            <div className="bg-[#EFE7D7] p-6 rounded-[16px]">
              <h3 className="font-heading text-[20px] text-[#0B2E24] mb-2">
                {t.contactPage.addressTitle}
              </h3>
              <p className="text-[14px] text-[#4E5F57]">{l(siteData.address)}</p>
            </div>
            <div className="bg-[#EFE7D7] p-6 rounded-[16px]">
              <h3 className="font-heading text-[20px] text-[#0B2E24] mb-2">
                {t.contactPage.hoursTitle}
              </h3>
              <p className="text-[14px] text-[#4E5F57]">{l(siteData.hours)}</p>
            </div>
          </div>
          <Button href={siteData.mapUrl} variant="primary">
            {t.contactPage.openInMap}
          </Button>
        </div>
      </section>
    </div>
  )
}
