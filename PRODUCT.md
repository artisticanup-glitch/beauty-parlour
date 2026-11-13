# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Brides-to-be, wedding families, and walk-in or local beauty/grooming clients in Motihari and East Champaran, Bihar, arriving mostly on mobile phones (often comparing bridal packages, checking lagan-season availability, or looking up the parlour location near Gandhi Chowk).

## Product Purpose

Showcase Roop Nikhar's bridal studio and parlour services, build trust through hygiene standards, artist roles, and transformations, and convert visitors into direct WhatsApp inquiries and appointment bookings.

## Positioning

A dedicated Motihari beauty parlour and bridal studio built around local wedding realities — including 5:00 AM lagan-season opening hours, bilingual English/Hindi access, transparent custom package building, and direct WhatsApp consultation without middlemen or forced account signups.

## Operating Context

- Clients browse in English or Hindi and switch languages at any time.
- Primary conversion channel is WhatsApp (`wa.me`) pre-filled with selected services, package choices, or booking dates.
- Static SPA hosted on Cloudflare Pages via GitHub `main` branch auto-deploy (`beauty-parlour-82e.pages.dev`).

## Capabilities and Constraints

- **Pages/Routes:** Home (`/`), Services (`/services`), Bridal (`/bridal`), Pricing (`/pricing`), Gallery (`/gallery`), About (`/about`), Booking (`/booking`), Contact (`/contact`).
- **Bilingual i18n:** Full English (`src/i18n/en.js`) and Hindi (`src/i18n/hi.js`) support via `LanguageContext`.
- **Technical Constraint:** Zero-backend static site; booking and inquiries route to WhatsApp or phone/map links rather than a server database.
- **Open/Pending Facts:** Placeholder contact number (`+91 98000 00000` / `919800000000`) and social links (`instagram.com`, `facebook.com`) in `src/data/site.js` await final real business details.

## Brand Commitments

- **Brand Name:** Roop Nikhar (रूप निखार)
- **Tagline:** Beauty Parlour & Bridal Studio (ब्यूटी पार्लर और ब्राइडल स्टूडियो)
- **Location:** First Floor, Main Road, near Gandhi Chowk, Motihari, Bihar 845401
- **Hours:** Monday–Sunday: 10:00 AM – 8:00 PM (Lagan season: from 5:00 AM)

## Evidence on Hand

- Local service catalog (`src/data/services.js`), bridal packages and custom package builder (`src/data/packages.js`), FAQs (`src/data/faq.js`), reviews (`src/data/reviews.js`), and curated local photography/video assets in `public/` and `src/assets/`.
- Real customer reviews, final phone/WhatsApp number, and verified social handles are pending owner confirmation; future work must not invent testimonials or live booking availability.

## Product Principles

- **Zero-friction local booking:** Every service or bridal journey leads clearly to a single-tap WhatsApp or phone action.
- **Bilingual clarity first:** Both English and Hindi copy must read naturally for local Bihar families, never machine-translated filler.
- **Show real craft over claims:** Let transformations, hygiene practices, and transparent package breakdowns earn trust.
- **Mobile-first speed:** Most Motihari visitors arrive on mobile data; keep pages fast, legible, and thumb-friendly.
