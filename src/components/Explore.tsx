import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { CATEGORIES, TAGS } from '../data/categories'
import { PLACES } from '../data/places'
import type { CatId, Tag } from '../data/types'
import { useApp } from '../useApp'
import { distanceKm } from '../utils'
import { BounceTitle } from './fx'
import { PlaceCard } from './PlaceCard'

export function Explore() {
  const { lang, t, userPos, locStatus, requestLocation, exploreCat, progress } = useApp()
  const [cat, setCat] = useState<CatId | 'all'>(exploreCat)
  const [tag, setTag] = useState<Tag | null>(null)
  const [onlyFav, setOnlyFav] = useState(false)
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<'name' | 'near'>('name')

  const list = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase(lang)
    let res = PLACES.filter((p) => {
      if (cat !== 'all' && p.cat !== cat) return false
      if (tag && !p.tags.includes(tag)) return false
      if (onlyFav && !progress.favs.includes(p.id)) return false
      if (needle) {
        const hay = `${p.tr} ${p.en} ${p.dtr} ${p.den}`.toLocaleLowerCase(lang)
        if (!hay.includes(needle)) return false
      }
      return true
    })
    if (sort === 'near' && userPos) {
      res = [...res].sort((a, b) => distanceKm(userPos, a) - distanceKm(userPos, b))
    } else {
      res = [...res].sort((a, b) => a[lang].localeCompare(b[lang], lang))
    }
    return res
  }, [cat, tag, q, sort, userPos, lang, onlyFav, progress.favs])

  function chooseNear() {
    if (!userPos) requestLocation()
    setSort('near')
  }

  return (
    <div className="page">
      <header className="page-head">
        <BounceTitle text={t.explore_title} />
        <p>{t.explore_sub}</p>
      </header>

      <div className="toolbar">
        <input
          className="search"
          type="search"
          placeholder={`🔍 ${t.search}`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="seg small">
          <button type="button" className={sort === 'name' ? 'on' : ''} onClick={() => setSort('name')}>
            {t.sortName}
          </button>
          <button type="button" className={sort === 'near' && userPos ? 'on' : ''} onClick={chooseNear}>
            📍 {locStatus === 'loading' ? t.locating : t.sortNear}
          </button>
        </div>
      </div>
      {locStatus === 'denied' && <p className="warn">{t.locDenied}</p>}

      <div className="chips scroll">
        <button type="button" className={`chip ${cat === 'all' ? 'on' : ''}`} onClick={() => setCat('all')}>
          {t.all} <small className="count-pill">{PLACES.length}</small>
        </button>
        {CATEGORIES.map((c, i) => (
          <motion.button
            initial={{ opacity: 0, y: 14, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.04, type: 'spring', stiffness: 300, damping: 16 }}
            whileHover={{ y: -3, rotate: i % 2 ? 2 : -2 }}
            whileTap={{ scale: 0.9 }}
            key={c.id}
            type="button"
            className={`chip ${cat === c.id ? 'on' : ''}`}
            style={{ ['--c' as string]: c.color }}
            onClick={() => setCat(c.id)}
          >
            {c.emoji} {lang === 'tr' ? c.tr : c.en}
          </motion.button>
        ))}
      </div>
      <div className="chips scroll sub">
        <button type="button" className={`chip mini ${onlyFav ? 'on' : ''}`} onClick={() => setOnlyFav(!onlyFav)}>
          ❤️ {t.favs} <small className="count-pill">{progress.favs.length}</small>
        </button>
        {TAGS.map((tg) => (
          <button
            key={tg.id}
            type="button"
            className={`chip mini ${tag === tg.id ? 'on' : ''}`}
            onClick={() => setTag(tag === tg.id ? null : tg.id)}
          >
            {tg.emoji} {lang === 'tr' ? tg.tr : tg.en}
          </button>
        ))}
      </div>

      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <PlaceCard key={p.id} place={p} index={i % 4} />
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <motion.p className="empty-text" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1, rotate: [0, -3, 3, 0] }}>
          🤷 {t.noResults}
        </motion.p>
      )}
    </div>
  )
}
