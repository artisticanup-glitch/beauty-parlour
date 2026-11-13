import React, { Suspense, lazy, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LanguageProvider } from "./i18n/LanguageContext"

gsap.registerPlugin(ScrollTrigger)
import Header from "./components/Header"
import Footer from "./components/Footer"
import MobileBar from "./components/MobileBar"
import BackToTop from "./components/BackToTop"
import Preloader from "./components/Preloader"
import PageTransition from "./components/PageTransition"
import Cursor from "./components/Cursor"

import Home from "./pages/Home"
const Services = lazy(() => import("./pages/Services"))
const Bridal = lazy(() => import("./pages/Bridal"))
const Pricing = lazy(() => import("./pages/Pricing"))
const Gallery = lazy(() => import("./pages/Gallery"))
const About = lazy(() => import("./pages/About"))
const Booking = lazy(() => import("./pages/Booking"))
const Contact = lazy(() => import("./pages/Contact"))
const NotFound = lazy(() => import("./pages/NotFound"))

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
      window.lenis = null
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

    window.lenis = lenis
    lenis.on("scroll", ScrollTrigger.update)

    // Sync Lenis directly with GSAP ticker to prevent ScrollTrigger pin jumps
    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      window.lenis = null
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
          <Suspense fallback={<div className="min-h-screen bg-[#0B2E24]" />}>
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
          </Suspense>
        </main>
        <Footer />
        <MobileBar />
        <BackToTop />
      </div>
    </LanguageProvider>
  )
}
