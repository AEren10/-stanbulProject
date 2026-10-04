import { motion } from 'motion/react'
import { CAT_BY_ID } from '../data/categories'
import { PLACE_INFO } from '../data/placeInfo'
import type { Place } from '../data/types'
import { useApp } from '../useApp'
import { useTilt } from '../useTilt'
import { distanceKm, fmtDist, fmtMins } from '../utils'
import { FavButton } from './FavButton'
import { PlaceImage } from './PlaceImage'

export function PlaceCard({ place, index = 0 }: { place: Place; index?: number }) {
  const { lang, t, setOpenPlace, userPos, isVisited } = useApp()
  const cat = CAT_BY_ID[place.cat]
  const visited = isVisited(place.id)
  const tilt = useTilt(9)
  return (
    <motion.button
      type="button"
      layout
      className="pcard"
      style={{ ['--c' as string]: cat.color, ...tilt.style }}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      initial={{ opacity: 0, y: 50, scale: 0.85, rotate: index % 2 ? 4 : -4 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      exit={{ opacity: 0, scale: 0.6, rotate: -10 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setOpenPlace(place)}
    >
      <PlaceImage place={place} className="pcard-img" />
      <span className="pcard-cat">
        {cat.emoji} {lang === 'tr' ? cat.tr : cat.en}
      </span>
      {visited && (
        <motion.span className="stamp" initial={{ scale: 3, rotate: -60, opacity: 0 }} animate={{ scale: 1, rotate: 12, opacity: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }}>
          ✓
        </motion.span>
      )}
      <FavButton id={place.id} className="pcard-fav" />
      <span className="pcard-shine" aria-hidden />
      <div className="pcard-body">
        <h4>{lang === 'tr' ? place.tr : place.en}</h4>
        <p className="pcard-desc">{lang === 'tr' ? place.dtr : place.den}</p>
        <div className="meta">
          <span>⏱ {fmtMins(place.mins, t)}</span>
          {PLACE_INFO[place.id] && <span>🏙️ {PLACE_INFO[place.id].district}</span>}
          {PLACE_INFO[place.id]?.price === 'free' && <span className="free">🆓 {t.price.free}</span>}
          {userPos && <span>📍 {fmtDist(distanceKm(userPos, place), t)}</span>}
        </div>
      </div>
    </motion.button>
  )
}
