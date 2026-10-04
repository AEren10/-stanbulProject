import type { Category, Tag } from './types'

export const CATEGORIES: Category[] = [
  { id: 'tarih', color: '#E0526F', emoji: '🕌', tr: 'Tarihi Yarımada', en: 'Historic Peninsula' },
  { id: 'bogaz', color: '#F0A030', emoji: '⚓', tr: 'Boğaz ve Sahiller', en: 'Bosphorus & Shores' },
  { id: 'muze', color: '#EE6B4B', emoji: '🎨', tr: 'Müzeler ve Sanat', en: 'Museums & Art' },
  { id: 'semt', color: '#D45A97', emoji: '🏘️', tr: 'Semtler ve Sokaklar', en: 'Quarters & Streets' },
  { id: 'yeme', color: '#2FB5C4', emoji: '🥙', tr: 'Yeme ve İçme', en: 'Eat & Drink' },
  { id: 'manzara', color: '#2FAE6E', emoji: '🌅', tr: 'Manzara ve Dinlenme', en: 'Views & Chill' },
  { id: 'adalar', color: '#4A7BE0', emoji: '⛴️', tr: 'Adalar ve Kaçamaklar', en: 'Islands & Escapes' },
  { id: 'alisveris', color: '#8456D0', emoji: '🛍️', tr: 'Alışveriş ve Pazarlar', en: 'Shops & Markets' },
]

export const CAT_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<
  Category['id'],
  Category
>

export const TAGS: { id: Tag; emoji: string; tr: string; en: string }[] = [
  { id: 'walk', emoji: '🚶', tr: 'Yürüyüş', en: 'Walk' },
  { id: 'culture', emoji: '🏛️', tr: 'Kültür', en: 'Culture' },
  { id: 'food', emoji: '🍢', tr: 'Yemek', en: 'Food' },
  { id: 'view', emoji: '🌇', tr: 'Manzara', en: 'Views' },
  { id: 'photo', emoji: '📸', tr: 'Fotoğraf', en: 'Photo' },
  { id: 'relax', emoji: '☕', tr: 'Dinlenme', en: 'Relax' },
  { id: 'shop', emoji: '🛍️', tr: 'Alışveriş', en: 'Shopping' },
  { id: 'sea', emoji: '🌊', tr: 'Deniz', en: 'Sea' },
]
