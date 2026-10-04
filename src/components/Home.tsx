import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CAT_BY_ID, TAGS } from '../data/categories'
import { PLACES } from '../data/places'
import type { Place, Tag } from '../data/types'
import { useApp } from '../useApp'
import { distanceKm, fmtDist, fmtMins, shuffle } from '../utils'
import { DailyQuest } from './DailyQuest'
import { Floaters, SpinBadge } from './fx'
import { BurstExplorer, CategoryGrid, PicksCarousel, StatsStrip } from './HomeSections'
import { PlaceImage } from './PlaceImage'
import { Sunburst } from './Sunburst'
import { Wheel } from './Wheel'

type TimeKey = 'any' | 'quick' | 'half'
const TIME_LIMIT: Record<TimeKey, number> = { any: Infinity, quick: 90, half: 180 }
const RADII = [2, 5, 10, 25]

export function Home() {
  const {
    lang, t, userPos, locStatus, requestLocation, clearLocation, setOpenPlace, showOnMap,
    isVisited, toggleVisited, fireCelebrate,
  } = useApp()
  const [moods, setMoods] = useState<Tag[]>([])
  const [time, setTime] = useState<TimeKey>('any')
  const [near, setNear] = useState(false)
  const [radius, setRadius] = useState(5)
  const [shuffleKey, setShuffleKey] = useState(0)
  const [winner, setWinner] = useState<Place | null>(null)
  const [megaSignal, setMegaSignal] = useState(0)
  const [greetIdx] = useState(() => {
    const h = new Date().getHours()
    return h < 5 ? 0 : h < 12 ? 1 : h < 18 ? 2 : 3
  })
  const { scrollY } = useScroll()
  const bgRotate = useTransform(scrollY, [0, 1500], [0, 120])
  const bgY = useTransform(scrollY, [0, 1500], [0, 300])

  const candidates = useMemo(() => {
    return PLACES.filter((p) => {
      if (moods.length && !p.tags.some((tg) => moods.includes(tg))) return false
      if (p.mins > TIME_LIMIT[time]) return false
      if (near && userPos && distanceKm(userPos, p) > radius) return false
      return true
    })
  }, [moods, time, near, userPos, radius])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slices = useMemo(() => shuffle(candidates).slice(0, 8), [candidates, shuffleKey])

  function toggleMood(m: Tag) {
    setMoods((cur) => (cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]))
  }

  function toggleNear() {
    if (near) {
      setNear(false)
    } else {
      setNear(true)
      if (!userPos) requestLocation()
    }
  }

  function onResult(p: Place) {
    setWinner(p)
    fireCelebrate()
  }

  const name = (p: Place) => (lang === 'tr' ? p.tr : p.en)
  const desc = (p: Place) => (lang === 'tr' ? p.dtr : p.den)

  return (
    <div className="home">
      <motion.div className="home-bg" aria-hidden style={{ y: bgY }}>
        <motion.div style={{ rotate: bgRotate }}>
          <Sunburst className="home-sunburst" />
        </motion.div>
      </motion.div>
      <Floaters />

      <section className="hero">
        <motion.span
          className="kicker"
          initial={{ y: 20, opacity: 0, rotate: -3 }}
          animate={{ y: 0, opacity: 1, rotate: -3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        >
          {t.greet[greetIdx]} {t.hero_kicker}
        </motion.span>
        <h1>
          {t.hero_title.split(' ').map((w, i) => (
            <motion.span
              key={i}
              className="word"
              initial={{ y: 40, opacity: 0, rotate: 6 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.12 + i * 0.07, type: 'spring', stiffness: 220, damping: 14 }}
            >
              {w}
            </motion.span>
          ))}
        </h1>
        <p>{t.hero_sub}</p>
        <div className="hero-ctas">
          <motion.button
            type="button"
            className="cta big"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => document.querySelector('.wheel-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          >
            🎡 {t.ctaSpin}
          </motion.button>
          <motion.button
            type="button"
            className="cta big alt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setMegaSignal((n) => n + 1)}
          >
            🚀 {t.sendMe}
          </motion.button>
        </div>
        <SpinBadge
          className="hero-badge"
          text={t.badgeText.repeat(2)}
          center={
            <>
              <b>{PLACES.length}</b>
              <small>{t.badgeCenter}</small>
            </>
          }
        />
      </section>

      <div className="home-grid">
        <section className="panel filters">
          <h3>{t.mood}</h3>
          <div className="chips">
            {TAGS.map((tg) => (
              <motion.button
                key={tg.id}
                type="button"
                className={`chip ${moods.includes(tg.id) ? 'on' : ''}`}
                onClick={() => toggleMood(tg.id)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ y: -2 }}
              >
                <span>{tg.emoji}</span> {lang === 'tr' ? tg.tr : tg.en}
              </motion.button>
            ))}
          </div>

          <h3>{t.time}</h3>
          <div className="seg">
            {(['any', 'quick', 'half'] as TimeKey[]).map((k) => (
              <button
                key={k}
                type="button"
                className={time === k ? 'on' : ''}
                onClick={() => setTime(k)}
              >
                {k === 'any' ? t.time_any : k === 'quick' ? t.time_quick : t.time_half}
              </button>
            ))}
          </div>

          <h3>📍 {t.near}</h3>
          <div className="near-row">
            <button type="button" className={`switch ${near ? 'on' : ''}`} onClick={toggleNear} aria-pressed={near}>
              <i />
            </button>
            {near && locStatus === 'loading' && <span className="muted">{t.locating}</span>}
            {near && locStatus === 'denied' && <span className="warn">{t.locDenied}</span>}
            {near && locStatus === 'ok' && (
              <button type="button" className="link" onClick={() => { clearLocation(); setNear(false) }}>
                {t.locOn} · {t.locOff}
              </button>
            )}
          </div>
          {near && locStatus === 'ok' && (
            <div className="seg small">
              {RADII.map((r) => (
                <button key={r} type="button" className={radius === r ? 'on' : ''} onClick={() => setRadius(r)}>
                  {r} {t.km}
                </button>
              ))}
            </div>
          )}

          <div className="count">
            <b>{candidates.length}</b> {t.places}
          </div>
        </section>

        <section className="wheel-section">
          {candidates.length >= 2 ? (
            <>
              <Wheel slices={slices} onResult={onResult} disabled={!!winner} />
              {candidates.length > 8 && (
                <button type="button" className="ghost" onClick={() => setShuffleKey((k) => k + 1)}>
                  🔀 {t.reshuffle}
                </button>
              )}
            </>
          ) : (
            <div className="empty">
              <div className="empty-emoji">🤷</div>
              <p>{t.wheelEmpty}</p>
              {candidates.length === 1 && (
                <button type="button" className="cta" onClick={() => onResult(candidates[0])}>
                  {name(candidates[0])}
                </button>
              )}
            </div>
          )}
        </section>
      </div>

      <BurstExplorer onResult={onResult} spinSignal={megaSignal} />
      <DailyQuest />
      <StatsStrip />
      <PicksCarousel />
      <CategoryGrid />

      {createPortal(
      <AnimatePresence>
        {winner && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWinner(null)}
          >
            <motion.div
              className="winner"
              style={{ ['--c' as string]: CAT_BY_ID[winner.cat].color }}
              initial={{ scale: 0.4, rotate: -8, y: 80, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="winner-kicker">🎉 {t.winnerKicker}</span>
              <PlaceImage place={winner} big className="winner-img" />
              <div className="winner-body">
                <span className="cat-chip">
                  {CAT_BY_ID[winner.cat].emoji} {lang === 'tr' ? CAT_BY_ID[winner.cat].tr : CAT_BY_ID[winner.cat].en}
                </span>
                <h2>
                  {[...name(winner)].map((ch, i) => (
                    <motion.span
                      key={i}
                      style={{ display: 'inline-block', whiteSpace: 'pre' }}
                      initial={{ y: 30, opacity: 0, rotate: 20 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.25 + i * 0.03, type: 'spring', stiffness: 400, damping: 14 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </h2>
                <p>{desc(winner)}</p>
                <div className="meta">
                  <span>⏱ {fmtMins(winner.mins, t)}</span>
                  {userPos && <span>📍 {fmtDist(distanceKm(userPos, winner), t)}</span>}
                </div>
                <div className="actions">
                  <button type="button" className="cta" onClick={() => { setOpenPlace(winner); setWinner(null) }}>
                    {t.details}
                  </button>
                  <button type="button" className="btn" onClick={() => { showOnMap(winner); setWinner(null) }}>
                    🗺️ {t.onMap}
                  </button>
                  <button
                    type="button"
                    className={`btn ${isVisited(winner.id) ? 'done' : ''}`}
                    onClick={() => toggleVisited(winner.id)}
                  >
                    {isVisited(winner.id) ? t.visited : t.markVisit}
                  </button>
                  <button type="button" className="btn ghost-btn" onClick={() => setWinner(null)}>
                    🎡 {t.spinAgain}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      , document.body)}
    </div>
  )
}
