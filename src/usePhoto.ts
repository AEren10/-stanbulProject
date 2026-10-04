import { useEffect, useState } from 'react'
import type { Place } from './data/types'

export interface Photo {
  thumb: string
  big: string
  page?: string
}

const CACHE_KEY = 'ist-photo-v1'
const mem = new Map<string, Photo | null>()
const pending = new Map<string, Promise<Photo | null>>()

try {
  const raw = localStorage.getItem(CACHE_KEY)
  if (raw) {
    const obj = JSON.parse(raw) as Record<string, Photo | null>
    for (const [k, v] of Object.entries(obj)) if (v) mem.set(k, v)
  }
} catch {
  /* ignore */
}

function persist() {
  try {
    const obj: Record<string, Photo> = {}
    mem.forEach((v, k) => {
      if (v) obj[k] = v
    })
    localStorage.setItem(CACHE_KEY, JSON.stringify(obj))
  } catch {
    /* ignore */
  }
}

interface Summary {
  thumbnail?: { source: string; width: number }
  originalimage?: { source: string; width: number }
  content_urls?: { desktop?: { page?: string } }
}

async function fetchSummary(host: string, title: string): Promise<Photo | null> {
  try {
    const res = await fetch(
      `https://${host}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
    )
    if (!res.ok) return null
    const j = (await res.json()) as Summary
    if (!j.thumbnail?.source) return null
    const big =
      j.originalimage && j.originalimage.width <= 3200 ? j.originalimage.source : j.thumbnail.source
    return { thumb: j.thumbnail.source, big, page: j.content_urls?.desktop?.page }
  } catch {
    return null
  }
}

export function loadPhoto(p: Place): Promise<Photo | null> {
  if (mem.has(p.id)) return Promise.resolve(mem.get(p.id) ?? null)
  const existing = pending.get(p.id)
  if (existing) return existing
  const job = (async () => {
    let photo: Photo | null = null
    if (p.wiki) photo = await fetchSummary('en', p.wiki)
    if (!photo && p.wtr) photo = await fetchSummary('tr', p.wtr)
    mem.set(p.id, photo)
    if (photo) persist()
    pending.delete(p.id)
    return photo
  })()
  pending.set(p.id, job)
  return job
}

export function usePhoto(place: Place): Photo | null {
  const [photo, setPhoto] = useState<Photo | null>(() => mem.get(place.id) ?? null)
  useEffect(() => {
    let alive = true
    loadPhoto(place).then((p) => {
      if (alive) setPhoto(p)
    })
    return () => {
      alive = false
    }
  }, [place])
  return photo
}

// ---------- richer Wikipedia details (extract + gallery) ----------
export interface WikiDetails {
  title: string
  extract: string
  page?: string
  gallery: string[]
}

const detailCache = new Map<string, WikiDetails | null>()

interface SummaryFull extends Summary {
  extract?: string
  type?: string
  titles?: { canonical?: string }
}

interface MediaItem {
  type: string
  title?: string
  showInGallery?: boolean
  srcset?: { src: string; scale: string }[]
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

async function detailsFrom(host: string, title: string): Promise<WikiDetails | null> {
  const base = `https://${host}.wikipedia.org/api/rest_v1/page`
  const sum = await fetchJson<SummaryFull>(`${base}/summary/${encodeURIComponent(title)}`)
  if (!sum || !sum.extract || sum.type === 'disambiguation') return null
  const canonical = sum.titles?.canonical ?? title
  const media = await fetchJson<{ items?: MediaItem[] }>(`${base}/media-list/${encodeURIComponent(canonical)}`)
  const gallery = (media?.items ?? [])
    .filter((m) => m.type === 'image' && m.showInGallery !== false && m.srcset?.length && !/\.svg$/i.test(m.title ?? ''))
    .map((m) => {
      const src = m.srcset![m.srcset!.length - 1].src
      return src.startsWith('//') ? `https:${src}` : src
    })
    .slice(0, 8)
  return { title: canonical.replace(/_/g, ' '), extract: sum.extract, page: sum.content_urls?.desktop?.page, gallery }
}

export function useWikiDetails(place: Place, lang: 'tr' | 'en'): WikiDetails | null | undefined {
  const key = `${lang}:${place.id}`
  const [state, setState] = useState<{ key: string; val: WikiDetails | null | undefined }>(() => ({
    key,
    val: detailCache.get(key),
  }))
  useEffect(() => {
    if (detailCache.has(key)) return
    let alive = true
    ;(async () => {
      let d: WikiDetails | null = null
      if (lang === 'tr') {
        d = await detailsFrom('tr', place.wtr ?? place.tr)
        if (!d && place.wiki) d = await detailsFrom('en', place.wiki)
      } else {
        if (place.wiki) d = await detailsFrom('en', place.wiki)
        if (!d) d = await detailsFrom('en', place.en)
      }
      detailCache.set(key, d)
      if (alive) setState({ key, val: d })
    })()
    return () => {
      alive = false
    }
  }, [key, lang, place])
  return state.key === key ? state.val : detailCache.get(key)
}
