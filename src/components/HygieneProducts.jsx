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
      <div className="rn-hyg-v3 site-container">
        <div className="text-center max-w-[740px] mx-auto mb-10">
          <h2 className={`font-heading text-[clamp(2.1rem,4.2vw,3.75rem)] leading-[1.05] mb-3 ${isDark ? "text-[#F3ECDD]" : "text-[#0B2E24]"}`}>
            {t.sections.hygieneTitle}
          </h2>
          <p className={`text-[clamp(1rem,1.1vw,1.125rem)] mx-auto leading-[1.65] ${isDark ? "text-[#C3CEC4]" : "text-[#4E5F57]"}`}>
            {t.sections.hygieneParagraph1}
          </p>
        </div>

        <div className="rn-hyg-v3-video aspect-[16/9] rounded-[24px] overflow-hidden border border-[rgba(18,63,49,0.2)] shadow-[0_10px_30px_rgba(8,36,28,0.12)] bg-[#EFE7D7]">
          <BgVideo videoName="studio" aspectRatio="16/9" rounded="rounded-none" overlay={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1040px] mx-auto text-left">
          <div>
            <h3 className={`font-heading text-[1.45rem] mb-4 ${isDark ? "text-[#E3C88A]" : "text-[#0B2E24]"}`}>
              {t.sections.brandsHeading}
            </h3>
            <div className="rn-hyg-v3-brands">
              {brands.map((b) => (
                <div
                  key={b.name}
                  className={`p-4 rounded-[12px] border ${
                    isDark ? "bg-[#123F31] border-[rgba(201,164,92,0.2)]" : "bg-[#EFE7D7] border-[rgba(18,63,49,0.14)]"
                  }`}
                >
                  <span className={`font-heading text-[18px] font-semibold block ${isDark ? "text-[#F3ECDD]" : "text-[#0B2E24]"}`}>
                    {b.name}
                  </span>
                  <span className={`text-[13px] block mt-0.5 ${isDark ? "text-[#C3CEC4]" : "text-[#4E5F57]"}`}>
                    {l(b.desc)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className={`font-heading text-[1.45rem] mb-4 ${isDark ? "text-[#E3C88A]" : "text-[#0B2E24]"}`}>
              {t.sections.hygieneStepsHeading}
            </h3>
            <ul className="space-y-3">
              {t.sections.hygieneSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} weight="light" className="text-[#C9A45C] flex-shrink-0 mt-0.5" />
                  <span className={`text-[15px] leading-relaxed ${isDark ? "text-[#F3ECDD]" : "text-[#15251F]"}`}>
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
