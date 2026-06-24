"use client"

interface ControlButtonProps {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  accent?: boolean
  ghost?: boolean
}

export function ControlButton({ onClick, disabled, children, accent, ghost }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex-1 py-2 cursor-pointer rounded-full text-sm font-semibold transition-opacity disabled:opacity-30"
      style={
        accent
          ? { background: "var(--primary)", color: "var(--primary-foreground)" }
          : ghost
          ? { background: "transparent", color: "var(--muted-foreground)", border: "1px solid var(--border)" }
          : { background: "var(--secondary)", color: "var(--foreground)" }
      }
    >
      {children}
    </button>
  )
}