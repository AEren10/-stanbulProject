import { motion } from 'motion/react'
import type { View } from '../appContext'
import { useApp } from '../useApp'
import { calcLevel, calcXp } from '../utils'

const ITEMS: { id: View; emoji: string; key: 'nav_wheel' | 'nav_explore' | 'nav_map' | 'nav_tours' | 'nav_passport' }[] = [
  { id: 'wheel', emoji: '🎡', key: 'nav_wheel' },
  { id: 'explore', emoji: '🧭', key: 'nav_explore' },
  { id: 'map', emoji: '🗺️', key: 'nav_map' },
  { id: 'tours', emoji: '🚶', key: 'nav_tours' },
  { id: 'passport', emoji: '🎫', key: 'nav_passport' },
]

export function Nav() {
  const { t, view, setView, lang, setLang, progress } = useApp()
  const xp = calcXp(progress)
  const { level } = calcLevel(xp)

  const tabs = (cls: string) => (
    <nav className={cls}>
      {ITEMS.map((it) => (
        <button
          key={it.id}
          type="button"
          className={view === it.id ? 'on' : ''}
          onClick={() => setView(it.id)}
        >
          {view === it.id && (
            <motion.span layoutId={`pill-${cls}`} className="pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
          )}
          <span className="tab-emoji">{it.emoji}</span>
          <span className="tab-label">{t[it.key]}</span>
        </button>
      ))}
    </nav>
  )

  return (
    <>
      <header className="top">
        <button type="button" className="logo" onClick={() => setView('wheel')}>
          <motion.span
            className="logo-mark"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
          >
            ✺
          </motion.span>
          <span>
            <b>İstanbul</b>
            <small>Gezi Rehberi</small>
          </span>
        </button>
        {tabs('tabs-top')}
        <div className="top-right">
          <button type="button" className="xp-chip" onClick={() => setView('passport')} title={t.passport_title}>
            ⭐ {t.level} {level + 1} · {xp} {t.xp}
          </button>
          <button type="button" className="lang" onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}>
            {t.lang}
          </button>
        </div>
      </header>
      {tabs('tabs-bottom')}
    </>
  )
}
