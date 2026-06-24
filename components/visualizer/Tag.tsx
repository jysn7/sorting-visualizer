import React from "react"

interface TagProps {
  children: React.ReactNode
  accent?: boolean
}

export function Tag({ children, accent }: TagProps) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
      style={
        accent
          ? { background: "#f5c51822", color: "#f5c518" }
          : { background: "#e05a5a22", color: "#e05a5a" }
      }
    >
      {children}
    </span>
  )
}