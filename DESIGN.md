---
name: Roop Nikhar
description: Calm, unhurried luxury bridal studio and beauty parlour design system for Motihari, Bihar.
colors:
  emerald-950: "#08241C"
  emerald-900: "#0B2E24"
  emerald-800: "#123F31"
  emerald-600: "#1F6B4F"
  gold-500: "#C9A45C"
  gold-300: "#E3C88A"
  ivory-50: "#F7F2E8"
  ivory-100: "#EFE7D7"
  ink-900: "#15251F"
  ink-600: "#4E5F57"
  cream-100: "#F3ECDD"
  cream-300: "#C3CEC4"
  line-dark: "rgba(201, 164, 92, 0.28)"
  line-light: "rgba(18, 63, 49, 0.14)"
  hero-overlay: "rgba(8, 36, 28, 0.45)"
typography:
  display:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.05
  title:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.25
  body:
    fontFamily: "'Jost', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(0.95rem, 1.1vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Jost', sans-serif"
    fontSize: "13px"
    fontWeight: 500
    letterSpacing: "0.14em"
rounded:
  btn: "12px"
  input: "12px"
  card: "16px"
  panel: "24px"
  pill: "999px"
spacing:
  container-x: "24px"
  container-x-mobile: "16px"
  section-y: "128px"
  section-y-mobile: "80px"
components:
  button-primary:
    backgroundColor: "{colors.gold-500}"
    textColor: "{colors.emerald-950}"
    rounded: "{rounded.btn}"
    padding: "16px 28px"
    height: "48px"
  button-secondary-dark:
    backgroundColor: "transparent"
    textColor: "{colors.gold-300}"
    rounded: "{rounded.btn}"
    padding: "16px 28px"
    height: "48px"
  button-secondary-light:
    backgroundColor: "transparent"
    textColor: "{colors.emerald-900}"
    rounded: "{rounded.btn}"
    padding: "16px 28px"
    height: "48px"
---

# Design System: Roop Nikhar

## Overview

**Creative North Star: "The Bridal Sanctuary"**

Roop Nikhar's interface is built as a calm, unhurried boutique sanctuary — alternating between deep botanical emerald rooms and warm daylight ivory salons, joined by crisp antique-gold hairlines. Rather than relying on flashy neon gradients, crowded cards, or heavy drop shadows, the system creates luxury through generous section breathing room, refined editorial serif headlines, and quiet tonal contrast.

Every layout decision serves real mobile-first local visitors in Motihari, Bihar: bilingual English and Hindi typography switches cleanly via `html[lang="hi"]`, touch targets stay thumb-friendly at 48px minimum height, and every section guides naturally toward direct WhatsApp or appointment booking.

**Key Characteristics:**
- **Alternating Dual-Ground Rhythm:** Sections alternate cleanly between deep emerald (`#0B2E24`) and warm ivory (`#F7F2E8`) with `128px` desktop / `80px` mobile vertical padding.
- **Flat Tonal Layering:** Surfaces use solid flat fills (`#123F31` on dark, `#EFE7D7` on light) and `1px` hairlines instead of heavy drop shadows or multi-stop gradients.
- **Bilingual Typographic Parity:** `Cormorant Garamond` + `Jost` in English; `Tiro Devanagari Hindi` (weight `400`, zero letter-spacing) + `Mukta` in Hindi.

## Colors

A restrained, high-contrast botanical palette pairing deep forest emerald grounds with warm antique ivory and muted antique gold.

### Primary
- **Sanctuary Emerald** (`#0B2E24`, `--emerald-900`): Primary dark section ground, header scroll surface, and dark-mode ink on ivory headings.
- **Deepest Sanctum** (`#08241C`, `--emerald-950`): Footer ground, video card backdrop, and primary button text on gold.
- **Canopy Emerald** (`#123F31`, `--emerald-800`): Elevated card surfaces on dark emerald sections.
- **Botanical Accent** (`#1F6B4F`, `--emerald-600`): Subtle hover highlights and active accents.

### Secondary
- **Antique Gold** (`#C9A45C`, `--gold-500`): Primary CTA fill, eyebrow accents, icons, focus rings, and hairline borders.
- **Warm Champagne Gold** (`#E3C88A`, `--gold-300`): Gold text and secondary CTA labels on dark emerald grounds.

### Neutral
- **Warm Salon Ivory** (`#F7F2E8`, `--ivory-50`): Primary light section background.
- **Alabaster Card** (`#EFE7D7`, `--ivory-100`): Card and badge surfaces on light ivory sections.
- **Deep Ink** (`#15251F`, `--ink-900`): Primary body copy on ivory backgrounds.
- **Muted Sage Ink** (`#4E5F57`, `--ink-600`): Secondary captions and metadata on ivory backgrounds.
- **Warm Cream** (`#F3ECDD`, `--cream-100`): Primary headings and body copy on dark emerald backgrounds.
- **Mist Cream** (`#C3CEC4`, `--cream-300`): Secondary descriptions on dark emerald backgrounds.

## Typography

Editorial serif headings paired with clean humanist sans-serif UI and body copy, with dedicated Devanagari rules when `html[lang="hi"]` is active.

