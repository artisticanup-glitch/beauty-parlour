import React from "react"
import { CheckCircle } from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import BgVideo from "./BgVideo"

export default function HygieneProducts({ theme = "light" }) {
  const { t, l } = useLanguage()
  const isDark = theme === "dark"

  const brands = [
    {
      name: "MAC Cosmetics",
      desc: {
        en: "Studio Fix & Prep",
        hi: "स्टूडियो फिक्स एवं प्राइमर",
      },
    },
    {
      name: "Huda Beauty",
      desc: {
        en: "Eyeshadows & Lashes",
        hi: "आईशैडो एवं 3D पलकें",
      },
    },
    {
      name: "Kryolan Professional",
      desc: {
        en: "Derma & TV Paint Stick",
        hi: "डर्मा एवं टीवी पेंट स्टिक",
      },
    },
    {
      name: "Lakmé Absolute",
      desc: {
        en: "Argan Oil Radiance",
        hi: "आर्गन ऑयल रेडिएंस सीरम",
      },
    },
  ]

  return (
    <section
      className={`section-padding border-t ${
        isDark
          ? "section-emerald border-[rgba(201,164,92,0.18)]"
          : "section-ivory border-[rgba(18,63,49,0.14)]"
      }`}
    >
      <div className="site-container">
        {/* Section Heading Centered */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <span className="eyebrow block mb-3 text-[#C9A45C]">
            {t.sections.hygieneEyebrow}
          </span>
          <h2
            className={`font-heading text-[clamp(2.1rem,4.2vw,3.75rem)] leading-[1.05] mb-4 ${
              isDark ? "text-[#F3ECDD]" : "text-[#0B2E24]"
            }`}
          >
            {t.sections.hygieneTitle}
          </h2>
          <p
            className={`text-[clamp(1rem,1.1vw,1.125rem)] mx-auto leading-[1.65] ${
              isDark ? "text-[#C3CEC4]" : "text-[#4E5F57]"
            }`}
          >
            {t.sections.hygieneParagraph1}
          </p>
        </div>

        {/* 50/50 Symmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Studio Video (rounded 24px) */}
          <div className="w-full flex justify-center">
            <div
              className={`w-full aspect-[16/9] rounded-[24px] overflow-hidden border shadow-[0_10px_30px_rgba(8,36,28,0.12)] ${
                isDark
                  ? "border-[rgba(201,164,92,0.25)] bg-[#08241C]"
                  : "border-[rgba(18,63,49,0.2)] bg-[#EFE7D7]"
              }`}
            >
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
                    className={`p-4 rounded-[12px] border ${
                      isDark
                        ? "bg-[#123F31] border-[rgba(201,164,92,0.2)]"
                        : "bg-[#EFE7D7] border-[rgba(18,63,49,0.14)]"
                    }`}
                  >
                    <span
                      className={`font-heading text-[18px] font-semibold block ${
                        isDark ? "text-[#F3ECDD]" : "text-[#0B2E24]"
                      }`}
                    >
                      {b.name}
                    </span>
                    <span
                      className={`text-[13px] block mt-0.5 ${
                        isDark ? "text-[#C3CEC4]" : "text-[#4E5F57]"
                      }`}
                    >
                      {l(b.desc)}
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
                      className="text-[#C9A45C] flex-shrink-0 mt-0.5"
                    />
                    <span
                      className={`text-[15px] leading-relaxed ${
                        isDark ? "text-[#F3ECDD]" : "text-[#15251F]"
                      }`}
                    >
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
