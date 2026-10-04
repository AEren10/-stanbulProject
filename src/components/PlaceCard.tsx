import { motion } from 'motion/react'
import { CAT_BY_ID } from '../data/categories'
import type { Place } from '../data/types'
import { useApp } from '../useApp'
import { distanceKm, fmtDist, fmtMins } from '../utils'
import { PlaceImage } from './PlaceImage'

export function PlaceCard({ place, index = 0 }: { place: Place; index?: number }) {
  const { lang, t, setOpenPlace, userPos, isVisited } = useApp()
  const cat = CAT_BY_ID[place.cat]
  const visited = isVisited(place.id)
  return (
    <motion.button
      type="button"
      layout
      className="pcard"
      style={{ ['--c' as string]: cat.color }}
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: Math.min(index, 12) * 0.03 }}
      whileHover={{ y: -6, rotate: index % 2 ? 0.8 : -0.8 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setOpenPlace(place)}
    >
      <PlaceImage place={place} className="pcard-img" />
      <span className="pcard-cat">
        {cat.emoji} {lang === 'tr' ? cat.tr : cat.en}
      </span>
      {visited && <span className="stamp">✓</span>}
      <div className="pcard-body">
        <h4>{lang === 'tr' ? place.tr : place.en}</h4>
        <div className="meta">
          <span>⏱ {fmtMins(place.mins, t)}</span>
          {userPos && <span>📍 {fmtDist(distanceKm(userPos, place), t)}</span>}
        </div>
      </div>
    </motion.button>
  )
}