- **Display (`h1`):** `'Cormorant Garamond', Georgia, serif`, `clamp(2.5rem, 6.5vw, 6.5rem)`, weight `600`, line-height `0.95`, tracking `-0.02em`, `text-wrap: balance`.
- **Headline (`h2`):** `'Cormorant Garamond', Georgia, serif`, `clamp(1.75rem, 4vw, 3.5rem)`, weight `500`, line-height `1.05`.
- **Title (`h3`):** `'Cormorant Garamond', Georgia, serif`, `clamp(1.25rem, 2vw, 1.75rem)`, weight `500`, line-height `1.25`.
- **Body (`p`):** `'Jost', system-ui, -apple-system, sans-serif`, `clamp(0.95rem, 1.1vw, 1.125rem)`, weight `400`, line-height `1.65`, max measure `62ch`.
- **Eyebrow / Label (`.eyebrow`):** `'Jost', sans-serif`, `13px`, uppercase, tracking `0.14em`, weight `500`, `--gold-500`.
- **Hindi Overrides (`html[lang="hi"]`):** Headings switch to `'Tiro Devanagari Hindi', serif` at `font-weight: 400 !important`; body switches to `'Mukta', sans-serif`; all elements enforce `letter-spacing: 0 !important` and `text-transform: none !important` on eyebrows so Devanagari matras render cleanly without clipping.

## Layout

- **Container (`.site-container`):** `max-width: 1240px`, centered with `24px` horizontal padding (`16px` at `<=640px`).
- **Section Rhythm (`.section-padding`):** `128px` vertical padding on desktop, `80px` on `<=768px`.
- **Sticky Header Clearance:** `section, [id]` carry `scroll-margin-top: 96px`.
- **Overflow Containment:** `html` and `body` use `overflow-x: clip` (never `hidden`) so `position: sticky` headers and pinned sections work cleanly.
- **Smooth Scrolling:** Managed via Lenis (`scroll-behavior: auto` on `html`) with GSAP ScrollTrigger.

## Elevation & Depth

Flat tonal layering with `1px` hairline borders (`rgba(201, 164, 92, 0.28)` on dark, `rgba(18, 63, 49, 0.14)` on light) is the primary separation mechanism. Shadows are reserved sparingly for floating overlays and framed media (`--shadow-subtle: 0 10px 30px rgba(8, 36, 28, 0.12)`). Zero-offset neon halos and hard brutalist offset shadows are never used.

## Shapes

Soft, approachable architectural corners across all surfaces:
- **Buttons & Inputs:** `12px` (`--radius-btn`, `--radius-input`)
- **Content Cards:** `16px` (`--radius-card`)
- **Feature Panels & Video Frames:** `24px` (`--radius-panel`)
- **Step Pills & Eyebrow Badges:** `999px` (`--radius-pill`)

## Components

### Buttons
- **Shape:** Soft `12px` radius (`--radius-btn`), minimum `48px` height, `16px 28px` padding, `15px` Jost medium.
- **Primary (`.btn-primary`):** Solid `--gold-500` fill, `--emerald-950` text; hover shifts to `#B5914A`, active scales to `0.98`.
- **Secondary Dark (`.btn-secondary-dark`):** Transparent fill, `1px` `--gold-500` border, `--gold-300` text; hover adds `rgba(201, 164, 92, 0.1)` tint.
- **Secondary Light (`.btn-secondary-light`):** Transparent fill, `1px` `--emerald-900` border, `--emerald-900` text; hover adds `rgba(11, 46, 36, 0.08)` tint.

### Hero Editorial Split (`.rn-hero-split`)
- Translucent emerald card (`rgba(8, 36, 28, 0.65)`) with `1px solid rgba(201, 164, 92, 0.32)` border and `20px` radius; asymmetrical 2-column grid on `>=768px` with left-aligned headline/subtitle and right-hand vertical gold-divided CTA stack (`Book` + `WhatsApp`).

### Cards & Containers
- **Light Salon Cards:** `#EFE7D7` (`--ivory-100`) with `1px` `rgba(18, 63, 49, 0.14)` border and `12px`–`16px` radius.
- **Dark Sanctuary Cards:** `#123F31` (`--emerald-800`) or `#08241C` (`--emerald-950`) with `1px` `rgba(201, 164, 92, 0.28)` border.

### Navigation & Controls
- Auto-hiding sticky header (`#0B2E24` + gold hairline when scrolled), back-to-top emerald/gold circular button (`48px` desktop / `44px` mobile), and focus-visible `2px solid #C9A45C` with `3px` offset.

## Do's and Don'ts

### Do:
- **Do** keep every interactive button and navigation control at least `44px–48px` tall for comfortable mobile thumb taps.
- **Do** preserve flat emerald/ivory tonal contrast and `1px` gold/emerald hairlines (`12px–24px` radii).
- **Do** test both `en` and `hi` language modes whenever adding or adjusting typography.

### Don't:
- **Don't** introduce harsh multi-color gradients, neon glows, or off-palette gray text.
- **Don't** apply `letter-spacing` or `font-weight > 400` to Hindi headings (`html[lang="hi"]`).
- **Don't** use `overflow-x: hidden` on `html` or `body` (use `overflow-x: clip` so sticky headers and ScrollTrigger stay intact).
