import { motion } from 'motion/react'
import { useMemo } from 'react'
import { CAT_BY_ID } from '../data/categories'
import { useApp } from '../useApp'
import { dailyQuest, todayKey } from '../utils'
import { PlaceImage } from './PlaceImage'

export function DailyQuest() {
  const { lang, t, isVisited, progress, claimQuest, setOpenPlace } = useApp()
  const key = todayKey()
  const places = useMemo(() => dailyQuest(key), [key])
  const done = places.filter((p) => isVisited(p.id)).length
  const claimed = progress.quests.includes(key)
  const ready = done === places.length && !claimed

  return (
    <motion.section
      className="home-section quest"
      initial={{ opacity: 0, y: 60, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
    >
      <div className="quest-head">
        <motion.span className="quest-emoji" animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2.6 }}>
          🎯
        </motion.span>
        <div>
          <h2>{t.quest_title}</h2>
          <p>{claimed ? t.quest_done : t.quest_sub}</p>
        </div>
        <div className="quest-progress">
          <svg viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" className="qp-bg" />
            <motion.circle
              cx="22"
              cy="22"
              r="18"
              className="qp-fg"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: done / places.length }}
              transition={{ type: 'spring', stiffness: 60, damping: 14 }}
            />
          </svg>
          <b>
            {done}/{places.length}
          </b>
        </div>
      </div>
      <div className="quest-items">
        {places.map((p, i) => {
          const v = isVisited(p.id)
          return (
            <motion.button
              key={p.id}
              type="button"
              className={`quest-item ${v ? 'done' : ''}`}
              style={{ ['--c' as string]: CAT_BY_ID[p.cat].color }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 16 }}
              whileHover={{ y: -5, rotate: i % 2 ? 1.5 : -1.5 }}
              onClick={() => setOpenPlace(p)}
            >
              <PlaceImage place={p} className="quest-img" />
              <span>
                <b>{lang === 'tr' ? p.tr : p.en}</b>
                <small>{CAT_BY_ID[p.cat].emoji} {lang === 'tr' ? CAT_BY_ID[p.cat].tr : CAT_BY_ID[p.cat].en}</small>
              </span>
              <span className="quest-check">{v ? '✓' : i + 1}</span>
            </motion.button>
          )
        })}
      </div>
      {ready && (
        <motion.button
          type="button"
          className="mega-cta small"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          onClick={() => claimQuest(key)}
        >
          🎁 {t.quest_claim}
        </motion.button>
      )}
    </motion.section>
  )
}
