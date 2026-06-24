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
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Speed
        </p>
        <span className="text-xs font-bold text-primary">{value}ms</span>
      </div>
      <Slider
        min={10}
        max={300}
        step={10}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  )
}