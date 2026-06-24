"use client"

import { useState, useCallback } from "react"
import { useArray } from "@/hooks/useArray"
import { useSorting } from "@/hooks/useSorting"
import { ArrayBars } from "./ArrayBars"
import { StatsBar } from "./StatsBar"
import { ComplexityView } from "./ComplexityView"
import { ImplementationView } from "./ImplementationView"
import { Controls } from "@/components/controls/Controls"
import { ALGORITHM_META } from "@/lib/algorithms/meta"
import { HelpModal } from "./HelpModal"
import { VisualizerHeader, ExtendedViewMode } from "./VisualizerHeader"

const LEGEND = [
  { state: "comparing", label: "Comparing",  color: "var(--color-comparing)" },
  { state: "swapping",  label: "Swapping",   color: "var(--color-swapping)"  },
  { state: "pivot",     label: "Pivot",      color: "var(--color-pivot)"     },
  { state: "sorted",    label: "Sorted",     color: "var(--color-sorted)"    },
] as const

export function Visualizer() {
  const [algorithmKey, setAlgorithmKey] = useState("bubble")
  const [arraySize, setArraySize]       = useState(60)
  const [view, setView]                 = useState<ExtendedViewMode>("visualizer")
  const [isHelpOpen, setIsHelpOpen]     = useState(false)

  const { array, reset } = useArray(arraySize)

  const handleNewArray = useCallback(() => reset(), [reset])

  const {
    current,
    isPlaying,
    isDone,
    play,
    pause,
    reset: resetSort,
    stepForward,
    stepBack,
    speed,
    setSpeed,
    totalSteps,
    stepIndex,
  } = useSorting(array, algorithmKey)

  const progress = totalSteps > 0 ? Math.round((stepIndex / (totalSteps - 1)) * 100) : 0

  const handleAlgorithmChange = (key: string) => {
    pause(); setAlgorithmKey(key); resetSort()
  }

  const handleRandomize = () => {
    pause(); handleNewArray(); resetSort()
  }

  const handleSizeChange = (v: number) => {
    setArraySize(v); handleRandomize()
  }

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: "var(--background)" }}>
      <VisualizerHeader 
        view={view} 
        setView={setView} 
        onHelpOpen={() => setIsHelpOpen(true)} 
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <div className="flex flex-col lg:flex-row flex-1 gap-4 px-4 sm:px-8 pb-8 pt-4">
        <main className="flex-1 flex flex-col gap-5">
          {view === "visualizer" && (
            <>
              <div
                className="rounded-lg p-6 flex flex-col gap-5"
                style={{ background: "var(--card)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: "var(--muted-foreground)" }}>
                      Now sorting
                    </p>
                    <h2 className="text-base font-bold">{ALGORITHM_META[algorithmKey].name}</h2>
                  </div>
                  <div className="hidden sm:flex items-center gap-5">
                    {LEGEND.map(({ state, label, color }) => (
                      <div key={state} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <ArrayBars bars={current.array} />
              </div>
              <StatsBar step={current} progress={progress} />
            </>
          )}

          {view === "complexity" && (
            <div className="rounded-3xl p-7 flex-1" style={{ background: "var(--card)" }}>
              <ComplexityView meta={ALGORITHM_META[algorithmKey]} />
            </div>
          )}

          {view === "implementation" && (
            <div className="rounded-3xl p-7 flex-1 flex flex-col" style={{ background: "var(--card)" }}>
              <ImplementationView meta={ALGORITHM_META[algorithmKey]} />
            </div>
          )}
        </main>

        <Controls
          algorithmKey={algorithmKey}
          onAlgorithmChange={handleAlgorithmChange}
          isPlaying={isPlaying}
          isDone={isDone}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          speed={speed}
          arraySize={arraySize}
          onPlay={play}
          onPause={pause}
          onReset={() => { pause(); resetSort() }}
          onStepForward={stepForward}
          onStepBack={stepBack}
          onSpeedChange={setSpeed}
          onSizeChange={handleSizeChange}
          onRandomize={handleRandomize}
        />
      </div>
    </div>
  )
}