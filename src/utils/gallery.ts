import { GalleryItem, GalleryData } from '../types'

export const loadGalleryData = async (): Promise<GalleryData> => {
  try {
    // Import all data.json files from the public gallery folders
    const galleryModules = import.meta.glob('/public/images/gallery/*/data.json', { eager: true })
    
    const items: GalleryItem[] = []
    
    // Get all paths and sort them by folder number
    const sortedPaths = Object.keys(galleryModules).sort((a, b) => {
      const folderA = a.split('/')[4] // Get folder name (e.g., '001')
      const folderB = b.split('/')[4]
      return folderA.localeCompare(folderB)
    })
    
    // Process each module in order
    for (const path of sortedPaths) {
      const data = galleryModules[path] as GalleryItem
      items.push(data)
    }

    return {
      items,
      hasMore: false // Since we're loading all items at once
    }
  } catch (error) {
    console.error('Error loading gallery data:', error)
    return {
      items: [],
      hasMore: false
    }
  }
}

export const getGalleryItemById = async (id: string): Promise<GalleryItem | null> => {
  const data = await loadGalleryData()
  return data.items.find(item => item.id === id) || null
}
