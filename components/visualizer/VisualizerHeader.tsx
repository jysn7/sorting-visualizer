"use client"

import { BarChart2, HelpCircle } from "lucide-react"

export type ExtendedViewMode = "visualizer" | "complexity" | "implementation"

interface Props {
  view: ExtendedViewMode
  setView: (view: ExtendedViewMode) => void
  onHelpOpen: () => void
}

export function VisualizerHeader({ view, setView, onHelpOpen }: Props) {
  return (
    <header
      className="px-4 sm:px-8 py-5 flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border/80"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        <div
          className="w-7 h-7 rounded-lg flex bg-primary items-center justify-center"
        >
          <BarChart2 className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="font-bold text-sm tracking-tight">Sorting Visualizer</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">

        {/* View toggle */}
        <div
          className="flex items-center gap-1 p-1 bg-secondary rounded-2xl overflow-x-auto"
        >
          {(["visualizer", "complexity", "implementation"] as ExtendedViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold rounded-xl capitalize transition-all whitespace-nowrap cursor-pointer"
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

        {/* Help */}
        <button
          onClick={onHelpOpen}
          className="p-2 rounded-xl cursor-pointer transition-all"
          style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

      </div>
    </header>
  )
}