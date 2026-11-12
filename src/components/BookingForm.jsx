import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Check, WhatsappLogo, WarningCircle } from "@phosphor-icons/react"
import { services } from "../data/services"
import { siteData } from "../data/site"
import { useLanguage } from "../i18n/LanguageContext"
import Button from "./Button"

const TODAY_ISO = "2026-11-13"

export default function BookingForm() {
  const { lang, t, l } = useLanguage()
  const [searchParams] = useSearchParams()

  const [formData, setFormData] = useState(() => {
    const preService = searchParams.get("service")
    const match = preService ? services.find((s) => s.id === preService) : null
    return {
      name: "",
      phone: "",
      date: "",
      serviceId: match ? match.id : "",
      message: "",
    }
  })

  const [errors, setErrors] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = t.bookingPage.errors.name
    }

    const cleanPhone = formData.phone.replace(/\D/g, "")
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = t.bookingPage.errors.phone
    }

    if (!formData.date) {
      newErrors.date = t.bookingPage.errors.date
    }

    if (!formData.serviceId) {
      newErrors.serviceId = t.bookingPage.errors.service
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on input change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const chosenService = services.find((s) => s.id === formData.serviceId)
    const serviceName = chosenService ? l(chosenService.name) : formData.serviceId
    const servicePrice = chosenService ? chosenService.priceFormatted : ""

    const msgLines = [
      lang === "hi"
        ? "नमस्ते रूप निखार, मैं अपॉइंटमेंट बुक करना चाहती हूँ:"
        : "Namaste Roop Nikhar, I would like to book an appointment:",
      `• ${lang === "hi" ? "नाम" : "Name"}: ${formData.name}`,
      `• ${lang === "hi" ? "मोबाइल" : "Phone"}: ${formData.phone}`,
      `• ${lang === "hi" ? "तिथि" : "Date"}: ${formData.date}`,
      `• ${lang === "hi" ? "सेवा" : "Service"}: ${serviceName} (${servicePrice})`,
    ]

    if (formData.message.trim()) {
      msgLines.push(`• ${lang === "hi" ? "विवरण" : "Note"}: ${formData.message.trim()}`)
    }

    const encodedText = encodeURIComponent(msgLines.join("\n"))
    const waUrl = `https://wa.me/${siteData.whatsappNumber}?text=${encodedText}`

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank", "noopener,noreferrer")
    setIsSuccess(true)
  }

  return (
    <div className="w-full bg-[#EFE7D7] rounded-[24px] p-8 sm:p-10 border border-[rgba(18,63,49,0.16)] shadow-[0_10px_30px_rgba(8,36,28,0.08)] text-left">
      <h3 className="font-heading text-[26px] sm:text-[30px] text-[#0B2E24] mb-2 leading-tight">
        {t.bookingPage.cardTitle}
      </h3>
      <p className="text-[#4E5F57] text-[14px] leading-relaxed mb-8">
        {t.bookingPage.heroSubtitle}
      </p>

      {isSuccess && (
        <div className="mb-6 p-4 rounded-[12px] bg-[#123F31] border border-[#C9A45C] text-[#F3ECDD] flex items-start gap-3">
          <Check size={20} weight="bold" className="text-[#C9A45C] flex-shrink-0 mt-0.5" />
          <p className="text-[14px] text-[#E3C88A] leading-relaxed font-medium">
            {t.bookingPage.successMsg}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-[13px] uppercase tracking-wider font-medium text-[#0B2E24] mb-1.5"
          >
            {t.bookingPage.nameLabel} <span className="text-[#B5914A]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.bookingPage.namePlaceholder}
            className={`w-full px-4 py-3.5 rounded-[12px] bg-[#F7F2E8] text-[#15251F] border text-[15px] outline-none transition-colors ${
              errors.name
                ? "border-red-600 focus:border-red-600"
                : "border-[rgba(18,63,49,0.2)] focus:border-[#0B2E24]"
            }`}
          />
          {errors.name && (
            <div className="flex items-center gap-1.5 text-red-700 text-[13px] mt-1.5">
              <WarningCircle size={14} weight="bold" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-[13px] uppercase tracking-wider font-medium text-[#0B2E24] mb-1.5"
          >
            {t.bookingPage.phoneLabel} <span className="text-[#B5914A]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
            placeholder={t.bookingPage.phonePlaceholder}
            className={`w-full px-4 py-3.5 rounded-[12px] bg-[#F7F2E8] text-[#15251F] border text-[15px] outline-none transition-colors ${
              errors.phone
                ? "border-red-600 focus:border-red-600"
                : "border-[rgba(18,63,49,0.2)] focus:border-[#0B2E24]"
            }`}
          />
          {errors.phone && (
            <div className="flex items-center gap-1.5 text-red-700 text-[13px] mt-1.5">
              <WarningCircle size={14} weight="bold" />
              <span>{errors.phone}</span>
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-[13px] uppercase tracking-wider font-medium text-[#0B2E24] mb-1.5"
          >
            {t.bookingPage.dateLabel} <span className="text-[#B5914A]">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            min={TODAY_ISO}
            onChange={handleChange}
            className={`w-full px-4 py-3.5 rounded-[12px] bg-[#F7F2E8] text-[#15251F] border text-[15px] outline-none transition-colors ${
              errors.date
                ? "border-red-600 focus:border-red-600"
                : "border-[rgba(18,63,49,0.2)] focus:border-[#0B2E24]"
            }`}
          />
          {errors.date && (
            <div className="flex items-center gap-1.5 text-red-700 text-[13px] mt-1.5">
              <WarningCircle size={14} weight="bold" />
              <span>{errors.date}</span>
            </div>
          )}
        </div>

        {/* Service Needed */}
        <div>
          <label
            htmlFor="serviceId"
            className="block text-[13px] uppercase tracking-wider font-medium text-[#0B2E24] mb-1.5"
          >
            {t.bookingPage.serviceLabel} <span className="text-[#B5914A]">*</span>
          </label>
          <select
            id="serviceId"
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            className={`w-full px-4 py-3.5 rounded-[12px] bg-[#F7F2E8] text-[#15251F] border text-[15px] outline-none transition-colors ${
              errors.serviceId
                ? "border-red-600 focus:border-red-600"
                : "border-[rgba(18,63,49,0.2)] focus:border-[#0B2E24]"
            }`}
          >
            <option value="">-- {t.bookingPage.servicePlaceholder} --</option>
            {services.map((svc) => (
              <option key={svc.id} value={svc.id}>
                {l(svc.name)} ({svc.priceFormatted})
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <div className="flex items-center gap-1.5 text-red-700 text-[13px] mt-1.5">
              <WarningCircle size={14} weight="bold" />
              <span>{errors.serviceId}</span>
            </div>
          )}
        </div>

        {/* Message (Optional) */}
        <div>
          <label
            htmlFor="message"
            className="block text-[13px] uppercase tracking-wider font-medium text-[#0B2E24] mb-1.5"
          >
            {t.bookingPage.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder={t.bookingPage.messagePlaceholder}
            className="w-full px-4 py-3.5 rounded-[12px] bg-[#F7F2E8] text-[#15251F] border border-[rgba(18,63,49,0.2)] focus:border-[#0B2E24] text-[15px] outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <Button type="submit" variant="primary" className="w-full !py-4 !text-[15px]">
            <WhatsappLogo size={20} weight="light" className="text-[#08241C]" />
            <span>{t.bookingPage.submitBtn}</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
