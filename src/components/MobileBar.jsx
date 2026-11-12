import React from "react"
import { Link } from "react-router-dom"
import { WhatsappLogo, PhoneCall, CalendarCheck } from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"

export default function MobileBar() {
  const { t } = useLanguage()

  return (
    <div
      style={{ left: 0, right: 0, width: "100%", maxWidth: "100%" }}
      className="lg:hidden fixed bottom-0 z-40 bg-[#08241C] border-t border-[rgba(201,164,92,0.3)] shadow-[0_-4px_20px_rgba(8,36,28,0.25)] box-border"
    >
      <div className="grid grid-cols-3 h-[64px] divide-x divide-[rgba(201,164,92,0.2)]">
        {/* 1: WhatsApp */}
        <a
          href={`https://wa.me/${siteData.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-[#E3C88A] hover:bg-[#123F31] active:bg-[#123F31] transition-colors min-h-[48px]"
          aria-label={t.common.whatsappUs}
        >
          <WhatsappLogo size={22} weight="light" className="text-[#C9A45C]" />
          <span className="text-[13px] font-medium tracking-wide">
            {t.common.whatsappUs}
          </span>
        </a>

        {/* 2: Call */}
        <a
          href={`tel:${siteData.phone.replace(/\s+/g, "")}`}
          className="flex flex-col items-center justify-center gap-1 text-[#E3C88A] hover:bg-[#123F31] active:bg-[#123F31] transition-colors min-h-[48px]"
          aria-label={t.common.callDirect}
        >
          <PhoneCall size={22} weight="light" className="text-[#C9A45C]" />
          <span className="text-[13px] font-medium tracking-wide">
            {t.nav.callUs}
          </span>
        </a>

        {/* 3: Book */}
        <Link
          to="/booking"
          className="flex flex-col items-center justify-center gap-1 bg-[#C9A45C] text-[#08241C] hover:bg-[#B5914A] active:scale-[0.98] transition-all min-h-[48px]"
          aria-label={t.nav.bookNow}
        >
          <CalendarCheck size={22} weight="light" className="text-[#08241C]" />
          <span className="text-[13px] font-semibold tracking-wide">
            {t.nav.bookNow}
          </span>
        </Link>
      </div>
    </div>
  )
}
