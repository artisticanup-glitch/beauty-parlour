import React from "react"

export default function SectionHeading({
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
      <h2
        className={`font-heading tracking-tight mb-4 ${
          isDark ? "text-[#F3ECDD]" : "text-[#0B2E24]"
        }`}
        style={{
          fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
          lineHeight: 1.1,
          textWrap: "balance",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto ${
            isDark ? "text-[#F3ECDD] opacity-85" : "text-[#4E5F57]"
          }`}
          style={{
            fontSize: "clamp(0.95rem, 1.1vw, 1.125rem)",
            lineHeight: 1.65,
            maxWidth: "62ch",
            textWrap: "pretty",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
