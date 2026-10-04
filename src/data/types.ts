export type Lang = 'tr' | 'en'

export type CatId =
  | 'tarih'
  | 'bogaz'
  | 'muze'
  | 'semt'
  | 'yeme'
  | 'manzara'
  | 'adalar'
  | 'alisveris'

export type Tag =
  | 'walk'
  | 'culture'
  | 'food'
  | 'view'
  | 'photo'
  | 'relax'
  | 'shop'
  | 'sea'

export interface Category {
  id: CatId
  color: string
  emoji: string
  tr: string
  en: string
}

export interface Place {
  id: string
  cat: CatId
  emoji: string
  tr: string
  en: string
  dtr: string
  den: string
  lat: number
  lng: number
  tags: Tag[]
  /** suggested time in minutes */
  mins: number
  /** English Wikipedia title used to fetch a photo */
  wiki?: string
  /** Turkish Wikipedia title (fallback) */
  wtr?: string
}

export interface TourStep {
  id: string
  tr: string
  en: string
}

export type TourTheme = 'history' | 'food' | 'nature' | 'art' | 'sea' | 'night'

export interface Tour {
  id: string
  theme: TourTheme
  emoji: string
  color: string
  tr: string
  en: string
  dtr: string
  den: string
  steps: TourStep[]
  /** walking / transit hint */
  modeTr: string
  modeEn: string
}
