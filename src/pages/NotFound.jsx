import React from "react"
import { ArrowLeft } from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import Button from "../components/Button"

export default function NotFound() {
  const { lang, t } = useLanguage()

  return (
    <div className="min-h-[80vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4">
      <div className="site-container max-w-[620px] py-24">
        <span className="eyebrow inline-block bg-[rgba(8,36,28,0.7)] border border-[rgba(201,164,92,0.35)] px-4 py-1.5 rounded-full text-[13px] text-[#E3C88A] mb-6">
          {lang === "hi" ? "404 · पेज नहीं मिला" : "404 Error"}
        </span>
        <h1
          className="font-heading text-[#F3ECDD] leading-tight mb-4"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          {t.notFound.title}
        </h1>
        <p className="text-[#F3ECDD] opacity-85 mx-auto mb-10 text-[clamp(1rem,1.1vw,1.125rem)] leading-relaxed max-w-[48ch]">
          {t.notFound.subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to="/" variant="primary" className="!py-4 !px-8">
            <ArrowLeft size={18} weight="light" className="text-[#08241C]" />
            <span>{t.notFound.btn}</span>
          </Button>
          <Button to="/services" variant="secondary-dark" className="!py-4 !px-8">
            <span>{t.nav.services}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
