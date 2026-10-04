import { AnimatePresence, motion } from 'motion/react'
import { useApp } from '../useApp'

export function FavButton({ id, className }: { id: string; className?: string }) {
  const { progress, toggleFav, t } = useApp()
  const on = progress.favs.includes(id)
  return (
    <motion.span
      role="button"
      tabIndex={0}
      aria-pressed={on}
      aria-label={t.favs}
      className={`fav ${on ? 'on' : ''} ${className ?? ''}`}
      whileTap={{ scale: 0.7 }}
      whileHover={{ scale: 1.15 }}
      onClick={(e) => {
        e.stopPropagation()
        toggleFav(id)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          toggleFav(id)
        }
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={on ? 'on' : 'off'}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: [0, 1.5, 1], rotate: 0 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.35 }}
        >
          {on ? '❤️' : '🤍'}
        </motion.span>
      </AnimatePresence>
      {on && (
        <motion.span className="fav-burst" initial={{ scale: 0.4, opacity: 1 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 0.5 }} />
      )}
    </motion.span>
  )
}
