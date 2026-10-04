import { animate, AnimatePresence, motion, useMotionValue, useMotionValueEvent } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CAT_BY_ID, CATEGORIES } from '../data/categories'
import { PLACE_BY_ID, PLACES } from '../data/places'
import { TOURS } from '../data/tours'
import type { Place } from '../data/types'
import { fanfare, tick } from '../sound'
import { PLACE_ANGLE, RING_ORDER, SLICE_DEG } from '../sunburstGeom'
import { useApp } from '../useApp'
import { useTilt } from '../useTilt'
import { shuffle } from '../utils'
import { Counter } from './fx'
import { PlaceImage } from './PlaceImage'
import { Sunburst } from './Sunburst'

const sectionAnim = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
}

export function StatsStrip() {
  const { t } = useApp()
  const items = [
    { n: PLACES.length, label: t.stats_places, e: '📍', c: '#E0526F' },
    { n: CATEGORIES.length, label: t.stats_cats, e: '🎨', c: '#F0A030' },
    { n: TOURS.length, label: t.stats_tours, e: '🚶', c: '#2FB5C4' },
    { n: 16, label: t.stats_badges, e: '🏅', c: '#8456D0' },
  ]
  return (
    <motion.section className="stats-strip" {...sectionAnim}>
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          className="stat-pop"
          style={{ ['--c' as string]: it.c }}
          initial={{ scale: 0.5, rotate: i % 2 ? 8 : -8, opacity: 0 }}
          whileInView={{ scale: 1, rotate: i % 2 ? 2 : -2, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 12, delay: i * 0.1 }}
          whileHover={{ rotate: 0, scale: 1.08, y: -6 }}
        >
          <span className="stat-pop-e">{it.e}</span>
          <Counter value={it.n} className="stat-pop-n" />
          <small>{it.label}</small>
        </motion.div>
      ))}
    </motion.section>
  )
}

