export interface LocalizedText {
  en: string
  he: string
}

export interface GalleryItem {
  id: string
  title: LocalizedText
  description: LocalizedText
  images: string[]
  date: string
  tags: string[]
  price?: string
}

export interface GalleryData {
  items: GalleryItem[]
  hasMore: boolean
}

export type Language = 'en' | 'he'
