import React, { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { List, X, GlobeSimple, CalendarCheck, WhatsappLogo, InstagramLogo, FacebookLogo } from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"
import Button from "./Button"

export default function Header() {
  const { lang, toggleLang, t, l } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change without cascading effect render
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setMobileMenuOpen(false)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Track scroll for subtle background elevation (flat color)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/bridal", label: t.nav.bridal },
    { to: "/pricing", label: t.nav.pricing },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ]


  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b backdrop-blur-md ${
        scrolled
          ? "bg-[rgba(8,36,28,0.95)] border-[rgba(201,164,92,0.28)] shadow-[0_4px_24px_rgba(4,18,14,0.35)]"
          : "bg-[rgba(8,36,28,0.85)] border-[rgba(201,164,92,0.18)]"
      }`}
    >
      <div className="site-container h-[88px] flex items-center justify-between">
        {/* DESKTOP HEADER (Logo Left -> Menu Items -> Language Switcher -> Book Button) */}
        <div className="hidden lg:flex items-center justify-between w-full gap-4 xl:gap-6 2xl:gap-8">
          {/* 1. Logo Left */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group shrink-0"
            aria-label="Roop Nikhar Home"
          >
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-[rgba(201,164,92,0.12)] border border-[rgba(201,164,92,0.3)] shadow-[0_2px_8px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 group-hover:border-[rgba(201,164,92,0.6)] group-hover:scale-105">
              <img
                src="/images/logo.webp"
                alt="Roop Nikhar Emblem"
                width={40}
                height={40}
                className="w-9 h-9 object-contain drop-shadow-[0_1px_3px_rgba(201,164,92,0.3)]"
              />
            </div>
            <div className="flex flex-col items-start text-left">
              <span
                className="font-heading text-[25px] xl:text-[27px] font-semibold leading-tight text-[#F3ECDD] tracking-[0.02em] transition-colors group-hover:text-[#E3C88A]"
              >
                {l(siteData.name)}
              </span>
              <span
                className={`text-[11px] uppercase ${lang === "hi" ? "tracking-normal" : "tracking-[0.24em]"} text-[#C9A45C] font-medium leading-none mt-0.5`}
              >
                {lang === "hi" ? "मोतिहारी" : "MOTIHARI"}
              </span>
            </div>
          </Link>

          {/* 2. Menu Items */}
          <nav className="flex items-center gap-4 xl:gap-6 2xl:gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative py-2 text-[14px] xl:text-[15px] font-medium tracking-wide whitespace-nowrap transition-colors duration-200 group ${
                    isActive ? "text-[#E3C88A]" : "text-[#F3ECDD] hover:text-[#E3C88A]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#C9A45C] transition-all duration-300 ${
                        isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* 3. Language Switcher + 4. Book Button */}
          <div className="flex items-center gap-3.5 xl:gap-4 shrink-0 whitespace-nowrap">
            {/* Compact Language Switcher */}
            <button
              onClick={toggleLang}
              type="button"
              className="h-9 px-3 rounded-[10px] border border-[rgba(201,164,92,0.3)] bg-[rgba(18,63,49,0.4)] hover:bg-[rgba(18,63,49,0.7)] hover:border-[rgba(201,164,92,0.55)] text-[#E3C88A] hover:text-[#F3ECDD] text-[13px] font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none shrink-0"
              aria-label={`Switch Language to ${lang === "en" ? "Hindi" : "English"}`}
            >
              <GlobeSimple size={15} weight="regular" className="text-[#C9A45C]" />
              <span className="leading-none">{lang === "en" ? "हिन्दी" : "English"}</span>
            </button>

            {/* Book Button */}
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-5 py-2.5 rounded-[10px] bg-[#C9A45C] hover:bg-[#D4B26F] text-[#08241C] font-semibold text-[14px] tracking-wide shadow-[0_2px_12px_rgba(201,164,92,0.22)] hover:shadow-[0_4px_18px_rgba(201,164,92,0.35)] transition-all duration-200 active:scale-[0.98] shrink-0 whitespace-nowrap"
            >
              <CalendarCheck size={16} weight="bold" />
              <span>{lang === "hi" ? "बुक" : "Book"}</span>
            </Link>
          </div>
        </div>

        {/* MOBILE HEADER (Phones & Tablets) */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Logo & Wordmark Left */}
          <Link to="/" className="flex items-center gap-2.5 text-left group" aria-label="Roop Nikhar Home">
            <div className="w-10 h-10 rounded-full p-0.5 bg-[rgba(201,164,92,0.12)] border border-[rgba(201,164,92,0.3)] flex items-center justify-center shrink-0">
              <img
                src="/images/logo.webp"
                alt="Roop Nikhar Emblem"
                width={34}
                height={34}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-[22px] sm:text-[24px] font-semibold leading-tight text-[#F3ECDD]">
                {l(siteData.name)}
              </span>
              <span className={`text-[11px] uppercase ${lang === "hi" ? "tracking-normal" : "tracking-[0.2em]"} text-[#C9A45C] leading-none mt-0.5`}>
                {lang === "hi" ? "मोतिहारी" : "MOTIHARI"}
              </span>
            </div>
          </Link>

          {/* Right Controls: Compact Lang button + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              type="button"
              style={{ minHeight: "44px", height: "44px" }}
              className="px-2.5 rounded-[10px] border border-[rgba(201,164,92,0.3)] bg-[rgba(18,63,49,0.4)] hover:bg-[rgba(18,63,49,0.7)] text-[#E3C88A] text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none shrink-0"
              aria-label={`Switch Language to ${lang === "en" ? "Hindi" : "English"}`}
            >
              <GlobeSimple size={15} weight="regular" className="text-[#C9A45C]" />
              <span className="leading-none">{lang === "en" ? "हिन्दी" : "English"}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              style={{ minHeight: "44px", height: "44px", minWidth: "44px", width: "44px" }}
              className="flex items-center justify-center rounded-[12px] bg-[#123F31] hover:bg-[#1A5240] text-[#E3C88A] border border-[rgba(201,164,92,0.3)] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors shrink-0"
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
            >
              {mobileMenuOpen ? (
                <X size={26} weight="light" />
              ) : (
                <List size={26} weight="light" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN EMERALD MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[88px] z-50 bg-[#0B2E24] text-[#F3ECDD] flex flex-col justify-between p-6 pb-28 overflow-y-auto"
          style={{ height: "calc(100dvh - 88px)" }}
        >
          {/* Centred Links in Cormorant 32px */}
          <nav className="flex flex-col items-center justify-center text-center py-6 gap-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `font-heading text-[32px] tracking-wide transition-colors ${
                    isActive ? "text-[#C9A45C]" : "text-[#F3ECDD] hover:text-[#C9A45C]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-4 w-full max-w-[280px]">
              <Button
                to="/booking"
                variant="primary"
                className="w-full text-center flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CalendarCheck size={18} weight="bold" />
                <span>{lang === "hi" ? "बुक" : "Book"}</span>
              </Button>
            </div>
          </nav>

          {/* Bottom Info: Phone + Hours + Socials */}
          <div className="border-t border-[rgba(201,164,92,0.2)] pt-6 text-center text-sm space-y-3">
            <p className="text-[#C3CEC4] text-[13px]">{l(siteData.hours)}</p>
            <p className="text-[14px]">
              <a
                href={`tel:${siteData.phone.replace(/\s+/g, "")}`}
                className="text-[#E3C88A] hover:underline"
              >
                {siteData.phone}
              </a>
            </p>
            <div className="flex justify-center gap-6 pt-1 text-[#C9A45C]">
              <a
                href={siteData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2"
              >
                <InstagramLogo size={22} weight="light" />
              </a>
              <a
                href={siteData.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2"
              >
                <FacebookLogo size={22} weight="light" />
              </a>
              <a
                href={`https://wa.me/${siteData.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="p-2"
              >
                <WhatsappLogo size={22} weight="light" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
