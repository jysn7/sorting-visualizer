"use client"

interface StatCardProps {
  label: string
  value: number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div
      className="flex-1 rounded-lg p-5 flex flex-col gap-1"
      style={{ background: "var(--secondary)" }}
    >
      <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
        {label}
      </span>
      <span className="text-3xl font-bold tabular-nums tracking-tight">
        {value.toLocaleString()}
      </span>
    </div>
  )
}