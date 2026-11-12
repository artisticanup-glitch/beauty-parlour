import React, { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { List, X, WhatsappLogo, InstagramLogo, FacebookLogo } from "@phosphor-icons/react"
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

  const allNavItems = [
    ...navItems,
    { to: "/booking", label: lang === "hi" ? "बुक" : "Book" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 border-b ${
        scrolled
          ? "bg-[#0B2E24] border-[rgba(201,164,92,0.28)]"
          : "bg-[#0B2E24] border-[rgba(201,164,92,0.18)]"
      }`}
    >
      <div className="site-container h-[88px] flex items-center justify-between">
        {/* DESKTOP HEADER (Logo Left -> Menu Items -> Language Switcher -> Book Button) */}
        <div className="hidden lg:flex items-center justify-between w-full gap-4 xl:gap-8">
          {/* 1. Logo Left */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group shrink-0"
            aria-label="Roop Nikhar Home"
          >
            <img
              src="/images/logo.webp"
              alt="Roop Nikhar Emblem"
              width={46}
              height={46}
              className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col items-start text-left">
              <span
                className="font-heading text-[24px] xl:text-[26px] leading-tight text-[#F3ECDD] tracking-[0.03em] transition-colors group-hover:text-[#E3C88A]"
              >
                {l(siteData.name)}
              </span>
              <span
                className={`text-[11px] uppercase ${lang === "hi" ? "tracking-normal" : "tracking-[0.24em]"} text-[#C9A45C] font-medium leading-none`}
              >
                {lang === "hi" ? "मोतिहारी" : "MOTIHARI"}
              </span>
            </div>
          </Link>

          {/* 2. Menu Items */}
          <nav className="flex items-center gap-5 xl:gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative py-2 text-[14px] xl:text-[15px] tracking-wide whitespace-nowrap transition-colors duration-200 group ${
                    isActive ? "text-[#C9A45C] font-medium" : "text-[#F3ECDD] hover:text-[#C9A45C]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C9A45C] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* 3. Language Switcher + 4. Book Button */}
          <div className="flex items-center gap-3 xl:gap-4 shrink-0 whitespace-nowrap">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              type="button"
              className="min-h-[44px] px-3.5 py-2 text-[13px] tracking-wider rounded-md border border-[rgba(201,164,92,0.35)] text-[#E3C88A] hover:bg-[#123F31] transition-colors shrink-0 whitespace-nowrap flex items-center justify-center font-medium"
              aria-label="Switch Language between English and Hindi"
            >
              {lang === "en" ? (
                <span>
                  <strong className="text-[#C9A45C]">EN</strong> | हिं
                </span>
              ) : (
                <span>
                  EN | <strong className="text-[#C9A45C]">हिं</strong>
                </span>
              )}
            </button>

            {/* Book Button */}
            <Button
              to="/booking"
              variant="primary"
              className="!py-2.5 !px-5 !text-[14px] shrink-0 whitespace-nowrap font-medium"
            >
              {lang === "hi" ? "बुक" : "Book"}
            </Button>
          </div>
        </div>

        {/* MOBILE HEADER (Phones & Tablets) */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Logo & Wordmark Left */}
          <Link to="/" className="flex items-center gap-2.5 text-left group" aria-label="Roop Nikhar Home">
            <img
              src="/images/logo.webp"
              alt="Roop Nikhar Emblem"
              width={38}
              height={38}
              className="w-9 h-9 object-contain"
            />
            <div className="flex flex-col text-left">
              <span className="font-heading text-[22px] sm:text-[24px] leading-tight text-[#F3ECDD]">
                {l(siteData.name)}
              </span>
              <span className={`text-[12px] uppercase ${lang === "hi" ? "tracking-normal" : "tracking-[0.22em]"} text-[#C9A45C] leading-none`}>
                {lang === "hi" ? "मोतिहारी" : "MOTIHARI"}
              </span>
            </div>
          </Link>

          {/* Right Controls: Lang toggle + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              type="button"
              style={{ minHeight: "44px", height: "44px", minWidth: "56px" }}
              className="px-3 text-[13px] rounded-[10px] border border-[rgba(201,164,92,0.35)] text-[#E3C88A] flex items-center justify-center font-medium shrink-0"
              aria-label="Toggle language"
            >
              {lang === "en" ? "EN | हिं" : "हिं | EN"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              style={{ minHeight: "44px", height: "44px", minWidth: "44px", width: "44px" }}
              className="flex items-center justify-center rounded-[12px] bg-[#123F31] text-[#E3C88A] border border-[rgba(201,164,92,0.3)] shrink-0"
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
            {allNavItems.map((item) => (
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
                className="w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.bookNow}
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
