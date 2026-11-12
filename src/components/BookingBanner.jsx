import React from "react"
import { WhatsappLogo, PhoneCall } from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"
import BgVideo from "./BgVideo"
import Button from "./Button"

export default function BookingBanner({ theme = "dark" }) {
  const { t } = useLanguage()
  const isLight = theme === "light"

  return (
    <section
      className={`relative overflow-hidden py-24 sm:py-32 border-t ${
        isLight
          ? "bg-[#F7F2E8] text-[#15251F] border-[rgba(18,63,49,0.14)]"
          : "bg-[#08241C] text-[#F3ECDD] border-[rgba(201,164,92,0.2)]"
      }`}
    >
      {/* Background Video on Dark, subtle texture on Light */}
      {!isLight ? (
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
      ) : (
        <div className="absolute inset-0 z-0 bg-[#EFE7D7] opacity-40 pointer-events-none" />
      )}

      {/* Centred Content (Symmetrical) */}
      <div className="relative z-10 site-container max-w-[800px] text-center px-4">
        <span
          className={`eyebrow block mb-3 ${
            isLight ? "text-[#C9A45C]" : "text-[#C9A45C]"
          }`}
        >
          {t.sections.bannerEyebrow}
        </span>
        <h2
          className={`font-heading text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.05] mb-4 ${
            isLight ? "text-[#0B2E24]" : "text-[#F3ECDD]"
          }`}
        >
          {t.sections.bannerTitle}
        </h2>
        <p
          className={`text-[clamp(1rem,1.1vw,1.125rem)] mx-auto mb-10 leading-[1.65] max-w-[58ch] ${
            isLight ? "text-[#4E5F57]" : "text-[#C3CEC4]"
          }`}
        >
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
            variant={isLight ? "secondary-light" : "secondary-dark"}
            className="!py-4 !px-8"
          >
            <PhoneCall
              size={20}
              weight="light"
              className={isLight ? "text-[#0B2E24]" : "text-[#C9A45C]"}
            />
            <span>{t.nav.callUs}</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
