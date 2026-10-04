import { useSpring } from 'motion/react'
import type React from 'react'

/** Card wrapper that tilts in 3D toward the pointer. */
export function useTilt(max = 10) {
  const rx = useSpring(0, { stiffness: 220, damping: 18 })
  const ry = useSpring(0, { stiffness: 220, damping: 18 })
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }
  const onPointerLeave = () => {
    rx.set(0)
    ry.set(0)
  }
  return { style: { rotateX: rx, rotateY: ry, transformPerspective: 800 }, onPointerMove, onPointerLeave }
}
