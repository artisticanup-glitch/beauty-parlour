import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  CaretDown,
  Sparkle,
  ShieldCheck,
  CalendarCheck,
  House,
  WhatsappLogo,
  ArrowRight,
} from "@phosphor-icons/react"
import { useLanguage } from "../i18n/LanguageContext"
import { siteData } from "../data/site"
import { beforeAfterPairs } from "../data/gallery"

import SectionHeading from "../components/SectionHeading"
import Button from "../components/Button"
import BgVideo from "../components/BgVideo"
import ServiceTabs from "../components/ServiceTabs"
import PackageBuilder from "../components/PackageBuilder"
import PinnedBridalDay from "../components/PinnedBridalDay"
import BeforeAfter from "../components/BeforeAfter"
import GalleryStrip from "../components/GalleryStrip"
import HygieneProducts from "../components/HygieneProducts"
import ReviewsSection from "../components/ReviewsSection"
import FaqSection from "../components/FaqSection"
import BookingBanner from "../components/BookingBanner"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { lang, t, l } = useLanguage()

  // Refs for animations
  const heroRef = useRef(null)
  const heroVideoRef = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubtitleRef = useRef(null)
  const heroButtonsRef = useRef(null)
  const heroScrollRef = useRef(null)

  // Hero entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Hero background scale 1.15 -> 1.0 over 1.6s
      if (heroVideoRef.current) {
        gsap.fromTo(
          heroVideoRef.current,
          { scale: 1.15 },
          { scale: 1.0, duration: 1.6, ease: "power4.out" }
        )
      }

      // 2. H1, subtitle & buttons staggered fade up
      const tl = gsap.timeline({ delay: 0.2 })

      if (heroTitleRef.current) {
        tl.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power4.out" }
        )
      }

      if (heroSubtitleRef.current) {
        tl.fromTo(
          heroSubtitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
          "-=0.6"
        )
      }

      if (heroButtonsRef.current) {
        tl.fromTo(
          heroButtonsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power4.out" },
          "-=0.5"
        )
      }

      if (heroScrollRef.current) {
        tl.fromTo(
          heroScrollRef.current,
          { opacity: 0 },
          { opacity: 0.8, duration: 0.8, ease: "power4.out" },
          "-=0.3"
        )
      }

      // Scroll reveals on general section cards
      gsap.utils.toArray(".reveal-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  // 4 Promise icons for Intro section
  const promiseIcons = [
    <Sparkle key="sparkle" size={28} weight="light" className="text-[#C9A45C]" />,
    <ShieldCheck key="shield" size={28} weight="light" className="text-[#C9A45C]" />,
    <CalendarCheck key="calendar" size={28} weight="light" className="text-[#C9A45C]" />,
    <House key="house" size={28} weight="light" className="text-[#C9A45C]" />,
  ]

  return (
    <div className="w-full pb-16 lg:pb-0">
      {/* =====================================================================
          1. HERO â€” full-screen (100dvh) background VIDEO hero.mp4
         ===================================================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-[100dvh] min-h-[600px] flex items-end justify-center text-center overflow-hidden bg-[#0B2E24] pb-14 sm:pb-20"
      >
        {/* Background video with scale tween */}
        <div ref={heroVideoRef} className="absolute inset-0 z-0 w-full h-full">
          <BgVideo
            videoName="hero"
            aspectRatio="16/9"
            isHero={true}
            rounded="rounded-none"
            overlay={false}
            className="!h-full"
          />
        </div>

        {/* Hero Content (Positioned in bottom third with flat emerald shade behind text area only) */}
        <div className="relative z-10 site-container max-w-[840px] px-4 w-full">
            <div className="rn-hero-split">
              <div>
                <h1
                  ref={heroTitleRef}
                  className="font-heading text-[#F3ECDD] mb-2 tracking-tight leading-[1.02]"
                  style={{ fontSize: lang === "hi" ? "clamp(1.75rem, 4.4vw, 3.85rem)" : "clamp(2.1rem, 4.8vw, 4.25rem)" }}
                >
                  {t.hero.title}
                </h1>
                <p
                  ref={heroSubtitleRef}
                  className="text-[#F3ECDD] opacity-90 leading-[1.6] max-w-[46ch]"
                  style={{ fontSize: "clamp(0.98rem, 1.15vw, 1.15rem)" }}
                >
                  {t.hero.subtitle}
                </p>
                <p className="mt-2.5 text-[13px] font-medium text-[#E3C88A]">
                  {t.hero.laganCue}
                </p>
              </div>
              <div ref={heroButtonsRef} className="rn-split-actions">
                <Button to="/booking" variant="primary" className="w-full justify-center">
                  {t.hero.bookBtn}
                </Button>
                <Button
                  href={`https://wa.me/${siteData.whatsappNumber}`}
                  variant="secondary-dark"
                  className="w-full justify-center"
                >
                  <WhatsappLogo size={18} weight="light" className="text-[#C9A45C]" />
                  <span>{t.hero.whatsappBtn}</span>
                </Button>
              </div>
            </div>
        </div>

        {/* Seamless deep easing blend into the ivory Intro section (no hard edge) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45vh] min-h-[340px] max-h-[540px] pointer-events-none z-[5]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(247,242,232,0) 0%, rgba(247,242,232,0.02) 15%, rgba(247,242,232,0.08) 30%, rgba(247,242,232,0.22) 45%, rgba(247,242,232,0.48) 60%, rgba(247,242,232,0.76) 75%, rgba(247,242,232,0.94) 88%, #F7F2E8 95%, #F7F2E8 100%)",
          }}
          aria-hidden="true"
        />

        {/* Small Scroll Cue at bottom centre */}
        <div
          ref={heroScrollRef}
          className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-[#0B2E24] pointer-events-none"
        >
          <span className="text-[13px] uppercase tracking-[0.16em] font-medium opacity-80">
            {t.hero.scrollText}
          </span>
          <CaretDown size={16} weight="bold" className="rn-scroll-cue text-[#B5914A]" />
        </div>
      </section>

      {/* =====================================================================
          2. INTRO (Ivory) â€” centred H2 + short paragraph + 4 equal promise items (2x2 on mobile)
         ===================================================================== */}
      <section className="section-ivory section-padding">
        <div className="site-container">
          <SectionHeading
            eyebrow={t.intro.eyebrow}
            title={t.intro.title}
            subtitle={t.intro.paragraph}
            theme="light"
            className="mb-14 sm:mb-16"
          />

          {/* 2x2 Compact Grid on Mobile, 4 Equal Columns on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
            {t.intro.promises.map((promise, index) => (
              <div
                key={index}
                className="reveal-card p-4 sm:p-7 rounded-[16px] bg-[#EFE7D7] border border-[rgba(18,63,49,0.12)] text-center flex flex-col items-center justify-start shadow-[0_10px_30px_rgba(8,36,28,0.06)]"
              >
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#F7F2E8] border border-[rgba(18,63,49,0.14)] flex items-center justify-center mb-3 sm:mb-5 shrink-0">
                  {promiseIcons[index]}
                </div>
                <h3 className="font-heading text-[16px] sm:text-[20px] text-[#0B2E24] mb-1.5 font-semibold truncate w-full">
                  {promise.title}
                </h3>
                <p
                  className="text-[#4E5F57] text-[13px] sm:text-[14px] leading-relaxed"
                  style={{ textWrap: "pretty" }}
                >
                  {promise.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SERVICES (Emerald) â€” ServiceTabs: 3 cols desktop, 1 mobile
         ===================================================================== */}
      <section className="section-emerald section-padding border-t border-[rgba(201,164,92,0.18)]">
        <div className="site-container">
          <SectionHeading
            eyebrow={t.sections.servicesEyebrow}
            title={t.sections.servicesTitle}
            subtitle={t.sections.servicesSubtitle}
            theme="dark"
            className="mb-12 sm:mb-16"
          />

          <ServiceTabs limitCount={6} />

          <div className="mt-14 text-center">
            <Button to="/services" variant="secondary-dark">
              <span>{t.sections.viewAllServices}</span>
              <ArrowRight size={16} weight="light" />
            </Button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. BRIDAL PACKAGES (Ivory) â€” PackageBuilder
         ===================================================================== */}
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

      {/* =====================================================================
          5. PINNED "Your bridal day" (Emerald) â€” Haldi, Mehendi, Shaadi, Reception
         ===================================================================== */}
      <PinnedBridalDay />

      {/* =====================================================================
          6. BEFORE / AFTER (Ivory) â€” 2 BeforeAfter sliders side by side (equal)
         ===================================================================== */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          <SectionHeading
            eyebrow={t.sections.beforeAfterEyebrow}
            title={t.sections.beforeAfterTitle}
            subtitle={t.sections.beforeAfterSubtitle}
            theme="light"
            className="mb-16"
          />

          {/* 2 Sliders Side by Side on Desktop, 1 on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-[1040px] mx-auto">
            {beforeAfterPairs.map((pair) => (
              <div key={pair.id} className="reveal-card flex justify-center">
                <BeforeAfter
                  beforeImage={pair.beforeImage}
                  afterImage={pair.afterImage}
                  title={l(pair.title)}
                  description={l(pair.description)}
                  aspectRatio="4/5"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. GALLERY STRIP (Emerald) â€” Horizontal moving row of 8 photos
         ===================================================================== */}
      <GalleryStrip />

      {/* =====================================================================
          8. HYGIENE & PRODUCTS (Ivory) â€” 50/50: studio.mp4 + Brands & Steps
         ===================================================================== */}
      <HygieneProducts />

      {/* =====================================================================
          9. REVIEWS (Emerald) â€” 3 equal review cards, manual arrows
         ===================================================================== */}
      <ReviewsSection />

      {/* =====================================================================
          10. FAQ (Ivory) â€” All Q&As visible in 2 equal columns (no accordion)
         ===================================================================== */}
      <FaqSection />

      {/* =====================================================================
          11. BOOKING BANNER (Emerald) â€” banner.mp4 subtle background + CTA
         ===================================================================== */}
      <BookingBanner />
    </div>
  )
}
