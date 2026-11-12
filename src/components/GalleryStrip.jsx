import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "@phosphor-icons/react"
import { galleryItems } from "../data/gallery"
import { useLanguage } from "../i18n/LanguageContext"
import Button from "./Button"
import SectionHeading from "./SectionHeading"

gsap.registerPlugin(ScrollTrigger)

export default function GalleryStrip() {
  const { t, l } = useLanguage()
  const stripRef = useRef(null)
  const trackRef = useRef(null)

  // 8 photos for the strip
  const stripPhotos = galleryItems.slice(0, 8)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 1024

    if (prefersReducedMotion || isMobile || !trackRef.current || !stripRef.current) {
      return
    }

    const track = trackRef.current
    const totalScrollWidth = track.scrollWidth - track.clientWidth

    const tween = gsap.to(track, {
      x: -totalScrollWidth * 0.45,
      ease: "none",
      scrollTrigger: {
        trigger: stripRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      ref={stripRef}
      className="section-emerald section-padding overflow-hidden border-t border-[rgba(201,164,92,0.18)]"
    >
      <div className="site-container mb-12 sm:mb-16">
        <SectionHeading
          eyebrow={t.sections.galleryEyebrow}
          title={t.sections.galleryTitle}
          subtitle={t.sections.gallerySubtitle}
          theme="dark"
        />
      </div>

      {/* Symmetrical 4-Column Grid inside Container (Centered, perfectly balanced) */}
      <div className="site-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stripPhotos.slice(0, 4).map((photo) => (
            <div
              key={photo.id}
              className="w-full aspect-[4/5] rounded-[16px] overflow-hidden border border-[rgba(201,164,92,0.2)] bg-[#123F31] group relative shadow-[0_10px_30px_rgba(8,36,28,0.12)]"
            >
              <img
                src={photo.src}
                alt={l(photo.title)}
                loading="lazy"
                width={640}
                height={800}
                className="w-full h-full object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[rgba(8,36,28,0.2)] pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 bg-[rgba(8,36,28,0.85)] border border-[rgba(201,164,92,0.2)] rounded-[8px] p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[13px] text-[#F3ECDD] font-medium block leading-snug">
                  {l(photo.title)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centred Action Button */}
      <div className="mt-12 text-center">
        <Button to="/gallery" variant="secondary-dark">
          <span>{t.sections.openGalleryBtn}</span>
          <ArrowRight size={16} weight="light" />
        </Button>
      </div>
    </section>
  )
}
