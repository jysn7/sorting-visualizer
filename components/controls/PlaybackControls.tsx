"use client"

import { ControlButton } from "./ControlButton"

interface IconButtonProps {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  accent?: boolean
  ghost?: boolean
}

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
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
        Playback
      </p>

      <ControlButton
        onClick={isPlaying ? onPause : onPlay}
        disabled={isDone}
        accent
      >
        {isPlaying ? "Pause" : isDone ? "Done" : "▶  Play"}
      </ControlButton>

      <div className="flex gap-2">
        <ControlButton
          onClick={onStepBack}
          disabled={isPlaying || stepIndex === 0}
        >
          ← Back
        </ControlButton>
        <ControlButton
          onClick={onStepForward}
          disabled={isPlaying || isDone}
        >
          Next →
        </ControlButton>
      </div>

      <ControlButton onClick={onReset} ghost>
        Reset
      </ControlButton>
    </div>
  )
}