import React from "react"
import { CheckCircle } from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import BgVideo from "./BgVideo"

export default function HygieneProducts() {
  const { t } = useLanguage()

  const brands = [
    { name: "MAC Cosmetics", desc: "Studio Fix & Prep" },
    { name: "Huda Beauty", desc: "Eyeshadows & Lashes" },
    { name: "Kryolan Professional", desc: "Derma & TV Paint" },
    { name: "Lakmé Absolute", desc: "Argan Oil Radiance" },
  ]

  return (
    <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
      <div className="site-container">
        {/* Section Heading Centered */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <span className="eyebrow block mb-3 text-[#C9A45C]">
            {t.sections.hygieneEyebrow}
          </span>
          <h2 className="font-heading text-[clamp(2.1rem,4.2vw,3.75rem)] text-[#0B2E24] leading-[1.05] mb-4">
            {t.sections.hygieneTitle}
          </h2>
          <p className="text-[#4E5F57] text-[clamp(1rem,1.1vw,1.125rem)] mx-auto leading-[1.65]">
            {t.sections.hygieneParagraph1}
          </p>
        </div>

        {/* 50/50 Symmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Studio Video (rounded 24px) */}
          <div className="w-full flex justify-center">
            <div className="w-full aspect-[16/9] rounded-[24px] overflow-hidden border border-[rgba(18,63,49,0.2)] shadow-[0_10px_30px_rgba(8,36,28,0.12)] bg-[#EFE7D7]">
              <BgVideo
                videoName="studio"
                aspectRatio="16/9"
                rounded="rounded-none"
                overlay={false}
              />
            </div>
          </div>

          {/* Right: Authentic Brands + Hygiene Steps */}
          <div className="space-y-8 text-left">
            {/* Brands (Text only, no logos) */}
            <div>
              <span className="eyebrow block mb-3 text-[#C9A45C]">
                {t.sections.brandsHeading}
              </span>
              <div className="grid grid-cols-2 gap-3">
                {brands.map((b) => (
                  <div
                    key={b.name}
                    className="p-4 rounded-[12px] bg-[#EFE7D7] border border-[rgba(18,63,49,0.14)]"
                  >
                    <span className="font-heading text-[18px] text-[#0B2E24] font-semibold block">
                      {b.name}
                    </span>
                    <span className="text-[12px] text-[#4E5F57] block mt-0.5">
                      {b.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hygiene Commitments */}
            <div>
              <span className="eyebrow block mb-3 text-[#C9A45C]">
                {t.sections.hygieneStepsHeading}
              </span>
              <ul className="space-y-3">
                {t.sections.hygieneSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      weight="light"
                      className="text-[#1F6B4F] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-[#15251F] text-[15px] leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
