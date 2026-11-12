import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "../i18n/LanguageContext"
import BgVideo from "./BgVideo"

gsap.registerPlugin(ScrollTrigger)

export default function PinnedBridalDay() {
  const { t, l } = useLanguage()
  const sectionRef = useRef(null)
  const pinContainerRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: "haldi",
      video: "haldi",
      tag: { en: "Morning Ceremony", hi: "प्रातःकालीन रस्म" },
      title: { en: "Haldi Radiant Glow", hi: "हल्दी रस्म का निखार" },
      desc: {
        en: "Dewy, luminous skin prep and sweat-resistant formulation paired with fresh marigold floral ornaments.",
        hi: "हल्दी के उत्सव के लिए पसीना-रोधी ड्यूई बेस और ताजे गेंदे के फूलों के गहनों की सुंदर सेटिंग।",
      },
    },
    {
      id: "mehendi",
      video: "mehendi",
      tag: { en: "Afternoon Celebration", hi: "दोपहर का उत्सव" },
      title: { en: "Mehendi Festive Charm", hi: "मेहंदी उत्सव शृंगार" },
      desc: {
        en: "Vibrant festive makeup with soft braided hair, keeping you comfortable while your henna dries.",
        hi: "मेहंदी सूखने के दौरान आरामदायक और सुंदर रूप देने वाला जीवंत मेकअप और हेयर ब्रेड।",
      },
    },
    {
      id: "shaadi",
      video: "shaadi",
      tag: { en: "Auspicious Muhurat", hi: "शुभ विवाह लग्न" },
      title: { en: "Wedding Day Royalty", hi: "मुख्य विवाह का राजसी रूप" },
      desc: {
        en: "Flawless HD or Airbrush base that holds throughout the long rituals, with firm dupatta and jewellery pinning.",
        hi: "पवित्र फेरों और लंबी रस्मों तक टिकने वाला बेदाग बेस, भारी चुनरी और आभूषणों की सुरक्षित पिनिंग।",
      },
    },
    {
      id: "reception",
      video: "reception",
      tag: { en: "Evening Reception", hi: "रिसेप्शन संध्या" },
      title: { en: "Reception Glamour", hi: "रिसेप्शन संध्या शृंगार" },
      desc: {
        en: "Modern, captivating evening makeup with open glamorous waves and tailored styling for photography lights.",
        hi: "फोटोग्राफी की तेज रोशनी के अनुकूल आधुनिक शाम का मेकअप और खुले हेयर वेव्स।",
      },
    },
  ]

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 1024
    if (prefersReducedMotion || isMobile || !sectionRef.current || !pinContainerRef.current) {
      return
    }

    const totalSteps = steps.length
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top+=88px",
      end: `+=${window.innerHeight * 2.5}`,
      pin: pinContainerRef.current,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const step = Math.min(totalSteps - 1, Math.floor(self.progress * totalSteps))
        setActiveStep(step)
      },
    })

    return () => {
      pinTrigger.kill()
    }
  }, [steps.length])

  return (
    <section ref={sectionRef} className="relative bg-[#0B2E24] text-[#F3ECDD]">
      {/* DESKTOP PINNED SECTION (≥1024px) - Fits inside 100dvh minus header */}
      <div
        ref={pinContainerRef}
        className="hidden lg:flex flex-col justify-center h-[calc(100dvh-88px)] max-h-[calc(100dvh-88px)] px-6 overflow-hidden"
      >
        <div className="site-container w-full my-auto">
          {/* Section Header (Compact, never covered by sticky header) */}
          <div className="text-center max-w-[720px] mx-auto mb-6">
            <span className="eyebrow block mb-2 text-[#C9A45C]">
              {t.sections.bridalDayEyebrow}
            </span>
            <h2 className="font-heading text-[clamp(1.8rem,2.8vw,2.75rem)] text-[#F3ECDD] leading-[1.08] mb-2">
              {t.sections.bridalDayTitle}
            </h2>
            <p className="text-[#C3CEC4] text-[15px] mx-auto leading-snug max-w-[58ch]">
              {t.sections.bridalDaySubtitle}
            </p>
          </div>

          {/* Symmetrical 50/50 Grid (Video on Right, Text on Left) */}
          <div className="grid grid-cols-2 gap-12 items-center max-w-[1040px] mx-auto">
            {/* Left: Step Details + Progress Line */}
            <div className="relative pl-10 flex flex-col justify-center">
              {/* Thin Gold Progress Line */}
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[rgba(201,164,92,0.2)]">
                <div
                  className="w-full bg-[#C9A45C] transition-all duration-300"
                  style={{
                    height: `${((activeStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              {/* Step Navigation Pill Selector (Min 44px touch targets) */}
              <div className="flex items-center gap-3 mb-6">
                {steps.map((st, i) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(i)}
                    type="button"
                    className={`min-h-[44px] min-w-[48px] px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-colors cursor-pointer border flex items-center justify-center ${
                      activeStep === i
                        ? "bg-[#C9A45C] text-[#08241C] border-[#C9A45C]"
                        : "bg-transparent text-[#C3CEC4] border-[rgba(201,164,92,0.3)] hover:text-[#F3ECDD]"
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

              {/* Step Content with crossfade transition */}
              <div className="min-h-[160px] flex flex-col justify-center">
                <span className="text-[13px] uppercase tracking-[0.14em] text-[#C9A45C] font-semibold block mb-2">
                  {l(steps[activeStep].tag)}
                </span>
                <h3 className="font-heading text-[clamp(1.5rem,2.4vw,2.2rem)] text-[#F3ECDD] mb-2 leading-tight">
                  {l(steps[activeStep].title)}
                </h3>
                <p className="text-[#C3CEC4] text-[15px] leading-relaxed max-w-[48ch]">
                  {l(steps[activeStep].desc)}
                </p>
              </div>
            </div>

            {/* Right: Crossfading Videos */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-[24px] overflow-hidden border border-[rgba(201,164,92,0.3)] shadow-[0_10px_30px_rgba(8,36,28,0.12)] bg-[#08241C]">
                {steps.map((st, idx) => (
                  <div
                    key={st.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      activeStep === idx
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <BgVideo
                      videoName={st.video}
                      aspectRatio="4/5"
                      rounded="rounded-none"
                      overlay={true}
                      isActive={activeStep === idx}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE UNPINNED STACKED LIST (<1024px) - Clean normal scroll, no pinning */}
      <div className="block lg:hidden py-16 px-4">
        <div className="site-container">
          <div className="text-center mb-10">
            <span className="eyebrow block mb-2 text-[#C9A45C]">
              {t.sections.bridalDayEyebrow}
            </span>
            <h2 className="font-heading text-[clamp(1.8rem,4.2vw,2.5rem)] text-[#F3ECDD] leading-[1.08] mb-3">
              {t.sections.bridalDayTitle}
            </h2>
            <p className="text-[#C3CEC4] text-[14px] leading-relaxed">
              {t.sections.bridalDaySubtitle}
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((st, i) => (
              <div
                key={st.id}
                className="bg-[#123F31] rounded-[20px] overflow-hidden border border-[rgba(201,164,92,0.2)] shadow-[0_10px_30px_rgba(8,36,28,0.12)]"
              >
                {/* 4:5 Video Card */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#08241C]">
                  <BgVideo
                    videoName={st.video}
                    aspectRatio="4/5"
                    rounded="rounded-none"
                    overlay={true}
                    isActive={true}
                  />
                  <div className="absolute top-3 left-3 bg-[#08241C] border border-[rgba(201,164,92,0.3)] rounded-full px-3 py-1 text-[13px] text-[#E3C88A] font-medium">
                    0{i + 1}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 text-left">
                  <span className="text-[13px] uppercase tracking-[0.14em] text-[#C9A45C] font-semibold block mb-1">
                    {l(st.tag)}
                  </span>
                  <h3 className="font-heading text-[22px] text-[#F3ECDD] mb-2 leading-tight">
                    {l(st.title)}
                  </h3>
                  <p className="text-[#C3CEC4] text-[14px] leading-relaxed">
                    {l(st.desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
