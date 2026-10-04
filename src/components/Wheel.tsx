import { animate, motion, useMotionValue, useMotionValueEvent } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { CAT_BY_ID } from '../data/categories'
import type { Place } from '../data/types'
import { useApp } from '../useApp'
import { fanfare, isMuted, setMuted, tick } from '../sound'

interface Props {
  slices: Place[]
  onResult: (p: Place) => void
  disabled?: boolean
}

const SIZE = 520
const C = SIZE / 2
const R = 246

function pt(r: number, a: number): [number, number] {
  return [C + r * Math.sin(a), C - r * Math.cos(a)]
}

function slicePath(a0: number, a1: number): string {
  const [x0, y0] = pt(R, a0)
  const [x1, y1] = pt(R, a1)
  const large = a1 - a0 > Math.PI ? 1 : 0
  return `M${C} ${C} L${x0} ${y0} A${R} ${R} 0 ${large} 1 ${x1} ${y1}Z`
}

export function Wheel({ slices, onResult, disabled }: Props) {
  const { lang, t, addSpin } = useApp()
  const rotate = useMotionValue(0)
  const pointer = useMotionValue(0)
  const [spinning, setSpinning] = useState(false)
  const [sound, setSound] = useState(!isMuted())
  const lastIdx = useRef(0)
  const n = slices.length
  const seg = 360 / Math.max(n, 1)

  useMotionValueEvent(rotate, 'change', (v) => {
    if (!spinning || n < 2) return
    const idx = Math.floor((((-v % 360) + 360) % 360) / seg)
    if (idx !== lastIdx.current) {
      lastIdx.current = idx
      animate(pointer, [-22, 0], { duration: 0.14, ease: 'easeOut' })
      tick()
    }
  })

  function spin() {
    if (spinning || disabled || n < 2) return
    setSpinning(true)
    const winner = Math.floor(Math.random() * n)
    const jitter = (Math.random() - 0.5) * seg * 0.6
    const desired = (((360 - (winner + 0.5) * seg + jitter) % 360) + 360) % 360
    const cur = rotate.get()
    const delta = ((((desired - cur) % 360) + 360) % 360) + 360 * (6 + Math.floor(Math.random() * 3))
    animate(rotate, cur + delta, {
      duration: 5.4,
      ease: [0.1, 0.62, 0.1, 1],
      onComplete: () => {
        setSpinning(false)
        addSpin()
        fanfare()
        onResult(slices[winner])
      },
    })
  }

  const spinRef = useRef(spin)
  useEffect(() => {
    spinRef.current = spin
  })
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (e.code === 'Space' && tag !== 'INPUT' && tag !== 'BUTTON' && tag !== 'TEXTAREA') {
        e.preventDefault()
        spinRef.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <motion.div
      className={`wheel-wrap ${spinning ? 'is-spinning' : ''}`}
      initial={{ scale: 0.3, rotate: -200, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.2 }}
    >
      <span className="wheel-halo" aria-hidden />
      <div className="wheel-lights" aria-hidden>
        {Array.from({ length: 24 }, (_, i) => (
          <i key={i} style={{ ['--a' as string]: `${i * 15}deg`, animationDelay: `${(i % 2) * 0.4}s` }} />
        ))}
      </div>
      <motion.div className="wheel-pointer" style={{ rotate: pointer }} aria-hidden />
      <motion.div className="wheel-rot" style={{ rotate }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="wheel-svg" role="img" aria-label="wheel">
          <circle cx={C} cy={C} r={R + 3} fill="#2a1a2e" />
          {n >= 2 &&
            slices.map((p, i) => {
              const a0 = (i * seg * Math.PI) / 180
              const a1 = ((i + 1) * seg * Math.PI) / 180
              const color = CAT_BY_ID[p.cat].color
              const mid = (i + 0.5) * seg
              const name = (lang === 'tr' ? p.tr : p.en).replace(/\s*&.*/, '')
              const label = name.length > 13 ? name.slice(0, 12) + '…' : name
              return (
                <g key={p.id}>
                  <path d={slicePath(a0, a1)} fill={color} stroke="#2a1a2e" strokeWidth="3" />
                  <path
                    d={slicePath(a0, a1)}
                    fill="url(#shine)"
                    opacity={i % 2 ? 0.18 : 0}
                    pointerEvents="none"
                  />
                  <g transform={`rotate(${mid - 90} ${C} ${C})`}>
                    <text
                      x={C + R * 0.26}
                      y={C}
                      dominantBaseline="central"
                      className="wheel-label"
                    >
                      {label}
                    </text>
                    <text
                      x={C + R * 0.9}
                      y={C}
                      textAnchor="end"
                      dominantBaseline="central"
                      fontSize={n > 6 ? 26 : 32}
                      transform={`rotate(90 ${C + R * 0.82} ${C})`}
                    >
                      {p.emoji}
                    </text>
                  </g>
                </g>
              )
            })}
          <defs>
            <radialGradient id="shine" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#fff" stopOpacity="1" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
      <motion.button
        type="button"
        className="wheel-btn"
        onClick={spin}
        disabled={spinning || disabled || n < 2}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.92 }}
        animate={spinning ? { scale: 1 } : { scale: [1, 1.06, 1] }}
        transition={spinning ? undefined : { repeat: Infinity, duration: 1.6 }}
      >
        {spinning ? t.spinning : t.spin}
      </motion.button>
      <button
        type="button"
        className="wheel-sound"
        onClick={() => {
          setMuted(sound)
          setSound(!sound)
        }}
        aria-label="sound"
        title="sound"
      >
        {sound ? '🔊' : '🔇'}
      </button>
    </motion.div>
  )
}
