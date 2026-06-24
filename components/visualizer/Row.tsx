interface RowProps {
  label: string
  value: string
  highlight?: boolean
}

export function Row({ label, value, highlight }: RowProps) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
      <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{label}</span>
      <span
        className="text-sm font-semibold"
        style={highlight ? { color: "var(--primary)" } : { color: "var(--foreground)" }}
      >
        {value}
      </span>
    </div>
  )
}