import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AppContext, type AppCtx, type View } from './appContext'
import { DICT } from './i18n'
import type { Lang, Place } from './data/types'
import { badgeName, calcBadges, type LatLng, type Progress } from './utils'

const KEY = 'ist-progress-v1'
const LANG_KEY = 'ist-lang'

const EMPTY: Progress = { visited: [], toursDone: [], spins: 0 }

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const p = JSON.parse(raw) as Progress
      return {
        visited: Array.isArray(p.visited) ? p.visited : [],
        toursDone: Array.isArray(p.toursDone) ? p.toursDone : [],
        spins: typeof p.spins === 'number' ? p.spins : 0,
      }
    }
  } catch {
    /* ignore */
  }
  return EMPTY
}

function loadLang(): Lang {
  try {
    const l = localStorage.getItem(LANG_KEY)
    if (l === 'tr' || l === 'en') return l
  } catch {
    /* ignore */
  }
  return navigator.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(loadLang)
  const [view, setView] = useState<View>('wheel')
  const [progress, setProgress] = useState<Progress>(loadProgress)
  const [userPos, setUserPos] = useState<LatLng | null>(null)
  const [locStatus, setLocStatus] = useState<AppCtx['locStatus']>('idle')
  const [openPlace, setOpenPlace] = useState<Place | null>(null)
  const [mapFocus, setMapFocus] = useState<string | null>(null)
  const [celebrate, setCelebrate] = useState(0)
  const [activeTourId, setActiveTourId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const prevBadges = useRef<Set<string> | null>(null)

  const t = DICT[lang]

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress))
    } catch {
      /* ignore */
    }
  }, [progress])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = DICT[lang].appName
  }, [lang])

  // announce newly earned badges
  useEffect(() => {
    const earned = new Set(calcBadges(progress).filter((b) => b.earned).map((b) => b.id))
    if (prevBadges.current) {
      for (const id of earned) {
        if (!prevBadges.current.has(id)) {
          setToast(`${DICT[lang].newBadge} ${badgeName(DICT[lang], id)}`)
          setCelebrate((c) => c + 1)
        }
      }
    }
    prevBadges.current = earned
  }, [progress, lang])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(id)
  }, [toast])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(LANG_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const isVisited = useCallback((id: string) => progress.visited.includes(id), [progress.visited])

  const toggleVisited = useCallback((id: string) => {
    setProgress((p) => ({
      ...p,
      visited: p.visited.includes(id) ? p.visited.filter((x) => x !== id) : [...p.visited, id],
    }))
  }, [])

  const markVisited = useCallback((id: string) => {
    setProgress((p) => (p.visited.includes(id) ? p : { ...p, visited: [...p.visited, id] }))
  }, [])

  const finishTour = useCallback((id: string) => {
    setProgress((p) => (p.toursDone.includes(id) ? p : { ...p, toursDone: [...p.toursDone, id] }))
    setCelebrate((c) => c + 1)
  }, [])

  const addSpin = useCallback(() => setProgress((p) => ({ ...p, spins: p.spins + 1 })), [])

  const resetProgress = useCallback(() => {
    prevBadges.current = new Set()
    setProgress(EMPTY)
  }, [])

  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setLocStatus('denied')
      return
    }
    setLocStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocStatus('ok')
      },
      () => setLocStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    )
  }, [])

  const clearLocation = useCallback(() => {
    setUserPos(null)
    setLocStatus('idle')
  }, [])

  const showOnMap = useCallback((p: Place) => {
    setMapFocus(p.id)
    setOpenPlace(null)
    setView('map')
  }, [])

  const fireCelebrate = useCallback(() => setCelebrate((c) => c + 1), [])

  const value = useMemo<AppCtx>(
    () => ({
      lang,
      setLang,
      t,
      view,
      setView,
      progress,
      isVisited,
      toggleVisited,
      markVisited,
      finishTour,
      addSpin,
      resetProgress,
      userPos,
      locStatus,
      requestLocation,
      clearLocation,
      openPlace,
      setOpenPlace,
      mapFocus,
      showOnMap,
      celebrate,
      fireCelebrate,
      activeTourId,
      setActiveTourId,
      toast,
      setToast,
    }),
    [
      lang, setLang, t, view, progress, isVisited, toggleVisited, markVisited, finishTour, addSpin,
      resetProgress, userPos, locStatus, requestLocation, clearLocation, openPlace, mapFocus,
      showOnMap, celebrate, fireCelebrate, activeTourId, toast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
