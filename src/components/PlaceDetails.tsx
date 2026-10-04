import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { PLACE_INFO } from '../data/placeInfo'
import type { Place } from '../data/types'
import { useApp } from '../useApp'
import { useWikiDetails } from '../usePhoto'

const BEST_EMOJI = { morning: '🌅', day: '☀️', sunset: '🌇', evening: '🌙', any: '🕐' }
const PRICE_EMOJI = { free: '🆓', paid: '🎟️', food: '🍽️' }

export function InfoGrid({ place }: { place: Place }) {
  const { lang, t } = useApp()
  const info = PLACE_INFO[place.id]
  if (!info) return null
  const cells = [
    { k: t.info_district, v: info.district, e: '🏙️' },
    { k: t.info_stop, v: info.stop, e: '🚏' },
    { k: t.info_price, v: t.price[info.price], e: PRICE_EMOJI[info.price] },
    { k: t.info_best, v: t.best[info.best], e: BEST_EMOJI[info.best] },
  ]
  return (
    <>
      <div className="info-grid">
        {cells.map((c, i) => (
          <motion.div
            key={c.k}
            className="info-cell"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <span>{c.e}</span>
            <small>{c.k}</small>
            <b>{c.v}</b>
          </motion.div>
        ))}
      </div>
      <div className="tip-box">
        <b>💡 {t.tip}</b>
        <p>{lang === 'tr' ? info.tipTr : info.tipEn}</p>
      </div>
    </>
  )
}

export function WikiSection({ place }: { place: Place }) {
  const { lang, t } = useApp()
  const d = useWikiDetails(place, lang)
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState<string | null>(null)

  if (d === undefined) return <p className="muted wiki-loading">📖 {t.loadingInfo}</p>
  if (d === null) return null

  return (
    <div className="wiki">
      {d.gallery.length > 0 && (
        <>
          <h4>📸 {t.gallery}</h4>
          <div className="gallery">
            {d.gallery.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setZoom(src)}
              >
                <img src={src} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(e) => ((e.currentTarget.parentElement as HTMLElement).style.display = 'none')} />
              </motion.button>
            ))}
          </div>
        </>
      )}
      <h4>📖 {t.about}</h4>
      <p className={`wiki-text ${open ? 'open' : ''}`}>{d.extract}</p>
      <div className="wiki-foot">
        {d.extract.length > 260 && (
          <button type="button" className="link" onClick={() => setOpen(!open)}>
            {open ? '▲' : t.readMore}
          </button>
        )}
        {d.page && (
          <a className="link" href={d.page} target="_blank" rel="noreferrer">
            {t.wiki}: {d.title} ↗
          </a>
        )}
      </div>
      {createPortal(
        <AnimatePresence>
          {zoom && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoom(null)}
            >
              <motion.img
                src={zoom}
                alt=""
                referrerPolicy="no-referrer"
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
