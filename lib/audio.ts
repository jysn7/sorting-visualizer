let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume()
  }
  return audioCtx
}

function mapFrequency(value: number, max: number, min = 180, max_ = 1200): number {
  return min + (value / max) * (max_ - min)
}

export function playCompareSound(value: number, maxBarValue = 200) {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = "sine"
    osc.frequency.setValueAtTime(mapFrequency(value, maxBarValue), ctx.currentTime)

    gain.gain.setValueAtTime(0.03, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.03)
  } catch (e) {
    console.error("Audio playback failed", e)
  }
}

export function playSwapSound(value: number, maxBarValue = 200) {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = "triangle"
    osc.frequency.setValueAtTime(mapFrequency(value, maxBarValue), ctx.currentTime)

    gain.gain.setValueAtTime(0.07, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.06)
  } catch (e) {
    console.error("Audio playback failed", e)
  }
}

export function playDoneSound() {
  try {
    const ctx = getAudioContext()
    const notes = [523, 659, 784, 1047] 
    const duration = 0.12

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      const start = ctx.currentTime + i * duration

      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, start)

      gain.gain.setValueAtTime(0.08, start)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

      osc.start(start)
      osc.stop(start + duration)
    })
  } catch (e) {
    console.error("Audio playback failed", e)
  }
}

export function playPivotSound(value: number, maxBarValue = 200) {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = "sawtooth"
    osc.frequency.setValueAtTime(mapFrequency(value, maxBarValue, 80, 400), ctx.currentTime)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.08)
  } catch (e) {
    console.error("Audio playback failed", e)
  }
}

export function resumeAudio() {
  audioCtx?.resume()
}