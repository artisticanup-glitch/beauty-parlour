import React from "react"
import { ArrowRight } from "@phosphor-icons/react"
import { galleryItems } from "../data/gallery"
import { useLanguage } from "../i18n/LanguageContext"
import Button from "./Button"
import SectionHeading from "./SectionHeading"
import ParallaxImage from "./ParallaxImage"

export default function GalleryStrip() {
  const { t, l } = useLanguage()

  // 4 featured photos for the strip
  const stripPhotos = galleryItems.slice(0, 4)

  return (
    <section
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
          {stripPhotos.map((photo) => (
            <ParallaxImage
              key={photo.id}
              src={photo.src}
              alt={l(photo.title)}
              aspectRatio="4/5"
              objectPosition="center 15%"
              width={640}
              height={800}
              containerClassName="w-full aspect-[4/5] rounded-[16px] border border-[rgba(201,164,92,0.2)] bg-[#123F31] group shadow-[0_10px_30px_rgba(8,36,28,0.12)]"
            >
              <div className="absolute inset-0 bg-[rgba(8,36,28,0.2)] pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 bg-[rgba(8,36,28,0.85)] border border-[rgba(201,164,92,0.2)] rounded-[8px] p-2 text-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-[13px] text-[#F3ECDD] font-medium block leading-snug">
                  {l(photo.title)}
                </span>
              </div>
            </ParallaxImage>
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
