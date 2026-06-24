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
    
    // Create nodes
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Map the bar's value to a frequency pitch (e.g., between 200Hz and 800Hz)
    const minFreq = 200
    const maxFreq = 800
    const frequency = minFreq + (value / maxBarValue) * (maxFreq - minFreq)

    oscillator.type = "sine" // A clean, soft tone
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    // Fast volume envelope to avoid clicking sounds
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime) // Low volume
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04) // Fast fade out

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.04) // 40ms duration
  } catch (e) {
    console.error("Audio playback failed", e)
  }
}