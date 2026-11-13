import React from "react"
import { Link } from "react-router-dom"
import {
  MapPin,
  Clock,
  Phone,
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
  ArrowUpRight,
} from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"

const CURRENT_YEAR = 2026

export default function Footer() {
  const { lang, t, l } = useLanguage()

  return (
    <footer className="bg-[#08241C] text-[#F3ECDD] border-t border-[rgba(201,164,92,0.2)]">
      <div className="site-container py-16 sm:py-20">
        {/* Centred Logo, Wordmark & Tagline */}
        <div className="flex flex-col items-center justify-center text-center pb-12 sm:pb-16 border-b border-[rgba(201,164,92,0.18)]">
          <Link to="/" className="inline-flex items-center justify-center gap-3.5 group text-center" aria-label="Roop Nikhar Home">
            <img
              src="/images/logo.webp"
              alt="Roop Nikhar Emblem"
              width={54}
              height={54}
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-heading text-[34px] sm:text-[44px] text-[#F3ECDD] tracking-[0.04em] block transition-colors group-hover:text-[#E3C88A] text-center">
              {l(siteData.name)}
            </span>
          </Link>
          <p className={`text-[14px] uppercase ${lang === "hi" ? "tracking-normal" : "tracking-[0.2em]"} text-[#C9A45C] mt-2 font-medium text-center`}>
            {l(siteData.tagline)} · {lang === "hi" ? "मोतिहारी" : "MOTIHARI"}
          </p>
        </div>

        {/* 3 Equal Symmetrical Columns with Centered Text */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-10 py-12 sm:py-16 text-center border-b border-[rgba(201,164,92,0.18)] w-full"
        >
          {/* Column 1: Visit us */}
          <div className="w-full flex flex-col items-center justify-start text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#C9A45C]">
              <MapPin size={20} weight="light" />
              <span className="text-[13px] uppercase tracking-[0.14em] font-medium">
                {t.common.address}
              </span>
            </div>
            <p className="text-[#C3CEC4] text-[15px] leading-relaxed max-w-[320px]">
              {l(siteData.address)}
            </p>
            <a
              href={siteData.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] text-[#E3C88A] hover:text-[#C9A45C] transition-colors pt-1"
            >
              <span>{t.common.openMap}</span>
              <ArrowUpRight size={16} weight="light" />
            </a>
          </div>

          {/* Column 2: Hours & Contact */}
          <div className="w-full flex flex-col items-center justify-start text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#C9A45C]">
              <Clock size={20} weight="light" />
              <span className="text-[13px] uppercase tracking-[0.14em] font-medium">
                {t.common.hours}
              </span>
            </div>
            <p className="text-[#C3CEC4] text-[15px] leading-relaxed max-w-[320px]">
              {l(siteData.hours)}
            </p>
            <div className="flex items-center justify-center gap-2 pt-1 text-[14px] text-[#E3C88A]">
              <Phone size={16} weight="light" className="text-[#C9A45C]" />
              <a
                href={`tel:${siteData.phone.replace(/\s+/g, "")}`}
                className="hover:underline"
              >
                {siteData.phone}
              </a>
            </div>
          </div>

          {/* Column 3: Quick links (All 8 links in 2 neat columns) */}
          <div className="w-full flex flex-col items-center justify-start text-center space-y-4">
            <span className="text-[13px] uppercase tracking-[0.14em] text-[#C9A45C] font-medium block">
              {t.nav.menu}
            </span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] text-center w-full max-w-[280px]">
              <Link
                to="/"
                className="text-[#C3CEC4] hover:text-[#C9A45C] transition-colors"
              >
                {t.nav.home}
              </Link>
              <Link
                to="/gallery"
                className="text-[#C3CEC4] hover:text-[#C9A45C] transition-colors"
              >
                {t.nav.gallery}
              </Link>
              <Link
                to="/services"
                className="text-[#C3CEC4] hover:text-[#C9A45C] transition-colors"
              >
                {t.nav.services}
              </Link>
              <Link
                to="/about"
                className="text-[#C3CEC4] hover:text-[#C9A45C] transition-colors"
              >
                {t.nav.about}
              </Link>
              <Link
                to="/bridal"
                className="text-[#C3CEC4] hover:text-[#C9A45C] transition-colors"
              >
                {t.nav.bridal}
              </Link>
              <Link
                to="/contact"
                className="text-[#C3CEC4] hover:text-[#C9A45C] transition-colors"
              >
                {t.nav.contact}
              </Link>
              <Link
                to="/pricing"
                className="text-[#C3CEC4] hover:text-[#C9A45C] transition-colors"
              >
                {t.nav.pricing}
              </Link>
              <Link
                to="/booking"
                className="text-[#C3CEC4] hover:text-[#C9A45C] transition-colors"
              >
                {t.nav.bookNow}
              </Link>
            </div>
          </div>
        </div>

        {/* Socials & Copyright: Centered & Stacked */}
        <div className="pt-10 flex flex-col items-center justify-center gap-4 text-center text-[13px] text-[#C3CEC4]">
          <div className="flex items-center justify-center gap-6 text-[#C9A45C]">
            <a
              href={siteData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-[#E3C88A] transition-colors p-1"
            >
              <InstagramLogo size={22} weight="light" />
            </a>
            <a
              href={siteData.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-[#E3C88A] transition-colors p-1"
            >
              <FacebookLogo size={22} weight="light" />
            </a>
            <a
              href={`https://wa.me/${siteData.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hover:text-[#E3C88A] transition-colors p-1"
            >
              <WhatsappLogo size={22} weight="light" />
            </a>
          </div>

          <p className="m-0">
            © {CURRENT_YEAR} {l(siteData.name)} • {lang === "hi" ? "मोतिहारी, बिहार" : "Motihari, Bihar"}
          </p>
        </div>
      </div>
    </footer>
  )
}
