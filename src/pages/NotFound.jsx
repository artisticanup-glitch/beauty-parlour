import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import Button from "../components/Button"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-[70vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4">
      <div className="site-container max-w-[600px] py-20">
        <span className="eyebrow block mb-3">404</span>
        <h1 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-tight mb-4 text-[#F3ECDD]">
          {t.notFound.title}
        </h1>
        <p className="text-[#C3CEC4] mx-auto mb-8 max-w-[50ch]">
          {t.notFound.subtitle}
        </p>
        <Button to="/" variant="primary">
          {t.notFound.btn}
        </Button>
      </div>
    </div>
  )
}
