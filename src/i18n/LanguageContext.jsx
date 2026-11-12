/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react"
import { en } from "./en"
import { hi } from "./hi"

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("roop_nikhar_lang")
      if (saved === "hi" || saved === "en") return saved
    } catch {
      // ignore
    }
    return "en"
  })

  useEffect(() => {
    try {
      localStorage.setItem("roop_nikhar_lang", lang)
    } catch {
      // ignore
    }
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "hi" : "en"))
  }

  const t = lang === "hi" ? hi : en

  // Helper to extract localized string from data object { en: "...", hi: "..." }
  const l = (item) => {
    if (!item) return ""
    if (typeof item === "string") return item
    return item[lang] || item.en || ""
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, l }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
