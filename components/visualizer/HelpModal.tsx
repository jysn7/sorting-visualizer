"use client"

import { X } from "lucide-react"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md p-6 rounded-xl flex flex-col gap-4 relative bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer transition-opacity hover:opacity-75 text-muted-foreground"
          aria-label="Close help modal"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-foreground">How it works</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Pick an algorithm from the sidebar to begin. The visualizer maps numbers as vertical bars, sorting them live from left to right.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-foreground">Controls</span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Use Play/Pause to watch the sort unfold automatically, or step frame-by-frame using the arrows. Adjust array sizing or speed instantly with the sliders.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-foreground">Color States</span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Bars change color dynamically to indicate current array operations like comparisons, swaps, active pivots, or finalized sorted placements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}