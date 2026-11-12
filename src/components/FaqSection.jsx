import React from "react"
import { faqData } from "../data/faq"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "./SectionHeading"

export default function FaqSection() {
  const { t, l } = useLanguage()

  // Symmetrical 2 equal columns (3 questions each)
  const col1 = faqData.slice(0, 3)
  const col2 = faqData.slice(3, 6)

  return (
    <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
      <div className="site-container">
        {/* Centred Heading */}
        <div className="mb-16">
          <SectionHeading
            eyebrow={t.sections.faqEyebrow}
            title={t.sections.faqTitle}
            subtitle={t.sections.faqSubtitle}
            theme="light"
          />
        </div>

        {/* 2 Equal Columns (All questions & answers visible, NO accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
          {/* Column 1 */}
          <div className="space-y-6 w-full">
            {col1.map((item) => (
              <div
                key={item.id}
                className="w-full p-6 sm:p-8 rounded-[16px] bg-[#EFE7D7] border border-[rgba(18,63,49,0.12)] text-left"
              >
                <h3
                  className="font-heading text-[#0B2E24] mb-3 leading-snug w-full whitespace-normal lg:whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)" }}
                >
                  {l(item.question)}
                </h3>
                <p className="text-[#4E5F57] text-[15px] leading-relaxed">
                  {l(item.answer)}
                </p>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-6 w-full">
            {col2.map((item) => (
              <div
                key={item.id}
                className="w-full p-6 sm:p-8 rounded-[16px] bg-[#EFE7D7] border border-[rgba(18,63,49,0.12)] text-left"
              >
                <h3
                  className="font-heading text-[#0B2E24] mb-3 leading-snug w-full whitespace-normal lg:whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)" }}
                >
                  {l(item.question)}
                </h3>
                <p className="text-[#4E5F57] text-[15px] leading-relaxed">
                  {l(item.answer)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
