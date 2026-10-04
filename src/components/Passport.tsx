import { motion } from 'motion/react'
import { CAT_BY_ID } from '../data/categories'
import { PLACE_BY_ID, PLACES } from '../data/places'
import { TOURS } from '../data/tours'
import { useApp } from '../useApp'
import { BounceTitle, Counter } from './fx'
import { badgeName, calcBadges, calcLevel, calcXp, gmapsRoute } from '../utils'
import { Sunburst } from './Sunburst'

export function Passport() {
  const { lang, t, progress, resetProgress, setOpenPlace, setView } = useApp()
  const xp = calcXp(progress)
  const { level, cur, next } = calcLevel(xp)
  const pct = next ? ((xp - cur) / (next - cur)) * 100 : 100
  const badges = calcBadges(progress)
  const earned = badges.filter((b) => b.earned).length
  const visitedPlaces = progress.visited.map((id) => PLACE_BY_ID[id]).filter(Boolean)

  return (
    <div className="page">
      <header className="page-head">
        <BounceTitle text={t.passport_title} />
        <p>{t.passport_sub}</p>
      </header>

      <div className="pass-top">
        <motion.div
          className="pass-ring"
          initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 14 }}
        >
          <Sunburst visited={progress.visited} labels className="pass-sun" />
          <div className="pass-center">
            <b>{progress.visited.length}</b>
            <small>/ {PLACES.length}</small>
          </div>
        </motion.div>

        <div className="pass-stats">
          <div className="level-card">
            <span className="level-name">
              {t.level} {level + 1} · {t.levels[level]}
            </span>
            <div className="bar">
              <motion.i initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
            </div>
            <small>
              {xp} {t.xp}
              {next ? ` / ${next}` : ' · MAX'}
            </small>
          </div>
          <div className="stat-row">
            <div className="stat"><b><Counter value={progress.visited.length} /></b><small>{t.visitedCount}</small></div>
            <div className="stat"><b>{progress.toursDone.length}/{TOURS.length}</b><small>{t.toursDone}</small></div>
            <div className="stat"><b><Counter value={progress.spins} /></b><small>{t.spins}</small></div>
          </div>
        </div>
      </div>

      <h3 className="section-title">
        {t.badges} <span className="muted">{earned}/{badges.length}</span>
      </h3>
      <div className="badges">
        {badges.map((b, i) => (
          <motion.div
            key={b.id}
            className={`badge ${b.earned ? 'on' : ''}`}
            style={{ ['--c' as string]: b.color }}
            initial={{ opacity: 0, scale: 0.4, rotateY: 180 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 9) * 0.05, type: 'spring', stiffness: 200, damping: 16 }}
            whileHover={{ rotate: b.earned ? [0, -6, 6, 0] : 0 }}
            title={
              b.catId
                ? `${t.badgeDescs.cat} (${lang === 'tr' ? CAT_BY_ID[b.catId].tr : CAT_BY_ID[b.catId].en})`
                : (t.badgeDescs as Record<string, string>)[b.id]
            }
          >
            <span className="badge-emoji">{b.earned ? b.emoji : '🔒'}</span>
            <small>{badgeName(t, b.id)}</small>
          </motion.div>
        ))}
      </div>

      <h3 className="section-title">❤️ {t.favsMine}</h3>
      {progress.favs.length === 0 ? (
        <p className="muted">{t.noFavs}</p>
      ) : (
        <div className="stamps">
          {progress.favs.map((id) => PLACE_BY_ID[id]).filter(Boolean).map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              className="stamp-card fav-card"
              style={{ ['--c' as string]: CAT_BY_ID[p.cat].color }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 14, delay: Math.min(i, 10) * 0.04 }}
              whileHover={{ scale: 1.08, rotate: -3 }}
              onClick={() => setOpenPlace(p)}
            >
              <span>{p.emoji}</span>
              <small>{lang === 'tr' ? p.tr : p.en}</small>
            </motion.button>
          ))}
        </div>
      )}

      {progress.favs.length >= 2 && (
        <a
          className="btn fav-route"
          href={gmapsRoute(progress.favs.slice(0, 10).map((id) => PLACE_BY_ID[id]).filter(Boolean))}
          target="_blank"
          rel="noreferrer"
        >
          🧭 {t.favRoute}
        </a>
      )}

      <h3 className="section-title">{t.stamps}</h3>
      {visitedPlaces.length === 0 ? (
        <div className="empty">
          <div className="empty-emoji">🎡</div>
          <p>{t.noVisits}</p>
          <button type="button" className="cta" onClick={() => setView('wheel')}>
            {t.nav_wheel}
          </button>
        </div>
      ) : (
        <div className="stamps">
          {visitedPlaces.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              className="stamp-card"
              style={{ ['--c' as string]: CAT_BY_ID[p.cat].color, rotate: `${((i * 37) % 9) - 4}deg` }}
              initial={{ scale: 2, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: Math.min(i, 10) * 0.04 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => setOpenPlace(p)}
            >
              <span>{p.emoji}</span>
              <small>{lang === 'tr' ? p.tr : p.en}</small>
            </motion.button>
          ))}
        </div>
      )}

      <button
        type="button"
        className="link danger"
        onClick={() => {
          if (confirm(t.resetConfirm)) resetProgress()
        }}
      >
        {t.reset}
      </button>
    </div>
  )
}
