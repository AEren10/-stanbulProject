import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { CAT_BY_ID, TAGS } from '../data/categories'
import { useApp } from '../useApp'
import { distanceKm, fmtDist, fmtMins, gmapsPlace } from '../utils'
import { usePhoto } from '../usePhoto'
import type { Place } from '../data/types'
import { PlaceImage } from './PlaceImage'

function WikiLink({ place }: { place: Place }) {
  const { t } = useApp()
  const photo = usePhoto(place)
  const href =
    photo?.page ??
    (place.wiki ? `https://en.wikipedia.org/wiki/${encodeURIComponent(place.wiki)}` : null)
  if (!href) return null
  return (
    <a className="btn" href={href} target="_blank" rel="noreferrer">
      📖 {t.wiki}
    </a>
  )
}

export function PlaceModal() {
  const { openPlace: place, setOpenPlace, lang, t, userPos, isVisited, toggleVisited, showOnMap } = useApp()

  useEffect(() => {
    if (!place) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenPlace(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [place, setOpenPlace])

  return (
    <AnimatePresence>
      {place && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenPlace(null)}
        >
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            style={{ ['--c' as string]: CAT_BY_ID[place.cat].color }}
            initial={{ y: 120, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="x" onClick={() => setOpenPlace(null)} aria-label={t.close}>
              ✕
            </button>
            <PlaceImage place={place} big className="sheet-img" />
            <div className="sheet-body">
              <span className="cat-chip">
                {CAT_BY_ID[place.cat].emoji} {lang === 'tr' ? CAT_BY_ID[place.cat].tr : CAT_BY_ID[place.cat].en}
              </span>
              <h2>{lang === 'tr' ? place.tr : place.en}</h2>
              <p>{lang === 'tr' ? place.dtr : place.den}</p>
              <div className="meta">
                <span>⏱ {t.suggested}: {fmtMins(place.mins, t)}</span>
                {userPos && (
                  <span>📍 {fmtDist(distanceKm(userPos, place), t)} {t.away}</span>
                )}
              </div>
              <div className="tags">
                {place.tags.map((tg) => {
                  const info = TAGS.find((x) => x.id === tg)!
                  return (
                    <span key={tg} className="tag">
                      {info.emoji} {lang === 'tr' ? info.tr : info.en}
                    </span>
                  )
                })}
              </div>
              <div className="actions">
                <button
                  type="button"
                  className={`cta ${isVisited(place.id) ? 'done' : ''}`}
                  onClick={() => toggleVisited(place.id)}
                >
                  {isVisited(place.id) ? t.visited : t.markVisit}
                </button>
                <button type="button" className="btn" onClick={() => showOnMap(place)}>
                  🗺️ {t.onMap}
                </button>
                <a className="btn" href={gmapsPlace(place)} target="_blank" rel="noreferrer">
                  🧭 {t.gmaps}
                </a>
                <WikiLink place={place} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