function CatCard({ i }: { i: number }) {
  const { lang, openCategory } = useApp()
  const c = CATEGORIES[i]
  const count = PLACES.filter((p) => p.cat === c.id).length
  const tilt = useTilt(12)
  return (
    <motion.button
      type="button"
      className="cat-card"
      style={{ ['--c' as string]: c.color, ...tilt.style }}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      initial={{ opacity: 0, y: 60, rotate: i % 2 ? 6 : -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 16, delay: (i % 4) * 0.08 }}
      whileHover={{ y: -10, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => openCategory(c.id)}
    >
      <motion.span
        className="cat-card-emoji"
        animate={{ y: [0, -8, 0], rotate: [0, -6, 6, 0] }}
        transition={{ repeat: Infinity, duration: 3 + (i % 3), ease: 'easeInOut' }}
      >
        {c.emoji}
      </motion.span>
      <b>{lang === 'tr' ? c.tr : c.en}</b>
      <span className="cat-card-count">{count}</span>
    </motion.button>
  )
}

export function CategoryGrid() {
  const { t } = useApp()
  return (
    <motion.section className="home-section" {...sectionAnim}>
      <div className="section-head">
        <h2>🎨 {t.cats_title}</h2>
        <p>{t.cats_sub}</p>
      </div>
      <div className="cat-grid">
        {CATEGORIES.map((c, i) => (
          <CatCard key={c.id} i={i} />
        ))}
      </div>
    </motion.section>
  )
}

export function PicksCarousel() {
  const { lang, t, setOpenPlace } = useApp()
  const [seed, setSeed] = useState(0)
  const [picks, setPicks] = useState<Place[]>(() => shuffle(PLACES).slice(0, 12))
  const track = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  function refresh() {
    setPicks(shuffle(PLACES).slice(0, 12))
    setSeed((s) => s + 1)
  }

  return (
    <motion.section className="home-section" {...sectionAnim}>
      <div className="section-head row">
        <div>
          <h2>🎁 {t.picks_title}</h2>
          <p>{t.picks_sub}</p>
        </div>
        <motion.button
          type="button"
          className="btn"
          whileTap={{ rotate: 360, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          onClick={refresh}
        >
          🔀 {t.shufflePicks}
        </motion.button>
      </div>
      <div className="picks-viewport" ref={track}>
        <motion.div
          key={seed}
          className="picks-track"
          drag="x"
          dragConstraints={track}
          dragElastic={0.15}
          onDragStart={() => (dragging.current = true)}
          onDragEnd={() => setTimeout(() => (dragging.current = false), 50)}
        >
          {picks.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              className="pick"
              style={{ ['--c' as string]: CAT_BY_ID[p.cat].color }}
              initial={{ opacity: 0, x: 80, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: i % 2 ? 2 : -2 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
              whileHover={{ rotate: 0, y: -10, scale: 1.04 }}
              onClick={() => !dragging.current && setOpenPlace(p)}
            >
              <PlaceImage place={p} className="pick-img" />
              <span className="pick-num">#{i + 1}</span>
              <div className="pick-body">
                <b>{lang === 'tr' ? p.tr : p.en}</b>
                <small>
                  {CAT_BY_ID[p.cat].emoji} {lang === 'tr' ? CAT_BY_ID[p.cat].tr : CAT_BY_ID[p.cat].en}
                </small>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export function BurstExplorer({ onResult, spinSignal }: { onResult: (p: Place) => void; spinSignal: number }) {
  const { lang, t, setOpenPlace, addSpin, openCategory } = useApp()
  const [hover, setHover] = useState<Place | null>(null)
  const [spinning, setSpinning] = useState(false)
  const rotate = useMotionValue(0)
  const lastIdx = useRef(-1)
  const box = useRef<HTMLDivElement>(null)

  useMotionValueEvent(rotate, 'change', (v) => {
    if (!spinning) return
    const a = ((-v % 360) + 360) % 360
    const idx = Math.floor(a / SLICE_DEG) % RING_ORDER.length
    if (idx !== lastIdx.current) {
      lastIdx.current = idx
      setHover(PLACE_BY_ID[RING_ORDER[idx]])
      tick()
    }
  })

  const spin = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    const winner = PLACES[Math.floor(Math.random() * PLACES.length)]
    const jitter = (Math.random() - 0.5) * SLICE_DEG * 0.5
    const desired = (((360 - PLACE_ANGLE[winner.id] + jitter) % 360) + 360) % 360
    const cur = rotate.get()
    const delta = ((((desired - cur) % 360) + 360) % 360) + 360 * 5
    animate(rotate, cur + delta, {
      duration: 6.5,
      ease: [0.12, 0.6, 0.08, 1],
      onComplete: () => {
        setSpinning(false)
        setHover(winner)
        addSpin()
        fanfare()
        setTimeout(() => onResult(winner), 450)
      },
    })
  }, [spinning, rotate, addSpin, onResult])

  useEffect(() => {
    if (!spinSignal) return
    box.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const id = setTimeout(spin, 700)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinSignal])

  return (
    <motion.section className="home-section burst-section" id="dev-cark" {...sectionAnim}>
      <div className="section-head center">
        <h2>🌀 {t.burst_title}</h2>
        <p>{t.burst_sub}</p>
      </div>
      <div className="burst-box" ref={box}>
        <motion.div
          className={`burst-wheel ${spinning ? 'is-spinning' : ''}`}
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60, damping: 14 }}
        >
          <span className="burst-halo" aria-hidden />
          <div className="burst-pointer" aria-hidden />
          <motion.div className="burst-rot" style={{ rotate }}>
            <Sunburst
              labels
              onPlace={spinning ? undefined : setOpenPlace}
              onHover={spinning ? undefined : setHover}
              activeId={hover?.id}
              className="burst-svg"
            />
          </motion.div>
          <div className="burst-center">
            <AnimatePresence mode="popLayout">
              {hover ? (
                <motion.div
                  key={hover.id}
                  initial={{ scale: 0.5, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                >
                  <span className="burst-emoji">{hover.emoji}</span>
                  <b style={{ color: CAT_BY_ID[hover.cat].color }}>{lang === 'tr' ? hover.tr : hover.en}</b>
                </motion.div>
              ) : (
                <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span className="burst-emoji">🎲</span>
                  <b>{t.hoverHint}</b>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <motion.button
          type="button"
          className="mega-cta"
          disabled={spinning}
          onClick={spin}
          whileHover={{ scale: 1.06, rotate: -1 }}
          whileTap={{ scale: 0.92 }}
          animate={spinning ? { scale: 0.96 } : { y: [0, -6, 0] }}
          transition={spinning ? undefined : { repeat: Infinity, duration: 1.4 }}
        >
          {spinning ? `🌀 ${t.spinningBig}` : `🚀 ${t.sendMe}`}
        </motion.button>
        <div className="burst-legend">
          {CATEGORIES.map((c, i) => (
            <motion.button
              type="button"
              key={c.id}
              className="legend-row"
              style={{ ['--c' as string]: c.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              onClick={() => openCategory(c.id)}
            >
              <i />
              {c.emoji} {lang === 'tr' ? c.tr : c.en}
              <small>{PLACES.filter((p) => p.cat === c.id).length}</small>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
