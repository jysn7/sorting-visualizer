"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { ArrayBar, SortStep } from "@/lib/algorithms/types"
import { bubbleSort } from "@/lib/algorithms"
import { playSwapSound } from "@/lib/audio"

const ALGORITHMS: Record<string, (input: ArrayBar[]) => SortStep[]> = {
  bubble: bubbleSort,
  // add others here as you implement them
}

export function useSorting(initialArray: ArrayBar[], algorithmKey: string) {
  const steps = useMemo(() => {
    const fn = ALGORITHMS[algorithmKey] ?? bubbleSort
    return fn(initialArray)
  }, [initialArray, algorithmKey])

  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // reset when steps change
  useEffect(() => {
    setStepIndex(0)
    setIsPlaying(false)
  }, [steps])

  // Trigger sound when the step index changes during active playback
  useEffect(() => {
    if (isPlaying && steps[stepIndex]) {
      const currentStep = steps[stepIndex]
      const swappingBar = currentStep.array.find(bar => bar.state === "swapping")
      if (swappingBar) {
        playSwapSound(swappingBar.value)
      }
    }
  }, [stepIndex, isPlaying, steps])

  const isDone = stepIndex >= steps.length - 1

  useEffect(() => {
    if (!isPlaying) return
    intervalRef.current = setInterval(() => {
      setStepIndex(i => {
        if (i >= steps.length - 1) { setIsPlaying(false); return i }
        return i + 1
      })
    }, speed)
    return () => clearInterval(intervalRef.current!)
  }, [isPlaying, speed, steps.length])

  const play = () => { if (!isDone) setIsPlaying(true) }
  const pause = () => setIsPlaying(false)
  const reset = () => { setIsPlaying(false); setStepIndex(0) }
  const stepForward = () => setStepIndex(i => Math.min(i + 1, steps.length - 1))
  const stepBack = () => setStepIndex(i => Math.max(i - 1, 0))

  return {
    current: steps[stepIndex],
    isPlaying,
    isDone,
    play,
    pause,
    reset,
    stepForward,
    stepBack,
    speed,
    setSpeed,
    totalSteps: steps.length,
    stepIndex,
  }
}