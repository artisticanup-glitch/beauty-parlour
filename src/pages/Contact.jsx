import React from "react"
import {
  MapPin,
  Clock,
  Phone,
  WhatsappLogo,
  ArrowUpRight,
  NavigationArrow,
} from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"
import SectionHeading from "../components/SectionHeading"
import Button from "../components/Button"
import BookingBanner from "../components/BookingBanner"

export default function Contact() {
  const { lang, t, l } = useLanguage()

  const contactCards = [
    {
      id: "address",
      icon: <MapPin size={26} weight="light" className="text-[#0B2E24]" />,
      title: t.contactPage.addressTitle,
      detail: l(siteData.address),
      actionLabel: t.common.openMap,
      actionUrl: siteData.mapUrl,
      isExternal: true,
    },
    {
      id: "hours",
      icon: <Clock size={26} weight="light" className="text-[#0B2E24]" />,
      title: t.contactPage.hoursTitle,
      detail: l(siteData.hours),
      actionLabel: lang === "hi" ? "समय सारिणी" : "Daily & Lagan Timings",
      actionUrl: null,
      isExternal: false,
    },
    {
      id: "phone",
      icon: <Phone size={26} weight="light" className="text-[#0B2E24]" />,
      title: t.contactPage.phoneTitle,
      detail: siteData.phone,
      actionLabel: t.common.callDirect,
      actionUrl: `tel:${siteData.phone.replace(/\s+/g, "")}`,
      isExternal: false,
    },
    {
      id: "whatsapp",
      icon: <WhatsappLogo size={26} weight="light" className="text-[#0B2E24]" />,
      title: t.contactPage.whatsappTitle,
      detail: siteData.phone,
      actionLabel: t.common.sendWhatsapp,
      actionUrl: `https://wa.me/${siteData.whatsappNumber}`,
      isExternal: true,
    },
  ]

  return (
    <div className="w-full pb-16 lg:pb-0">
      {/* 1. Page Hero (Emerald, 55vh) */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="site-container py-20 max-w-[800px] z-10">
          <SectionHeading
            eyebrow={t.contactPage.heroEyebrow}
            title={t.contactPage.heroTitle}
            subtitle={t.contactPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      {/* 2. Contact Cards Section (Ivory, Symmetrical 4 Equal Cards) */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <span className="eyebrow block mb-3 text-[#C9A45C]">
              {lang === "hi" ? "स्टूडियो विवरण" : "Location & Reach"}
            </span>
            <h2 className="font-heading text-[clamp(2.1rem,4.2vw,3.75rem)] text-[#0B2E24] leading-[1.05] mb-4">
              {lang === "hi" ? "हमसे संपर्क करें" : "Visit Our Parlour Studio"}
            </h2>
            <p className="text-[#4E5F57] text-[clamp(1rem,1.1vw,1.125rem)] mx-auto leading-[1.65]">
              {t.contactPage.directionsText}
            </p>
          </div>

          {/* 4 Equal Cards: 2x2 on Desktop, 1 on Mobile (Symmetrical) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-[1040px] mx-auto mb-14">
            {contactCards.map((card) => (
              <div
                key={card.id}
                className="p-8 rounded-[16px] bg-[#EFE7D7] border border-[rgba(18,63,49,0.14)] shadow-[0_10px_30px_rgba(8,36,28,0.06)] flex flex-col justify-between text-left"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#F7F2E8] border border-[rgba(18,63,49,0.14)] flex items-center justify-center mb-5">
                    {card.icon}
                  </div>
                  <h3 className="font-heading text-[22px] text-[#0B2E24] mb-2 font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-[#4E5F57] text-[15px] leading-relaxed mb-6">
                    {card.detail}
                  </p>
                </div>

                {card.actionUrl && (
                  <div className="pt-4 border-t border-[rgba(18,63,49,0.12)]">
                    <a
                      href={card.actionUrl}
                      target={card.isExternal ? "_blank" : undefined}
                      rel={card.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0B2E24] hover:text-[#1F6B4F] transition-colors"
                    >
                      <span>{card.actionLabel}</span>
                      <ArrowUpRight size={16} weight="bold" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Centred Big "Open in Google Maps" Button (No iframe) */}
          <div className="text-center">
            <Button
              href={siteData.mapUrl}
              variant="primary"
              className="!py-4 !px-8 !text-[16px]"
            >
              <NavigationArrow size={20} weight="light" className="text-[#08241C]" />
              <span>{t.contactPage.openInMap}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Booking Banner (Emerald) */}
      <BookingBanner theme="dark" />
    </div>
  )
}
