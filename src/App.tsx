import { AnimatePresence, motion } from 'motion/react'
import { AppProvider } from './AppProvider'
import { Confetti } from './components/Confetti'
import { Explore } from './components/Explore'
import { Blobs, ClickSparkles, ScrollProgress } from './components/fx'
import { Home } from './components/Home'
import { MapPage } from './components/MapPage'
import { Nav } from './components/Nav'
import { Passport } from './components/Passport'
import { PlaceModal } from './components/PlaceModal'
import { Tours } from './components/Tours'
import { PLACES } from './data/places'
import { useApp } from './useApp'

function Ticker() {
  const { lang, t } = useApp()
  const items = PLACES.map((p) => `${p.emoji} ${lang === 'tr' ? p.tr : p.en}`)
  const line = [t.ticker, ...items].join('   ✦   ')
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        <span>{line}   ✦   </span>
        <span>{line}   ✦   </span>
      </div>
    </div>
  )
}

function Shell() {
  const { view, t, toast } = useApp()
  return (
    <div className="app">
      <Blobs />
      <ScrollProgress />
      <Nav />
      <Ticker />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 40, scale: 0.98, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            onAnimationStart={() => window.scrollTo({ top: 0 })}
          >
            {view === 'wheel' && <Home />}
            {view === 'explore' && <Explore />}
            {view === 'map' && <MapPage />}
            {view === 'tours' && <Tours />}
            {view === 'passport' && <Passport />}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="foot">{t.footer}</footer>
      <PlaceModal />
      <Confetti />
      <ClickSparkles />
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ y: -80, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            🏅 {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
