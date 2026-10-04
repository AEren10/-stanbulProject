import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Thin rainbow bar showing page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

/** Big blurry color blobs drifting behind everything. */
export function Blobs() {
  const blobs = [
    { c: '#ffb3c6', x: ['-10%', '8%', '-10%'], y: ['0%', '12%', '0%'], s: 520, top: '-8%', left: '-12%', d: 22 },
    { c: '#ffd88a', x: ['0%', '-14%', '0%'], y: ['0%', '10%', '0%'], s: 460, top: '20%', left: '70%', d: 26 },
    { c: '#9fe3ea', x: ['0%', '10%', '0%'], y: ['0%', '-12%', '0%'], s: 560, top: '62%', left: '-6%', d: 30 },
    { c: '#c9b6ff', x: ['0%', '-8%', '0%'], y: ['0%', '-10%', '0%'], s: 420, top: '78%', left: '68%', d: 24 },
  ]
  return (
    <div className="blobs" aria-hidden>
      {blobs.map((b, i) => (
        <motion.span
          key={i}
          style={{ background: b.c, width: b.s, height: b.s, top: b.top, left: b.left }}
          animate={{ x: b.x, y: b.y, scale: [1, 1.15, 1], borderRadius: ['42% 58% 60% 40%', '60% 40% 45% 55%', '42% 58% 60% 40%'] }}
          transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

const FLOATERS = [
  { e: '🕌', x: '6%', y: '18%', s: 54, depth: 40, d: 0 },
  { e: '⛴️', x: '86%', y: '12%', s: 50, depth: 60, d: 0.4 },
  { e: '🐈', x: '12%', y: '74%', s: 40, depth: 30, d: 0.8 },
  { e: '🥯', x: '90%', y: '66%', s: 42, depth: 50, d: 1.2 },
  { e: '🌷', x: '24%', y: '6%', s: 34, depth: 24, d: 1.6 },
  { e: '🗼', x: '74%', y: '82%', s: 46, depth: 70, d: 2 },
  { e: '🍵', x: '2%', y: '46%', s: 36, depth: 35, d: 2.4 },
  { e: '🐦', x: '96%', y: '38%', s: 34, depth: 45, d: 2.8 },
]

function Floater({ f, mx, my }: { f: (typeof FLOATERS)[number]; mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, (v) => v * f.depth)
  const y = useTransform(my, (v) => v * f.depth)
  return (
    <motion.span className="floater" style={{ left: f.x, top: f.y, fontSize: f.s, x, y }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: [0, 10, -8, 0], y: [0, -14, 0] }}
        transition={{
          scale: { delay: 0.3 + f.d * 0.2, type: 'spring', stiffness: 200, damping: 10 },
          rotate: { repeat: Infinity, duration: 6 + f.d, ease: 'easeInOut' },
          y: { repeat: Infinity, duration: 4 + f.d, ease: 'easeInOut' },
        }}
      >
        {f.e}
      </motion.span>
    </motion.span>
  )
}

/** Istanbul icons floating around the hero with mouse parallax. */
export function Floaters() {
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])
  return (
    <div className="floaters" aria-hidden>
      {FLOATERS.map((f) => (
        <Floater key={f.e} f={f} mx={mx} my={my} />
      ))}
    </div>
  )
}

/** Rotating circular text sticker. */
export function SpinBadge({ text, center, className }: { text: string; center: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`spin-badge ${className ?? ''}`}
      initial={{ scale: 0, rotate: -120 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.6 }}
      whileHover={{ scale: 1.12 }}
    >
      <svg viewBox="0 0 200 200" className="spin-badge-ring">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="spin-badge-center">{center}</div>
    </motion.div>
  )
}

/** Number that counts up when scrolled into view. */
export function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, value, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => setShown(Math.round(v)) })
    return () => ctrl.stop()
  }, [inView, value])
  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  )
}

/** Title whose letters bounce in one by one. */
export function BounceTitle({ text, as = 'h2', className }: { text: string; as?: 'h1' | 'h2' | 'h3'; className?: string }) {
  const Tag = as
  return (
    <Tag className={className} aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="bt-word" aria-hidden>
          {[...word].map((ch, ci) => (
            <motion.span
              key={ci}
              className="bt-ch"
              initial={{ y: 40, opacity: 0, rotate: 12, scale: 0.6 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              whileHover={{ y: -8, rotate: -8, color: '#E0526F' }}
              transition={{ type: 'spring', stiffness: 380, damping: 14, delay: wi * 0.08 + ci * 0.025 }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

const SPARKS = ['✨', '⭐', '💫', '🌟', '❤️', '🧿']

/** Little emoji sparkles on every tap/click. */
export function ClickSparkles() {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([])
  useEffect(() => {
    let id = 0
    const onDown = (e: PointerEvent) => {
      const b = { id: ++id, x: e.clientX, y: e.clientY }
      setBursts((cur) => [...cur.slice(-4), b])
      setTimeout(() => setBursts((cur) => cur.filter((x) => x.id !== b.id)), 800)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [])
  return (
    <div className="sparkles" aria-hidden>
      <AnimatePresence>
        {bursts.map((b) =>
          [0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2 + b.id
            return (
              <motion.span
                key={`${b.id}-${i}`}
                className="spark"
                style={{ left: b.x, top: b.y }}
                initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
                animate={{ x: Math.cos(a) * 46, y: Math.sin(a) * 46 - 10, scale: 1, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                {SPARKS[(b.id + i) % SPARKS.length]}
              </motion.span>
            )
          }),
        )}
      </AnimatePresence>
    </div>
  )
}
