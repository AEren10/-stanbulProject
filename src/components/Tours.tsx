import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { PLACE_BY_ID } from '../data/places'
import { TOURS } from '../data/tours'
import type { Tour } from '../data/types'
import { useApp } from '../useApp'
import { distanceKm, fmtDist, fmtMins, gmapsRoute, tourPlaces } from '../utils'
import { MapView } from './MapView'
import { PlaceImage } from './PlaceImage'

function tourStats(tour: Tour) {
  const pts = tourPlaces(tour.id)
  let km = 0
  for (let i = 1; i < pts.length; i++) km += distanceKm(pts[i - 1], pts[i])
  const mins = pts.reduce((s, p) => s + p.mins, 0)
  return { pts, km, mins }
}

function TourDetail({ tour }: { tour: Tour }) {
  const { lang, t, isVisited, markVisited, finishTour, progress, setActiveTourId, setOpenPlace } = useApp()
  const { pts, km, mins } = useMemo(() => tourStats(tour), [tour])
  const done = progress.toursDone.includes(tour.id)
  const [started, setStarted] = useState(false)
  const currentIdx = tour.steps.findIndex((s) => !isVisited(s.id))
  const allDone = currentIdx === -1
  const [selected, setSelected] = useState<string | null>(null)

  const gm = gmapsRoute(pts, tour.modeEn.toLowerCase().includes('on foot') || tour.modeEn.startsWith('Walk') ? 'walking' : 'transit')

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <button type="button" className="back" onClick={() => setActiveTourId(null)}>
        ← {t.tourBack}
      </button>
      <header className="tour-head" style={{ ['--c' as string]: tour.color }}>
        <motion.span
          className="tour-emoji"
          animate={{ rotate: [0, -8, 8, 0], y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
        >
          {tour.emoji}
        </motion.span>
        <div>
          <h2>{lang === 'tr' ? tour.tr : tour.en}</h2>
          <p>{lang === 'tr' ? tour.dtr : tour.den}</p>
          <div className="meta">
            <span>🧩 {pts.length} {t.stops}</span>
            <span>⏱ {fmtMins(mins, t)}</span>
            <span>📏 {fmtDist(km, t)}</span>
            <span>🚶 {lang === 'tr' ? tour.modeTr : tour.modeEn}</span>
          </div>
          {done && <span className="cat-chip">🏆 {t.tourDone}</span>}
        </div>
      </header>

      <div className="tour-layout">
        <MapView
          places={pts}
          route={pts}
          routeColor={tour.color}
          selectedId={selected}
          onSelect={(p) => setSelected(p.id)}
          className="map-tour"
        />
        <ol className="timeline" style={{ ['--c' as string]: tour.color }}>
          {tour.steps.map((s, i) => {
            const p = PLACE_BY_ID[s.id]
            const visited = isVisited(s.id)
            const current = started && i === currentIdx
            return (
              <motion.li
                key={s.id}
                className={`step ${visited ? 'done' : ''} ${current ? 'current' : ''}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}
                onMouseEnter={() => setSelected(s.id)}
              >
                <span className="dot">{visited ? '✓' : i + 1}</span>
                <button type="button" className="step-card" onClick={() => setOpenPlace(p)}>
                  <PlaceImage place={p} className="step-img" />
                  <div>
                    <b>{lang === 'tr' ? p.tr : p.en}</b>
                    <small>{lang === 'tr' ? s.tr : s.en}</small>
                    <small className="muted">⏱ {fmtMins(p.mins, t)}</small>
                  </div>
                </button>
                {current && (
                  <motion.button
                    type="button"
                    className="cta small"
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => markVisited(s.id)}
                  >
                    {t.stepDone}
                  </motion.button>
                )}
              </motion.li>
            )
          })}
        </ol>
      </div>

      <div className="actions sticky">
        {!started && !allDone && (
          <button type="button" className="cta" onClick={() => setStarted(true)}>
            ▶ {currentIdx > 0 ? t.continueTour : t.startTour}
          </button>
        )}
        {allDone && !done && (
          <motion.button
            type="button"
            className="cta"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            onClick={() => finishTour(tour.id)}
          >
            {t.tourFinish}
          </motion.button>
        )}
        <a className="btn" href={gm} target="_blank" rel="noreferrer">
          🧭 {t.openRoute}
        </a>
      </div>

      <AnimatePresence>
        {done && allDone && (
          <motion.p
            className="banner"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🏆 {t.tourDone} {t.tourDoneSub}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Tours() {
  const { lang, t, activeTourId, setActiveTourId, progress, userPos } = useApp()
  const active = TOURS.find((x) => x.id === activeTourId)

  const nearestId = useMemo(() => {
    if (!userPos) return null
    let best: string | null = null
    let bd = Infinity
    for (const tour of TOURS) {
      const first = PLACE_BY_ID[tour.steps[0].id]
      const d = distanceKm(userPos, first)
      if (d < bd) {
        bd = d
        best = tour.id
      }
    }
    return best
  }, [userPos])

  if (active) return <AnimatePresence mode="wait"><TourDetail key={active.id} tour={active} /></AnimatePresence>

  return (
    <div className="page">
      <header className="page-head">
        <h2>{t.tours_title}</h2>
        <p>{t.tours_sub}</p>
      </header>
      <div className="tour-grid">
        {TOURS.map((tour, i) => {
          const { pts, km, mins } = tourStats(tour)
          const doneCount = tour.steps.filter((s) => progress.visited.includes(s.id)).length
          const isDone = progress.toursDone.includes(tour.id)
          return (
            <motion.button
              key={tour.id}
              type="button"
              className="tcard"
              style={{ ['--c' as string]: tour.color }}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 220, damping: 18 }}
              whileHover={{ y: -8, rotate: i % 2 ? -1 : 1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTourId(tour.id)}
            >
              <div className="tcard-top">
                <motion.span
                  className="tour-emoji"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.2 }}
                >
                  {tour.emoji}
                </motion.span>
                {isDone && <span className="stamp">🏆</span>}
                {nearestId === tour.id && <span className="near-badge">📍 {t.startNear}</span>}
              </div>
              <h3>{lang === 'tr' ? tour.tr : tour.en}</h3>
              <p>{lang === 'tr' ? tour.dtr : tour.den}</p>
              <div className="dots">
                {tour.steps.map((s) => (
                  <i key={s.id} className={progress.visited.includes(s.id) ? 'on' : ''} />
                ))}
              </div>
              <div className="meta">
                <span>🧩 {pts.length} {t.stops}</span>
                <span>⏱ {fmtMins(mins, t)}</span>
                <span>📏 {fmtDist(km, t)}</span>
                {doneCount > 0 && <span>✓ {doneCount}/{pts.length}</span>}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
