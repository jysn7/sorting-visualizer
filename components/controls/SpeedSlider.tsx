"use client"

import { Slider } from "@/components/ui/slider"

interface Props {
  value: number
  onChange: (v: number) => void
}

export function SpeedSlider({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
          Speed
        </p>
        <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>{value}ms</span>
      </div>
      <Slider
        min={10}
        max={300}
        step={10}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        inverted
      />
    </div>
  )
}