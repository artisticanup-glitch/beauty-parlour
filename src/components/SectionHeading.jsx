import React from "react"

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  theme = "dark", // "dark" (on emerald) or "light" (on ivory)
  align = "center",
  className = "",
}) {
  const isDark = theme === "dark"

  return (
    <div
      className={`max-w-[760px] mx-auto ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <span className="eyebrow block mb-3 text-[13px] uppercase tracking-[0.14em] text-[#C9A45C]">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading tracking-tight mb-4 ${
          isDark ? "text-[#F3ECDD]" : "text-[#0B2E24]"
        }`}
        style={{
          fontSize: "clamp(2.1rem, 4.2vw, 3.75rem)",
          lineHeight: 1.05,
          textWrap: "balance",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto ${
            isDark ? "text-[#C3CEC4]" : "text-[#4E5F57]"
          }`}
          style={{
            fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
            lineHeight: 1.65,
            maxWidth: "62ch",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
