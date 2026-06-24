"use client"

import { X } from "lucide-react"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

const COLOR_STATES = [
  { label: "Comparing", color: "var(--color-comparing)" },
  { label: "Swapping",  color: "var(--color-swapping)"  },
  { label: "Pivot",     color: "var(--color-pivot)"     },
  { label: "Sorted",    color: "var(--color-sorted)"    },
]

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-card p-6 flex flex-col gap-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted-foreground cursor-pointer transition-opacity hover:opacity-60 p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-1 pr-6">
          <h3 className="text-base font-bold">How to use Sorting Visualizer</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Choose an algorithm from the sidebar, hit Play, and watch it sort a random array in real time.
          </p>
        </div>

        <div
          className="h-px w-full bg-border"
        />

        {/* Sections */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold">Controls</span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Play runs the sort automatically at the speed you set. Use the step arrows to go one frame at a time — great for following along closely. Randomize generates a fresh array whenever you want a new run.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold">Bar colours</span>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_STATES.map(({ label, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold">Views</span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Switch between <strong className="text-foreground font-semibold">Visualizer</strong>, <strong className="text-foreground font-semibold">Complexity</strong>, and <strong className="text-foreground font-semibold">Implementation</strong> using the toggle at the top. Implementation shows the real code in your language of choice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}