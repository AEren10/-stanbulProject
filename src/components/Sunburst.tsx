import { GROUPS } from '../sunburstGeom'
import type { Place } from '../data/types'

function pt(cx: number, cy: number, r: number, a: number): [number, number] {
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)]
}

function wedge(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number): string {
  const [x0, y0] = pt(cx, cy, r1, a0)
  const [x1, y1] = pt(cx, cy, r1, a1)
  const [x2, y2] = pt(cx, cy, r0, a1)
  const [x3, y3] = pt(cx, cy, r0, a0)
  const large = a1 - a0 > Math.PI ? 1 : 0
  return `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${large} 0 ${x3} ${y3}Z`
}

const C = 300

interface Props {
  visited?: string[]
  /** show emojis on category ring */
  labels?: boolean
  className?: string
  onPlace?: (p: Place) => void
  onHover?: (p: Place | null) => void
  activeId?: string | null
}

/** Three-ring sunburst of categories and places, inspired by the guide poster. */
export function Sunburst({ visited, labels, className, onPlace, onHover, activeId }: Props) {
  const showProgress = visited !== undefined

  return (
    <svg viewBox="0 0 600 600" className={className} role="img" aria-hidden={!onPlace}>
      {GROUPS.map(({ cat, places, span, a0, a1 }) => {
        const mid = (a0 + a1) / 2
        const [lx, ly] = pt(C, C, 112, mid)
        return (
          <g key={cat.id}>
            <path
              d={wedge(C, C, 78, 146, a0 + 0.004, a1 - 0.004)}
              fill={cat.color}
              stroke="#2a1a2e"
              strokeWidth="2"
            />
            {labels && (
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fontSize="26">
                {cat.emoji}
              </text>
            )}
            {places.map((p, i) => {
              const pa0 = a0 + (span * i) / places.length
              const pa1 = a0 + (span * (i + 1)) / places.length
              const done = visited?.includes(p.id)
              return (
                <path
                  key={p.id}
                  d={wedge(C, C, 152, 292, pa0 + 0.002, pa1 - 0.002)}
                  fill={cat.color}
                  className={onPlace ? 'sb-slice' : undefined}
                  fillOpacity={showProgress ? (done ? 0.95 : 0.14) : activeId === p.id ? 1 : onPlace ? 0.55 : 0.32}
                  stroke="#2a1a2e"
                  strokeOpacity={showProgress && !done ? 0.25 : 0.7}
                  strokeWidth="1"
                  style={onPlace ? { cursor: 'pointer' } : undefined}
                  onClick={onPlace ? () => onPlace(p) : undefined}
                  onMouseEnter={onHover ? () => onHover(p) : undefined}
                  onMouseLeave={onHover ? () => onHover(null) : undefined}
                >
                  <title>{p.tr}</title>
                </path>
              )
            })}
          </g>
        )
      })}
      <circle cx={C} cy={C} r="76" fill="#fff8ec" stroke="#2a1a2e" strokeWidth="3" />
    </svg>
  )
}
