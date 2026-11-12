import React from "react"
import { Link } from "react-router-dom"

export default function Button({
  children,
  variant = "primary", // "primary" | "secondary-dark" | "secondary-light"
  to,
  href,
  onClick,
  className = "",
  type = "button",
  ariaLabel,
}) {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary-dark":
        return "btn-secondary-dark"
      case "secondary-light":
        return "btn-secondary-light"
      case "primary":
      default:
        return "btn-primary"
    }
  }

  const combinedClass = `${getVariantClass()} ${className}`

  if (to) {
    return (
      <Link to={to} className={combinedClass} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("https://wa.me")
    return (
      <a
        href={href}
        className={combinedClass}
        target={isExternal && !href.startsWith("tel:") ? "_blank" : undefined}
        rel={isExternal && !href.startsWith("tel:") ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClass}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
