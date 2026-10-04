import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { CAT_BY_ID, CATEGORIES } from '../data/categories'
import { PLACES } from '../data/places'
import type { CatId, Place } from '../data/types'
import { useApp } from '../useApp'
import { distanceKm, fmtDist, fmtMins } from '../utils'
import { MapView } from './MapView'
import { PlaceImage } from './PlaceImage'

export function MapPage() {
  const { lang, t, userPos, locStatus, requestLocation, mapFocus, setOpenPlace } = useApp()
  const [cat, setCat] = useState<CatId | 'all'>('all')
  const [picked, setPicked] = useState<Place | null | undefined>(undefined)
  const selected = picked !== undefined ? picked : (PLACES.find((x) => x.id === mapFocus) ?? null)
  const setSelected = setPicked

  const places = useMemo(() => PLACES.filter((p) => cat === 'all' || p.cat === cat), [cat])

  return (
    <div className="page map-page">
      <header className="page-head compact">
        <h2>{t.map_title}</h2>
        <p>{t.map_sub}</p>
      </header>
      <div className="chips scroll">
        <button type="button" className={`chip ${cat === 'all' ? 'on' : ''}`} onClick={() => setCat('all')}>
          {t.mapShowAll}
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`chip ${cat === c.id ? 'on' : ''}`}
            style={{ ['--c' as string]: c.color }}
            onClick={() => setCat(c.id)}
          >
            {c.emoji} {lang === 'tr' ? c.tr : c.en}
          </button>
        ))}
      </div>
      <div className="map-box">
        <MapView
          places={places}
          focusId={mapFocus}
          selectedId={selected?.id}
          userPos={userPos}
          onSelect={setSelected}
          className="map-big"
        />
        <motion.button
          type="button"
          className="locate"
          whileTap={{ scale: 0.9 }}
          onClick={requestLocation}
          title={t.locate}
        >
          {locStatus === 'loading' ? '⏳' : '📍'}
        </motion.button>
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              className="mini"
              style={{ ['--c' as string]: CAT_BY_ID[selected.cat].color }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <PlaceImage place={selected} className="mini-img" />
              <div className="mini-body">
                <h4>{lang === 'tr' ? selected.tr : selected.en}</h4>
                <div className="meta">
                  <span>⏱ {fmtMins(selected.mins, t)}</span>
                  {userPos && <span>📍 {fmtDist(distanceKm(userPos, selected), t)}</span>}
                </div>
                <button type="button" className="cta small" onClick={() => setOpenPlace(selected)}>
                  {t.details}
                </button>
              </div>
              <button type="button" className="x" onClick={() => setSelected(null)} aria-label={t.close}>
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
