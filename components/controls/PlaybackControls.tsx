"use client"

import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Check } from "lucide-react"
import { ControlButton } from "./ControlButton"

interface Props {
  isPlaying: boolean
  isDone: boolean
  stepIndex: number
  totalSteps: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onStepForward: () => void
  onStepBack: () => void
}

export function PlaybackControls({
  isPlaying,
  isDone,
  stepIndex,
  totalSteps,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBack,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Playback
      </p>

      <ControlButton
        onClick={isPlaying ? onPause : onPlay}
        disabled={isDone}
        accent
      >
        <div className="flex items-center justify-center gap-2 w-full">
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              <span>Pause</span>
            </>
          ) : isDone ? (
            <>
              <Check className="h-4 w-4" />
              <span>Done</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Play</span>
            </>
          )}
        </div>
      </ControlButton>

      <div className="flex gap-2">
        <ControlButton
          onClick={onStepBack}
          disabled={isPlaying || stepIndex === 0}
        >
          <div className="flex items-center justify-center gap-1 w-full">
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </div>
        </ControlButton>
        <ControlButton
          onClick={onStepForward}
          disabled={isPlaying || isDone}
        >
          <div className="flex items-center justify-center gap-1 w-full">
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </ControlButton>
      </div>

      <ControlButton onClick={onReset} ghost>
        <div className="flex items-center justify-center gap-2 w-full">
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </div>
      </ControlButton>
    </div>
  )
}