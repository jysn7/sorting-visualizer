"use client"

import { ArrayBar } from "@/lib/algorithms/types"

const BAR_COLORS: Record<ArrayBar["state"], string> = {
  default:   "var(--color-default)",
  comparing: "var(--color-comparing)",
  swapping:  "var(--color-swapping)",
  sorted:    "var(--color-sorted)",
  pivot:     "var(--color-pivot)",
}

export function ArrayBars({ bars }: { bars: ArrayBar[] }) {
  return (
    <div className="w-full h-75 sm:h-95 flex items-end gap-0.5">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="flex-1 min-w-0 rounded-t-sm transition-[height] duration-75"
          style={{
            height: `${bar.value}%`,
            backgroundColor: BAR_COLORS[bar.state],
            opacity: bar.state === "default" ? 0.6 : 1,
          }}
        />
      ))}
    </div>
  )
}