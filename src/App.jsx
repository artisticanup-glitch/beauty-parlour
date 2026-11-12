import React, { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Lenis from "lenis"
import { LanguageProvider } from "./i18n/LanguageContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import MobileBar from "./components/MobileBar"
import Preloader from "./components/Preloader"
import PageTransition from "./components/PageTransition"
import Cursor from "./components/Cursor"

import Home from "./pages/Home"
import Services from "./pages/Services"
import Bridal from "./pages/Bridal"
import Pricing from "./pages/Pricing"
import Gallery from "./pages/Gallery"
import About from "./pages/About"
import Booking from "./pages/Booking"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  return null
}

export default function App() {
  // Lenis smooth scrolling (duration 1.1, disabled on reduced motion & native touch)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (prefersReducedMotion || isTouch) {
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#0B2E24] text-[#F3ECDD]">
        <Preloader />
        <PageTransition />
        <Cursor />
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bridal" element={<Bridal />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <MobileBar />
      </div>
    </LanguageProvider>
  )
}
