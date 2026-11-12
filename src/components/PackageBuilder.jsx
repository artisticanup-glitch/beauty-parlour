import React, { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Check, Plus, Minus, WhatsappLogo } from "@phosphor-icons/react"
import { siteData } from "../data/site"
import { useLanguage } from "../i18n/LanguageContext"
import Button from "./Button"

export default function PackageBuilder() {
  const { lang, t } = useLanguage()

  // State
  const [selectedItems, setSelectedItems] = useState({
    haldi: true,
    mehendi_look: false,
    shaadi: "shaadi_hd", // "shaadi_hd" | "shaadi_airbrush"
    reception: true,
    bridal_mehendi: false,
    familyCount: 0,
  })

  const [displayTotal, setDisplayTotal] = useState(0)
  const animatedValueRef = useRef({ val: 0 })

  // Calculate total
  const calculateTotal = () => {
    let sum = 0
    if (selectedItems.haldi) sum += 2500
    if (selectedItems.mehendi_look) sum += 3500
    if (selectedItems.shaadi === "shaadi_hd") sum += 11000
    if (selectedItems.shaadi === "shaadi_airbrush") sum += 18000
    if (selectedItems.reception) sum += 6500
    if (selectedItems.bridal_mehendi) sum += 5100
    sum += selectedItems.familyCount * 1500
    return sum
  }

  const currentTotal = calculateTotal()

  // GSAP Smooth number tween
  useEffect(() => {
    const tween = gsap.to(animatedValueRef.current, {
      val: currentTotal,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayTotal(Math.round(animatedValueRef.current.val))
      },
    })
    return () => tween.kill()
  }, [currentTotal])

  // Toggle item
  const toggleItem = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Choose shaadi base
  const setShaadiBase = (optionId) => {
    setSelectedItems((prev) => ({
      ...prev,
      shaadi: optionId,
    }))
  }

  // Stepper
  const updateFamily = (delta) => {
    setSelectedItems((prev) => {
      const next = Math.max(0, Math.min(10, prev.familyCount + delta))
      return { ...prev, familyCount: next }
    })
  }

  // Format currency
  const formatINR = (val) => {
    return "₹" + val.toLocaleString("en-IN")
  }

  // Compose WhatsApp Message
  const getWhatsAppLink = () => {
    const lines = [t.packageBuilder.whatsappMessagePrefix]
    if (selectedItems.haldi) {
      lines.push(`• ${lang === "hi" ? "हल्दी रस्म शृंगार" : "Haldi Ceremony"} (₹2,500)`)
    }
    if (selectedItems.mehendi_look) {
      lines.push(`• ${lang === "hi" ? "मेहंदी रस्म शृंगार" : "Mehendi Ceremony Look"} (₹3,500)`)
    }
    if (selectedItems.shaadi === "shaadi_hd") {
      lines.push(`• ${lang === "hi" ? "मुख्य विवाह: एचडी ब्राइडल मेकअप" : "Wedding Day: HD Bridal Makeup"} (₹11,000)`)
    } else if (selectedItems.shaadi === "shaadi_airbrush") {
      lines.push(`• ${lang === "hi" ? "मुख्य विवाह: एयरब्रश ब्राइडल मेकअप" : "Wedding Day: Airbrush Bridal Makeup"} (₹18,000)`)
    }
    if (selectedItems.reception) {
      lines.push(`• ${lang === "hi" ? "रिसेप्शन संध्या शृंगार" : "Reception Look"} (₹6,500)`)
    }
    if (selectedItems.bridal_mehendi) {
      lines.push(`• ${lang === "hi" ? "ब्राइडल मेहंदी (हाथ व पैर)" : "Bridal Mehendi (Hands & Feet)"} (₹5,100)`)
    }
    if (selectedItems.familyCount > 0) {
      lines.push(`• ${lang === "hi" ? "पारिवारिक सदस्य / बहनें" : "Family Members"}: ${selectedItems.familyCount} × ₹1,500 = ${formatINR(selectedItems.familyCount * 1500)}`)
    }
    lines.push(`\n${t.packageBuilder.totalPrefix}: ${formatINR(currentTotal)}`)

    const encoded = encodeURIComponent(lines.join("\n"))
    return `https://wa.me/${siteData.whatsappNumber}?text=${encoded}`
  }

  return (
    <div className="w-full max-w-[1080px] mx-auto">
      {/* Cards Grid: 2 equal columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* 1. Haldi */}
        <div
          onClick={() => toggleItem("haldi")}
          className={`p-6 rounded-[16px] cursor-pointer transition-all duration-200 border flex items-start justify-between ${
            selectedItems.haldi
              ? "bg-[#EFE7D7] border-[#C9A45C] shadow-[0_10px_30px_rgba(8,36,28,0.12)]"
              : "bg-[#F7F2E8] border-[rgba(18,63,49,0.14)] hover:border-[rgba(18,63,49,0.3)]"
          }`}
        >
          <div className="flex-1 pr-4">
            <h3 className="font-heading text-[22px] text-[#0B2E24] mb-1">
              {lang === "hi" ? "हल्दी रस्म शृंगार" : "Haldi Ceremony Look"}
            </h3>
            <p className="text-[14px] text-[#4E5F57] mb-2 leading-relaxed">
              {lang === "hi"
                ? "ताज़ा चमकदार बेस, फूलों के गहनों की सेटिंग और हेयर स्टाइलिंग"
                : "Dewy radiant base, floral jewellery setting & hair styling"}
            </p>
            <span className="font-heading text-[20px] font-semibold text-[#0B2E24]">
              ₹2,500
            </span>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors border ${
              selectedItems.haldi
                ? "bg-[#0B2E24] border-[#0B2E24] text-[#C9A45C]"
                : "border-[rgba(18,63,49,0.3)] text-transparent"
            }`}
          >
            <Check size={16} weight="bold" />
          </div>
        </div>

        {/* 2. Mehendi Ceremony Look */}
        <div
          onClick={() => toggleItem("mehendi_look")}
          className={`p-6 rounded-[16px] cursor-pointer transition-all duration-200 border flex items-start justify-between ${
            selectedItems.mehendi_look
              ? "bg-[#EFE7D7] border-[#C9A45C] shadow-[0_10px_30px_rgba(8,36,28,0.12)]"
              : "bg-[#F7F2E8] border-[rgba(18,63,49,0.14)] hover:border-[rgba(18,63,49,0.3)]"
          }`}
        >
          <div className="flex-1 pr-4">
            <h3 className="font-heading text-[22px] text-[#0B2E24] mb-1">
              {lang === "hi" ? "मेहंदी रस्म शृंगार" : "Mehendi Ceremony Look"}
            </h3>
            <p className="text-[14px] text-[#4E5F57] mb-2 leading-relaxed">
              {lang === "hi"
                ? "जीवंत उत्सव मेकअप, हेयर स्टाइलिंग और टच-अप"
                : "Vibrant festive makeup, hair braid/curls & styling"}
            </p>
            <span className="font-heading text-[20px] font-semibold text-[#0B2E24]">
              ₹3,500
            </span>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors border ${
              selectedItems.mehendi_look
                ? "bg-[#0B2E24] border-[#0B2E24] text-[#C9A45C]"
                : "border-[rgba(18,63,49,0.3)] text-transparent"
            }`}
          >
            <Check size={16} weight="bold" />
          </div>
        </div>

        {/* 3. Shaadi: Main Wedding Look Choice */}
        <div className="md:col-span-2 p-6 rounded-[16px] bg-[#EFE7D7] border border-[rgba(201,164,92,0.4)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <div>
              <span className="text-[13px] uppercase tracking-[0.14em] text-[#C9A45C] font-semibold block">
                {lang === "hi" ? "मुख्य विवाह (शादी)" : "Main Wedding Ceremony (Shaadi)"}
              </span>
              <h3 className="font-heading text-[24px] text-[#0B2E24]">
                {t.packageBuilder.stepPrompt}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* HD Choice */}
            <div
              onClick={() => setShaadiBase("shaadi_hd")}
              className={`p-5 rounded-[12px] cursor-pointer transition-all border flex items-start justify-between ${
                selectedItems.shaadi === "shaadi_hd"
                  ? "bg-[#F7F2E8] border-[#0B2E24] shadow-[0_10px_30px_rgba(8,36,28,0.12)]"
                  : "bg-transparent border-[rgba(18,63,49,0.2)] hover:bg-[#F7F2E8]"
              }`}
            >
              <div>
                <h4 className="font-heading text-[20px] text-[#0B2E24] mb-1">
                  {lang === "hi" ? "एचडी ब्राइडल मेकअप" : "HD Bridal Makeup"}
                </h4>
                <p className="text-[13px] text-[#4E5F57] mb-2 leading-relaxed">
                  {lang === "hi"
                    ? "पलकें, ब्राइडल जूड़ा, दुपट्टा सेटिंग व आभूषण सज्जा"
                    : "Lashes, bridal bun, dupatta setting & jewellery placement"}
                </p>
                <span className="font-heading text-[20px] font-semibold text-[#0B2E24]">
                  ₹11,000
                </span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  selectedItems.shaadi === "shaadi_hd"
                    ? "border-[#0B2E24] bg-[#0B2E24] text-[#C9A45C]"
                    : "border-[rgba(18,63,49,0.3)]"
                }`}
              >
                {selectedItems.shaadi === "shaadi_hd" && <Check size={14} weight="bold" />}
              </div>
            </div>

            {/* Airbrush Choice */}
            <div
              onClick={() => setShaadiBase("shaadi_airbrush")}
              className={`p-5 rounded-[12px] cursor-pointer transition-all border flex items-start justify-between ${
                selectedItems.shaadi === "shaadi_airbrush"
                  ? "bg-[#F7F2E8] border-[#0B2E24] shadow-[0_10px_30px_rgba(8,36,28,0.12)]"
                  : "bg-transparent border-[rgba(18,63,49,0.2)] hover:bg-[#F7F2E8]"
              }`}
            >
              <div>
                <h4 className="font-heading text-[20px] text-[#0B2E24] mb-1">
                  {lang === "hi" ? "एयरब्रश ब्राइडल मेकअप" : "Airbrush Bridal Makeup"}
                </h4>
                <p className="text-[13px] text-[#4E5F57] mb-2 leading-relaxed">
                  {lang === "hi"
                    ? "वाटरप्रूफ सिलिकॉन बेस, प्रीमियम पलकें, संपूर्ण लक्ज़री स्टाइलिंग"
                    : "Waterproof silicon airbrush, premium lashes, deluxe styling"}
                </p>
                <span className="font-heading text-[20px] font-semibold text-[#0B2E24]">
                  ₹18,000
                </span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  selectedItems.shaadi === "shaadi_airbrush"
                    ? "border-[#0B2E24] bg-[#0B2E24] text-[#C9A45C]"
                    : "border-[rgba(18,63,49,0.3)]"
                }`}
              >
                {selectedItems.shaadi === "shaadi_airbrush" && <Check size={14} weight="bold" />}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Reception */}
        <div
          onClick={() => toggleItem("reception")}
          className={`p-6 rounded-[16px] cursor-pointer transition-all duration-200 border flex items-start justify-between ${
            selectedItems.reception
              ? "bg-[#EFE7D7] border-[#C9A45C] shadow-[0_10px_30px_rgba(8,36,28,0.12)]"
              : "bg-[#F7F2E8] border-[rgba(18,63,49,0.14)] hover:border-[rgba(18,63,49,0.3)]"
          }`}
        >
          <div className="flex-1 pr-4">
            <h3 className="font-heading text-[22px] text-[#0B2E24] mb-1">
              {lang === "hi" ? "रिसेप्शन संध्या शृंगार" : "Reception Evening Look"}
            </h3>
            <p className="text-[14px] text-[#4E5F57] mb-2 leading-relaxed">
              {lang === "hi"
                ? "आधुनिक ग्लैमरस मेकअप, हेयर वेव्स और परिधान ड्रेपिंग"
                : "Modern glamorous makeup, open waves styling & gown draping"}
            </p>
            <span className="font-heading text-[20px] font-semibold text-[#0B2E24]">
              ₹6,500
            </span>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors border ${
              selectedItems.reception
                ? "bg-[#0B2E24] border-[#0B2E24] text-[#C9A45C]"
                : "border-[rgba(18,63,49,0.3)] text-transparent"
            }`}
          >
            <Check size={16} weight="bold" />
          </div>
        </div>

        {/* 5. Bridal Mehendi */}
        <div
          onClick={() => toggleItem("bridal_mehendi")}
          className={`p-6 rounded-[16px] cursor-pointer transition-all duration-200 border flex items-start justify-between ${
            selectedItems.bridal_mehendi
              ? "bg-[#EFE7D7] border-[#C9A45C] shadow-[0_10px_30px_rgba(8,36,28,0.12)]"
              : "bg-[#F7F2E8] border-[rgba(18,63,49,0.14)] hover:border-[rgba(18,63,49,0.3)]"
          }`}
        >
          <div className="flex-1 pr-4">
            <h3 className="font-heading text-[22px] text-[#0B2E24] mb-1">
              {lang === "hi" ? "ब्राइडल मेहंदी (दोनों हाथ व पैर)" : "Bridal Mehendi (Hands & Feet)"}
            </h3>
            <p className="text-[14px] text-[#4E5F57] mb-2 leading-relaxed">
              {lang === "hi"
                ? "कोहनी तक बारीक आकृतियों वाली प्राकृतिक मेहंदी"
                : "Elbow to fingertip intricate figure work with pure natural henna"}
            </p>
            <span className="font-heading text-[20px] font-semibold text-[#0B2E24]">
              ₹5,100
            </span>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors border ${
              selectedItems.bridal_mehendi
                ? "bg-[#0B2E24] border-[#0B2E24] text-[#C9A45C]"
                : "border-[rgba(18,63,49,0.3)] text-transparent"
            }`}
          >
            <Check size={16} weight="bold" />
          </div>
        </div>

        {/* 6. Family Stepper (0 to 10 × ₹1,500) */}
        <div className="md:col-span-2 p-6 rounded-[16px] bg-[#F7F2E8] border border-[rgba(18,63,49,0.14)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-[22px] text-[#0B2E24] mb-1">
              {lang === "hi" ? "परिवार के सदस्यों व बहनों का मेकअप" : "Family Members & Sisters Makeup"}
            </h3>
            <p className="text-[14px] text-[#4E5F57]">
              {lang === "hi"
                ? "माताजी, बहनों व परिवार के सदस्यों के लिए पार्टी मेकअप (₹1,500 प्रति व्यक्ति)"
                : "Graceful party look for mother, sisters & relatives (₹1,500 per person)"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateFamily(-1)}
              disabled={selectedItems.familyCount === 0}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[rgba(18,63,49,0.3)] flex items-center justify-center text-[#0B2E24] hover:bg-[#EFE7D7] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Decrease family count"
            >
              <Minus size={16} weight="bold" />
            </button>
            <span className="font-heading text-[22px] font-semibold text-[#0B2E24] w-8 text-center">
              {selectedItems.familyCount}
            </span>
            <button
              type="button"
              onClick={() => updateFamily(1)}
              disabled={selectedItems.familyCount === 10}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[rgba(18,63,49,0.3)] flex items-center justify-center text-[#0B2E24] hover:bg-[#EFE7D7] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Increase family count"
            >
              <Plus size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* Live Total & WhatsApp Action Panel (Symmetrical) */}
      <div className="p-8 rounded-[24px] bg-[#0B2E24] text-[#F3ECDD] border border-[rgba(201,164,92,0.35)] shadow-[0_10px_30px_rgba(8,36,28,0.12)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <span className="eyebrow block mb-1 text-[#C9A45C]">
            {t.packageBuilder.totalLabel}
          </span>
          <div className="font-heading text-[clamp(2.4rem,4vw,3.5rem)] font-semibold text-[#E3C88A] leading-none">
            {formatINR(displayTotal)}
          </div>
        </div>

        <Button
          href={getWhatsAppLink()}
          variant="primary"
          className="!py-4 !px-8 !text-[16px] w-full md:w-auto"
        >
          <WhatsappLogo size={22} weight="light" className="text-[#08241C]" />
          <span>{t.packageBuilder.sendWhatsappBtn}</span>
        </Button>
      </div>
    </div>
  )
}
