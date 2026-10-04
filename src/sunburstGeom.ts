import { CATEGORIES } from './data/categories'
import { PLACES } from './data/places'

export const TAU = Math.PI * 2
const TOTAL = PLACES.length
let acc = 0
export const GROUPS = CATEGORIES.map((cat) => {
  const places = PLACES.filter((p) => p.cat === cat.id)
  const span = (places.length / TOTAL) * TAU
  const a0 = acc
  acc += span
  return { cat, places, span, a0, a1: acc }
})

/** Center angle (degrees, clockwise from top) of every place slice. */
export const PLACE_ANGLE: Record<string, number> = {}
/** Places in ring order. */
export const RING_ORDER: string[] = []
for (const g of GROUPS) {
  g.places.forEach((p, i) => {
    PLACE_ANGLE[p.id] = ((g.a0 + (g.span * (i + 0.5)) / g.places.length) * 180) / Math.PI
    RING_ORDER.push(p.id)
  })
}
export const SLICE_DEG = 360 / TOTAL
