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
