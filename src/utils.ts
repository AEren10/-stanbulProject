import { CATEGORIES } from './data/categories'
import { TOURS } from './data/tours'
import type { Dict } from './i18n'
import type { CatId, Place } from './data/types'
import { PLACE_BY_ID } from './data/places'

export interface LatLng {
  lat: number
  lng: number
}

export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}

export function fmtDist(km: number, t: Dict): string {
  if (km < 1) return `${Math.max(10, Math.round(km * 100) * 10)} ${t.m}`
  return `${km.toFixed(km < 10 ? 1 : 0)} ${t.km}`
}

export function fmtMins(mins: number, t: Dict): string {
  if (mins < 60) return `${mins} ${t.min}`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `${h} ${t.hour} ${m} ${t.min}` : `${h} ${t.hour}`
}

export function gmapsPlace(p: LatLng): string {
  return `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`
}

export function gmapsRoute(points: LatLng[], mode: 'walking' | 'transit' = 'walking'): string {
  const f = (p: LatLng) => `${p.lat},${p.lng}`
  const origin = points[0]
  const dest = points[points.length - 1]
  const way = points.slice(1, -1).map(f).join('|')
  return `https://www.google.com/maps/dir/?api=1&origin=${f(origin)}&destination=${f(dest)}${
    way ? `&waypoints=${encodeURIComponent(way)}` : ''
  }&travelmode=${mode}`
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function tourPlaces(tourId: string): Place[] {
  const t = TOURS.find((x) => x.id === tourId)
  return t ? t.steps.map((s) => PLACE_BY_ID[s.id]).filter(Boolean) : []
}

// ---------- gamification ----------
export interface Progress {
  visited: string[]
  toursDone: string[]
  spins: number
  favs: string[]
  /** dates (YYYY-MM-DD) whose daily quest reward was claimed */
  quests: string[]
}

export const XP_QUEST = 30

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Three deterministic places for today's quest, from different categories. */
export function dailyQuest(key = todayKey()): Place[] {
  let h = 0
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0
    return h / 2 ** 32
  }
  const all = Object.values(PLACE_BY_ID)
  const picked: Place[] = []
  const cats = new Set<string>()
  let guard = 0
  while (picked.length < 3 && guard++ < 500) {
    const p = all[Math.floor(rand() * all.length)]
    if (!cats.has(p.cat) && p.mins <= 120) {
      cats.add(p.cat)
      picked.push(p)
    }
  }
  return picked
}

export const XP_PLACE = 10
export const XP_TOUR = 50
export const XP_SPIN = 1
export const LEVEL_STEPS = [0, 40, 120, 260, 450, 700]

export function calcXp(p: Progress): number {
  return (
    p.visited.length * XP_PLACE + p.toursDone.length * XP_TOUR + p.spins * XP_SPIN + p.quests.length * XP_QUEST
  )
}

export function calcLevel(xp: number): { level: number; cur: number; next: number | null } {
  let level = 0
  for (let i = 0; i < LEVEL_STEPS.length; i++) if (xp >= LEVEL_STEPS[i]) level = i
  const cur = LEVEL_STEPS[level]
  const next = level + 1 < LEVEL_STEPS.length ? LEVEL_STEPS[level + 1] : null
  return { level, cur, next }
}

export interface Badge {
  id: string
  emoji: string
  color: string
  catId?: CatId
  earned: boolean
}

export function calcBadges(p: Progress): Badge[] {
  const n = p.visited.length
  const perCat: Record<string, number> = {}
  for (const id of p.visited) {
    const pl = PLACE_BY_ID[id]
    if (pl) perCat[pl.cat] = (perCat[pl.cat] || 0) + 1
  }
  const base: Badge[] = [
    { id: 'first', emoji: '👣', color: '#F0A030', earned: n >= 1 },
    { id: 'five', emoji: '🧭', color: '#EE6B4B', earned: n >= 5 },
    { id: 'ten', emoji: '🐺', color: '#D45A97', earned: n >= 10 },
    { id: 'twenty', emoji: '🥙', color: '#2FB5C4', earned: n >= 20 },
    { id: 'forty', emoji: '👑', color: '#8456D0', earned: n >= 40 },
    { id: 'tour1', emoji: '🗺️', color: '#4A7BE0', earned: p.toursDone.length >= 1 },
    { id: 'tourAll', emoji: '🏆', color: '#E0526F', earned: p.toursDone.length >= TOURS.length },
    { id: 'spin10', emoji: '🎡', color: '#2FAE6E', earned: p.spins >= 10 },
    { id: 'quest1', emoji: '🎯', color: '#EE6B4B', earned: p.quests.length >= 1 },
    { id: 'fav5', emoji: '💖', color: '#D45A97', earned: p.favs.length >= 5 },
  ]
  const cats: Badge[] = CATEGORIES.map((c) => ({
    id: c.id,
    emoji: c.emoji,
    color: c.color,
    catId: c.id,
    earned: (perCat[c.id] || 0) >= 3,
  }))
  return [...base, ...cats]
}

export function badgeName(t: Dict, id: string): string {
  return (t.badgeNames as Record<string, string>)[id] ?? id
}
