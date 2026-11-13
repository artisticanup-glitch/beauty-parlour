import React from "react"
import {
  ChatCircleDots,
  CalendarCheck,
  CheckCircle,
  PhoneCall,
  Clock,
} from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"
import SectionHeading from "../components/SectionHeading"
import BookingForm from "../components/BookingForm"
import BookingBanner from "../components/BookingBanner"

export default function Booking() {
  const { lang, t, l } = useLanguage()

  const stepIcons = [
    <ChatCircleDots key="chat" size={24} weight="light" className="text-[#C9A45C]" />,
    <CalendarCheck key="calendar" size={24} weight="light" className="text-[#C9A45C]" />,
    <CheckCircle key="check" size={24} weight="light" className="text-[#C9A45C]" />,
  ]

  return (
    <div className="w-full pb-16 lg:pb-0">
      {/* 1. Page Hero (Emerald, 55vh) */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="site-container py-20 max-w-[800px] z-10">
          <SectionHeading
            eyebrow={t.bookingPage.heroEyebrow}
            title={t.bookingPage.heroTitle}
            subtitle={t.bookingPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      {/* 2. 50/50 Symmetrical Booking Section (Ivory) */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-[1140px] mx-auto">
            {/* Left: BookingForm Card */}
            <div>
              <BookingForm />
            </div>

            {/* Right: What Happens Next in 3 Steps */}
            <div className="space-y-8 text-left lg:pt-4">
              <div>
                <h3 className="font-heading text-[28px] sm:text-[34px] text-[#0B2E24] mb-3 leading-snug">
                  {t.bookingPage.nextHeading}
                </h3>
                <p className="text-[#4E5F57] text-[15px] leading-relaxed" style={{ textWrap: "pretty" }}>
                  {lang === "hi"
                    ? "हम आपकी सुविधा और समय का पूरा ध्यान रखते हैं। नीचे दिए गए तीन चरणों में आपकी बुकिंग पूरी होगी:"
                    : "We prioritize your comfort and schedule. Your reservation is confirmed in three simple steps:"}
                </p>
              </div>

              {/* 3 Numbered Steps */}
              <div className="space-y-6">
                {t.bookingPage.nextSteps.map((st, idx) => (
                  <div
                    key={st.step}
                    className="p-6 rounded-[16px] bg-[#EFE7D7] border border-[rgba(18,63,49,0.14)] flex items-start gap-5 shadow-[0_10px_30px_rgba(8,36,28,0.04)]"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#0B2E24] text-[#C9A45C] flex items-center justify-center flex-shrink-0">
                      {stepIcons[idx]}
                    </div>
                    <div>
                      <h4 className="font-heading text-[20px] text-[#0B2E24] font-semibold mb-1">
                        {st.title}
                      </h4>
                      <p className="text-[#4E5F57] text-[14px] leading-relaxed" style={{ textWrap: "pretty" }}>
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact Card */}
              <div className="p-6 rounded-[16px] bg-[#F7F2E8] border border-[rgba(18,63,49,0.18)] space-y-3">
                <span className="text-[13px] uppercase tracking-wider font-semibold text-[#0B2E24] block">
                  {lang === "hi" ? "त्वरित सहायता के लिए" : "Need Immediate Assistance?"}
                </span>
                <div className="flex items-center gap-2 text-[14px] text-[#4E5F57]">
                  <PhoneCall size={18} weight="light" className="text-[#0B2E24]" />
                  <a
                    href={`tel:${siteData.phone.replace(/\s+/g, "")}`}
                    className="text-[#0B2E24] font-medium hover:underline"
                  >
                    {siteData.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-[#4E5F57]">
                  <Clock size={18} weight="light" className="text-[#0B2E24]" />
                  <span>{l(siteData.hours)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Booking Banner (Emerald) */}
      <BookingBanner theme="dark" />
    </div>
  )
}
