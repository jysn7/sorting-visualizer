"use client"

import { Slider } from "@/components/ui/slider"

interface Props {
  value: number
  onChange: (v: number) => void
  disabled?: boolean
}

export function SizeSlider({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
          Array size
        </p>
        <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>{value}</span>
      </div>
      <Slider
        min={10}
        max={150}
        step={5}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        disabled={disabled}
      />
    </div>
  )
}