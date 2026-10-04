import { motion } from 'motion/react'
import { useState } from 'react'
import { useApp } from '../useApp'

const COLORS = ['#E0526F', '#F0A030', '#EE6B4B', '#D45A97', '#2FB5C4', '#2FAE6E', '#4A7BE0', '#8456D0']
const SHAPES = ['🎉', '✨', '⭐', '🎈', '💫']

function Burst() {
  const [bits] = useState(() =>
      Array.from({ length: 56 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2
        const dist = 160 + Math.random() * 380
        return {
          i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 120,
          rot: (Math.random() - 0.5) * 900,
          color: COLORS[i % COLORS.length],
          emoji: i % 9 === 0 ? SHAPES[i % SHAPES.length] : null,
          w: 8 + Math.random() * 8,
          delay: Math.random() * 0.12,
        }
      }),
  )
  return (
    <div className="confetti" aria-hidden>
      {bits.map((b) => (
        <motion.span
          key={b.i}
          className="confetti-bit"
          style={{ background: b.emoji ? 'transparent' : b.color, width: b.w, height: b.emoji ? 'auto' : b.w * 0.6 }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 520], opacity: [1, 1, 0], scale: 1, rotate: b.rot }}
          transition={{ duration: 2.1, delay: b.delay, ease: 'easeOut', times: [0, 0.4, 1] }}
        >
          {b.emoji}
        </motion.span>
      ))}
    </div>
  )
}

export function Confetti() {
  const { celebrate } = useApp()
  if (!celebrate) return null
  return <Burst key={celebrate} />
}
