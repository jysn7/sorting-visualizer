"use client"

import { AlgorithmPicker } from "./AlgorithmPicker"
import { PlaybackControls } from "./PlaybackControls"
import { SpeedSlider } from "./SpeedSlider"
import { SizeSlider } from "./SizeSlider"
import { Globe } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { SideCard } from "./SideCard"

interface Props {
  algorithmKey: string
  onAlgorithmChange: (key: string) => void
  isPlaying: boolean
  isDone: boolean
  stepIndex: number
  totalSteps: number
  speed: number
  arraySize: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onStepForward: () => void
  onStepBack: () => void
  onSpeedChange: (v: number) => void
  onSizeChange: (v: number) => void
  onRandomize: () => void
}

export function Controls({
  algorithmKey,
  onAlgorithmChange,
  isPlaying,
  isDone,
  stepIndex,
  totalSteps,
  speed,
  arraySize,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBack,
  onSpeedChange,
  onSizeChange,
  onRandomize,
}: Props) {
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "#"
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "#"
  return (
    <aside className="lg:w-64 flex flex-col gap-4">

      {/* Algorithm picker */}
      <SideCard>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Algorithm
        </p>
        <AlgorithmPicker
          value={algorithmKey}
          onChange={onAlgorithmChange}
          disabled={isPlaying}
        />
      </SideCard>

      {/* Playback */}
      <SideCard>
        <PlaybackControls
          isPlaying={isPlaying}
          isDone={isDone}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          onPlay={onPlay}
          onPause={onPause}
          onReset={onReset}
          onStepForward={onStepForward}
          onStepBack={onStepBack}
        />
      </SideCard>

      {/* Sliders */}
      <SideCard>
        <SpeedSlider value={speed} onChange={onSpeedChange} />
        <div className="h-px" style={{ background: "var(--border)" }} />
        <SizeSlider value={arraySize} onChange={onSizeChange} disabled={isPlaying} />
      </SideCard>

      {/* Randomize */}
      <button
        onClick={onRandomize}
        disabled={isPlaying}
        className="w-full h-11 rounded-2xl text-sm font-semibold  bg-transparent text-foreground border-border transition-all hover:bg-primary hover:text-card hover:border-0 cursor-pointer disabled:opacity-30 border duration-400"
      >
        Randomize array
      </button>

      {/* Socials */}
        <div className="flex items-center mt-2 justify-center gap-6">
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:text-primary text-muted-foreground "
          >
            <FaGithub size={18} />
          </a>
          <a 
            href={linkedinUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-all duration-300 hover:text-primary "
          >
            <FaLinkedin size={18} />
          </a>
          <a 
            href={websiteUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-all hover:text-primary duration-300 text-muted-foreground"
          >
            <Globe size={18} />
          </a>
        </div>

    </aside>
  )
}