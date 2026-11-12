import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "../i18n/LanguageContext"
import BgVideo from "./BgVideo"

gsap.registerPlugin(ScrollTrigger)

export default function PinnedBridalDay() {
  const { lang, t, l } = useLanguage()
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
    if (prefersReducedMotion || !sectionRef.current) return

    const totalSteps = steps.length
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 3}`,
      pin: pinContainerRef.current,
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
      <div
        ref={pinContainerRef}
        className="min-h-screen flex items-center justify-center py-20 px-4"
      >
        <div className="site-container w-full">
          {/* Section Header (Centered) */}
          <div className="text-center max-w-[760px] mx-auto mb-12 sm:mb-16">
            <span className="eyebrow block mb-3 text-[#C9A45C]">
              {t.sections.bridalDayEyebrow}
            </span>
            <h2 className="font-heading text-[clamp(2.1rem,4.2vw,3.75rem)] text-[#F3ECDD] leading-[1.05] mb-4">
              {t.sections.bridalDayTitle}
            </h2>
            <p className="text-[#C3CEC4] text-[clamp(1rem,1.1vw,1.125rem)] mx-auto leading-[1.65]">
              {t.sections.bridalDaySubtitle}
            </p>
          </div>

          {/* Symmetrical 50/50 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Step Details + Progress Line */}
            <div className="relative pl-8 sm:pl-10 order-2 lg:order-1">
              {/* Thin Gold Progress Line at side */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[rgba(201,164,92,0.2)]">
                <div
                  className="w-full bg-[#C9A45C] transition-all duration-300"
                  style={{
                    height: `${((activeStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              {/* Step Navigation Pill Selector */}
              <div className="flex items-center gap-2 mb-6">
                {steps.map((st, i) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(i)}
                    type="button"
                    className={`px-3 py-1 rounded-full text-[13px] font-medium tracking-wide transition-colors cursor-pointer border ${
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
              <div className="min-h-[160px]">
                <span className="text-[13px] uppercase tracking-[0.14em] text-[#C9A45C] font-semibold block mb-2">
                  {l(steps[activeStep].tag)}
                </span>
                <h3 className="font-heading text-[clamp(1.6rem,2.8vw,2.4rem)] text-[#F3ECDD] mb-3 leading-tight">
                  {l(steps[activeStep].title)}
                </h3>
                <p className="text-[#C3CEC4] text-[16px] leading-relaxed max-w-[50ch]">
                  {l(steps[activeStep].desc)}
                </p>
              </div>
            </div>

            {/* Right: Crossfading Videos */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[24px] overflow-hidden border border-[rgba(201,164,92,0.3)] shadow-[0_10px_30px_rgba(8,36,28,0.12)] bg-[#08241C]">
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
    </section>
  )
}
