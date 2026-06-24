"use client"

interface StatCardProps {
  label: string
  value: number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div
      className="flex-1 rounded-lg p-5 flex bg-secondary flex-col gap-1"
    >
      <span className="text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <span className="text-3xl font-bold tabular-nums tracking-tight">
        {value.toLocaleString()}
      </span>
    </div>
  )
}