import React from "react"
import { WhatsappLogo, PhoneCall } from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"
import BgVideo from "./BgVideo"
import Button from "./Button"

export default function BookingBanner() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-[#08241C] text-[#F3ECDD] py-24 sm:py-32 border-t border-[rgba(201,164,92,0.2)]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <BgVideo
          videoName="banner"
          aspectRatio="21/9"
          rounded="rounded-none"
          overlay={true}
          className="!h-full"
        />
        <div className="absolute inset-0 bg-[rgba(8,36,28,0.7)]" />
      </div>

      {/* Centred Content (Symmetrical) */}
      <div className="relative z-10 site-container max-w-[800px] text-center px-4">
        <span className="eyebrow block mb-3 text-[#C9A45C]">
          {t.sections.bannerEyebrow}
        </span>
        <h2 className="font-heading text-[clamp(2.2rem,4.5vw,3.8rem)] text-[#F3ECDD] leading-[1.05] mb-4">
          {t.sections.bannerTitle}
        </h2>
        <p className="text-[#C3CEC4] text-[clamp(1rem,1.1vw,1.125rem)] mx-auto mb-10 leading-[1.65] max-w-[58ch]">
          {t.sections.bannerSubtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            href={`https://wa.me/${siteData.whatsappNumber}`}
            variant="primary"
            className="!py-4 !px-8"
          >
            <WhatsappLogo size={20} weight="light" className="text-[#08241C]" />
            <span>{t.nav.whatsapp}</span>
          </Button>

          <Button
            href={`tel:${siteData.phone.replace(/\s+/g, "")}`}
            variant="secondary-dark"
            className="!py-4 !px-8"
          >
            <PhoneCall size={20} weight="light" className="text-[#C9A45C]" />
            <span>{t.nav.callUs}</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
