"use client"

import { AudioWaveform, HelpCircle } from "lucide-react"

export type ExtendedViewMode = "visualizer" | "complexity" | "implementation"

interface VisualizerHeaderProps {
  view: ExtendedViewMode
  setView: (view: ExtendedViewMode) => void
  onHelpOpen: () => void
}

export function VisualizerHeader({ view, setView, onHelpOpen }: VisualizerHeaderProps) {
  return (
    <header className="px-4 sm:px-8 py-5 flex flex-col sm:flex-row gap-4 items-center justify-between border-b" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-primary-foreground"
          style={{ background: "var(--primary)" }}
        >
          <AudioWaveform className="h-3.5 w-3.5" />
        </div>
        <span className="font-bold text-sm tracking-tight text-foreground">Sorting Visualizer</span>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <button
          onClick={onHelpOpen}
          className="cursor-pointer text-muted-foreground transition-opacity hover:opacity-75 order-2 sm:order-1 p-1"
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        <div
          className="flex bg-card items-center gap-1 p-1 rounded-2xl order-1 sm:order-2 overflow-x-auto max-w-[85vw] sm:max-w-none"
          style={{ background: "var(--secondary)" }}
        >
          {(["visualizer", "complexity", "implementation"] as ExtendedViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 sm:px-4 py-1.5 cursor-pointer text-[11px] sm:text-xs font-semibold rounded-xl capitalize transition-all whitespace-nowrap"
              style={
                view === v
                  ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}