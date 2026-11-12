import React from "react"
import {
  Sparkle,
  PaintBrush,
  Eye,
  FlowerLotus,
  BookmarkSimple,
  Crown,
  WhatsappLogo,
  PhoneCall,
} from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"
import { beforeAfterPairs } from "../data/gallery"
import { faqData } from "../data/faq"

import SectionHeading from "../components/SectionHeading"
import Button from "../components/Button"
import PackageBuilder from "../components/PackageBuilder"
import BeforeAfter from "../components/BeforeAfter"
import BookingBanner from "../components/BookingBanner"

export default function Bridal() {
  const { lang, t, l } = useLanguage()

  const includedIcons = [
    <Sparkle key="sparkle" size={26} weight="light" className="text-[#C9A45C]" />,
    <PaintBrush key="brush" size={26} weight="light" className="text-[#C9A45C]" />,
    <Eye key="eye" size={26} weight="light" className="text-[#C9A45C]" />,
    <FlowerLotus key="flower" size={26} weight="light" className="text-[#C9A45C]" />,
    <BookmarkSimple key="bookmark" size={26} weight="light" className="text-[#C9A45C]" />,
    <Crown key="crown" size={26} weight="light" className="text-[#C9A45C]" />,
  ]

  // Filter 4 bridal-specific FAQs
  const bridalFaqs = faqData.slice(0, 4)

  return (
    <div className="w-full pb-16 lg:pb-0">
      {/* 1. Page Hero (Emerald, 60vh, hero image background + flat overlay) */}
      <section className="relative min-h-[55vh] sm:min-h-[60vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background photo with flat dark layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bride.webp"
            alt="Roop Nikhar Bride"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(8,36,28,0.7)]" />
        </div>

        <div className="site-container py-20 max-w-[800px] z-10 relative">
          <SectionHeading
            eyebrow={t.bridalPage.heroEyebrow}
            title={t.bridalPage.heroTitle}
            subtitle={t.bridalPage.heroSubtitle}
            theme="dark"
            className="mb-8"
          />

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href={`https://wa.me/${siteData.whatsappNumber}`}
              variant="primary"
            >
              <WhatsappLogo size={18} weight="light" className="text-[#08241C]" />
              <span>{t.hero.whatsappBtn}</span>
            </Button>
            <Button
              href={`tel:${siteData.phone.replace(/\s+/g, "")}`}
              variant="secondary-dark"
            >
              <PhoneCall size={18} weight="light" className="text-[#C9A45C]" />
              <span>{t.nav.callUs}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. PackageBuilder (Ivory) */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          <SectionHeading
            eyebrow={t.sections.packageEyebrow}
            title={t.sections.packageTitle}
            subtitle={t.sections.packageSubtitle}
            theme="light"
            className="mb-14"
          />
          <PackageBuilder />
        </div>
      </section>

      {/* 3. What's Included Per Look (Emerald) */}
      <section className="section-emerald section-padding border-t border-[rgba(201,164,92,0.18)]">
        <div className="site-container">
          <SectionHeading
            eyebrow={t.bridalPage.includedEyebrow || (lang === "hi" ? "संपूर्ण ब्राइडल शृंगार" : "Complete Care Ritual")}
            title={t.bridalPage.includedHeading}
            subtitle={t.bridalPage.includedSubtitle || (lang === "hi" ? "आपके विवाह के पावन उत्सव के लिए हर सूक्ष्म विवरण का विशेष ध्यान।" : "Every nuance curated with calm precision for your sacred wedding festivities.")}
            theme="dark"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.bridalPage.includedItems.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[16px] bg-[#123F31] border border-[rgba(201,164,92,0.2)] flex flex-col justify-start shadow-[0_10px_30px_rgba(8,36,28,0.12)] text-left"
              >
                <div className="w-12 h-12 rounded-full bg-[#0B2E24] border border-[rgba(201,164,92,0.3)] flex items-center justify-center mb-5">
                  {includedIcons[idx]}
                </div>
                <h3 className="font-heading text-[22px] text-[#F3ECDD] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#C3CEC4] text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bridal Trial Process 50/50 with trial image (Ivory) */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          <SectionHeading
            eyebrow={t.intro.eyebrow}
            title={t.bridalPage.trialHeading}
            subtitle={t.bridalPage.trialSubtitle}
            theme="light"
            className="mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left: Indian bridal trial image, matching height of 4 steps column */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-full min-h-[440px] rounded-[24px] overflow-hidden border border-[rgba(18,63,49,0.2)] shadow-[0_10px_30px_rgba(8,36,28,0.12)] bg-[#EFE7D7]">
                <img
                  src="/images/bridal-trial.webp"
                  alt={lang === "hi" ? "ब्राइडल ट्रायल सत्र" : "Bridal Trial Session"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={640}
                  height={800}
                />
              </div>
            </div>

            {/* Right: 4 Numbered Steps */}
            <div className="flex flex-col justify-between space-y-5 text-left">
              {t.bridalPage.trialSteps.map((step) => (
                <div
                  key={step.number}
                  className="p-6 rounded-[16px] bg-[#EFE7D7] border border-[rgba(18,63,49,0.14)] flex items-start gap-5 shadow-[0_10px_30px_rgba(8,36,28,0.04)]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0B2E24] text-[#C9A45C] font-heading text-[20px] font-bold flex items-center justify-center flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-heading text-[20px] text-[#0B2E24] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[#4E5F57] text-[14px] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Before / After (Emerald) */}
      <section className="section-emerald section-padding border-t border-[rgba(201,164,92,0.18)]">
        <div className="site-container">
          <SectionHeading
            eyebrow={t.sections.beforeAfterEyebrow}
            title={t.sections.beforeAfterTitle}
            subtitle={t.sections.beforeAfterSubtitle}
            theme="dark"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-[1040px] mx-auto">
            {beforeAfterPairs.map((pair) => (
              <div key={pair.id} className="flex justify-center">
                <BeforeAfter
                  beforeImage={pair.beforeImage}
                  afterImage={pair.afterImage}
                  title={l(pair.title)}
                  description={l(pair.description)}
                  aspectRatio="4/5"
                  theme="dark"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bridal FAQ (Ivory) */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          <SectionHeading
            eyebrow={t.sections.faqEyebrow}
            title={t.sections.faqTitle}
            subtitle={t.sections.faqSubtitle}
            theme="light"
            className="mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {bridalFaqs.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-[16px] bg-[#EFE7D7] border border-[rgba(18,63,49,0.12)] text-left"
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
      </section>

      {/* 7. Booking Banner (Emerald) */}
      <BookingBanner theme="dark" />
    </div>
  )
}
