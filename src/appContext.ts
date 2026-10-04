import { createContext } from 'react'
import type { Dict } from './i18n'
import type { CatId, Lang, Place } from './data/types'
import type { LatLng, Progress } from './utils'

export type View = 'wheel' | 'explore' | 'map' | 'tours' | 'passport'

export interface AppCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
  view: View
  setView: (v: View) => void
  progress: Progress
  isVisited: (id: string) => boolean
  toggleVisited: (id: string) => void
  markVisited: (id: string) => void
  finishTour: (id: string) => void
  addSpin: () => void
  resetProgress: () => void
  userPos: LatLng | null
  locStatus: 'idle' | 'loading' | 'ok' | 'denied'
  requestLocation: () => void
  clearLocation: () => void
  openPlace: Place | null
  setOpenPlace: (p: Place | null) => void
  mapFocus: string | null
  showOnMap: (p: Place) => void
  /** transient celebration trigger */
  celebrate: number
  fireCelebrate: () => void
  /** tour to open in tours view */
  activeTourId: string | null
  setActiveTourId: (id: string | null) => void
  /** newly earned badge ids to toast */
  toast: string | null
  /** open explore pre-filtered by a category */
  exploreCat: CatId | 'all'
  openCategory: (c: CatId | 'all') => void
  toggleFav: (id: string) => void
  claimQuest: (key: string) => void
  setToast: (s: string | null) => void
}

export const AppContext = createContext<AppCtx | null>(null)
