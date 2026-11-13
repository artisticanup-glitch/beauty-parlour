import React from "react"
import { useLanguage } from "../i18n/LanguageContext"
import SectionHeading from "../components/SectionHeading"
import BgVideo from "../components/BgVideo"
import HygieneProducts from "../components/HygieneProducts"
import BookingBanner from "../components/BookingBanner"
import ParallaxImage from "../components/ParallaxImage"

export default function About() {
  const { lang, t } = useLanguage()

  return (
    <div className="w-full pb-16 lg:pb-0">
      {/* 1. Hero with studio.mp4 (Emerald, 60vh) */}
      <section className="relative min-h-[55vh] sm:min-h-[60vh] bg-[#0B2E24] text-[#F3ECDD] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background video with flat dark layer */}
        <div className="absolute inset-0 z-0">
          <BgVideo
            videoName="studio"
            aspectRatio="16/9"
            rounded="rounded-none"
            overlay={true}
            className="!h-full"
          />
          <div className="absolute inset-0 bg-[rgba(8,36,28,0.7)]" />
        </div>

        <div className="site-container py-20 max-w-[800px] z-10 relative">
          <SectionHeading
            eyebrow={t.aboutPage.heroEyebrow}
            title={t.aboutPage.heroTitle}
            subtitle={t.aboutPage.heroSubtitle}
            theme="dark"
          />
        </div>
      </section>

      {/* 2. Story of the Studio: 2 Columns (Text Left, Studio Video Right, Same Height) */}
      <section className="section-ivory section-padding border-t border-[rgba(18,63,49,0.14)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Story text */}
            <div className="text-left space-y-6">
              <div>
                <h2 className="font-heading text-[clamp(2.1rem,4.2vw,3.75rem)] text-[#0B2E24] leading-[1.05]">
                  {t.aboutPage.storyHeading}
                </h2>
              </div>
              <div className="space-y-5 text-[#4E5F57] text-[clamp(1rem,1.1vw,1.125rem)] leading-[1.75] max-w-[54ch]">
                <p>{t.aboutPage.storyP1}</p>
                <p>{t.aboutPage.storyP2}</p>
              </div>
            </div>

            {/* Right: Studio Video (same visual weight, vertically centered) */}
            <div className="w-full flex justify-center">
              <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-[rgba(18,63,49,0.2)] shadow-[0_10px_30px_rgba(8,36,28,0.12)] bg-[#EFE7D7]">
                <BgVideo
                  videoName="studio"
                  aspectRatio="4/3"
                  rounded="rounded-none"
                  overlay={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Team Section: 4 Equal Cards (Emerald) */}
      <section className="section-emerald section-padding border-t border-[rgba(201,164,92,0.18)]">
        <div className="site-container">
          <SectionHeading
            eyebrow={lang === "hi" ? "कलाकार" : "Artisans"}
            title={t.aboutPage.teamHeading}
            subtitle={t.aboutPage.teamSubtitle}
            theme="dark"
            className="mb-16"
          />

          {/* Symmetrical 4-Card Grid with Identical Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
            {t.aboutPage.team.map((member, idx) => (
              <div
                key={idx}
                className="group bg-[#123F31] rounded-[16px] overflow-hidden border border-[rgba(201,164,92,0.2)] shadow-[0_10px_30px_rgba(8,36,28,0.12)] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 text-center h-full"
              >
                {/* Photo with parallax & zoom on hover */}
                <ParallaxImage
                  src={member.image}
                  alt={member.name}
                  aspectRatio="4/5"
                  objectPosition="center 12%"
                  containerClassName="w-full aspect-[4/5] bg-[#08241C] shrink-0"
                  width={600}
                  height={750}
                >
                  <div className="absolute inset-0 bg-[rgba(8,36,28,0.2)] pointer-events-none z-10" />
                </ParallaxImage>

                {/* Details (Identical 2-line bio) */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-heading text-[22px] text-[#F3ECDD] font-semibold mb-1">
                      {member.name}
                    </h3>
                    <span className="text-[13px] text-[#C9A45C] font-medium block mb-3">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#F3ECDD] opacity-85 leading-relaxed" style={{ textWrap: "pretty" }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Hygiene Promise (Ivory) */}
      <HygieneProducts theme="light" />

      {/* 5. Booking Banner (Emerald) */}
      <BookingBanner theme="dark" />
    </div>
  )
}
