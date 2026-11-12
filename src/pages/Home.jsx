import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "../components/SectionHeading"
import Button from "../components/Button"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="pb-16 lg:pb-0">
      {/* Hero Section Placeholder */}
      <section className="relative min-h-[100dvh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4">
        <div className="site-container py-24">
          <span className="eyebrow block mb-4">{t.hero.eyebrow}</span>
          <h1 className="mb-6 font-heading text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
            {t.hero.title}
          </h1>
          <p className="mx-auto mb-10 max-w-[62ch] text-[#C3CEC4] text-[clamp(1rem,1.1vw,1.125rem)] leading-[1.65]">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button to="/booking" variant="primary">
              {t.hero.bookBtn}
            </Button>
            <Button
              href="https://wa.me/919000000000"
              variant="secondary-dark"
            >
              {t.hero.whatsappBtn}
            </Button>
          </div>
        </div>
      </section>

      {/* Intro Section (Ivory) */}
      <section className="section-ivory section-padding">
        <div className="site-container">
          <SectionHeading
            eyebrow={t.intro.eyebrow}
            title={t.intro.title}
            subtitle={t.intro.paragraph}
            theme="light"
          />
        </div>
      </section>
    </div>
  )
}
