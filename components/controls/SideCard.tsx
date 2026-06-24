"use client"

interface SideCardProps {
  children: React.ReactNode
}

export function SideCard({ children }: SideCardProps) {
  return (
    <div
      className="rounded-lg p-5 flex bg-card flex-col gap-4"
    >
      {children}
    </div>
  )
}