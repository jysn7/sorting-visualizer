let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioCtx
}

export function playSwapSound(value: number, maxBarValue: number = 200) {
  try {
    const ctx = getAudioContext()
    
    // Resume context if suspended by browser autoplay policies
    if (ctx.state === "suspended") {
      ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Linear mapping calculation
    const minFreq = 200
    const maxFreq = 800
    const frequency = minFreq + (value / maxBarValue) * (maxFreq - minFreq)

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    // Volume configuration
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.04)
  } catch (e) {
    console.error("Audio playback failed", e)
  }
}