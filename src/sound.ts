let audio: AudioContext | null = null
let muted = false

export function setMuted(m: boolean) {
  muted = m
}
export function isMuted() {
  return muted
}

function beep(freq: number, dur: number, type: OscillatorType = 'triangle', vol = 0.05) {
  if (muted) return
  try {
    audio ??= new AudioContext()
    const o = audio.createOscillator()
    const g = audio.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.setValueAtTime(vol, audio.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dur)
    o.connect(g).connect(audio.destination)
    o.start()
    o.stop(audio.currentTime + dur + 0.01)
  } catch {
    /* ignore */
  }
}

export function tick() {
  beep(880, 0.06)
}

export function fanfare() {
  ;[523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, 0.18, 'square', 0.035), i * 110))
}
