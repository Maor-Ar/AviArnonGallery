import { collection, getDocs, query, limit, startAfter, orderBy, doc, setDoc, deleteDoc, where } from 'firebase/firestore'
import { FirebaseError } from '@firebase/app'
import { db } from '../config/firebase'
import { GalleryItem, GalleryData } from '../types'
import { loadGalleryData } from '../utils/gallery'

const ITEMS_PER_PAGE = 12
const GALLERY_COLLECTION = 'galleryItems' // Fixed collection name to match Firestore

// Cache for gallery items
let galleryCache: GalleryItem[] = []
let lastVisibleDoc: any = null

export const galleryService = {
  getGalleryItems: async (page: number = 1): Promise<GalleryData> => {
    try {
      // For first page, try to get fresh data from Firebase
      if (page === 1) {
        console.log('Fetching first page from Firebase...')
        console.log('Using collection:', GALLERY_COLLECTION)
        const collectionRef = collection(db, GALLERY_COLLECTION)
        console.log('Collection reference:', collectionRef)
        
        const q = query(
          collectionRef,
          orderBy('id', 'asc'),
          limit(ITEMS_PER_PAGE)
        )
        console.log('Query created:', q)
        
        try {
          const querySnapshot = await getDocs(q)
          console.log('Firebase response:', {
            empty: querySnapshot.empty,
            size: querySnapshot.size,
            metadata: querySnapshot.metadata
          })
          
          const items = querySnapshot.docs.map(doc => {
            console.log('Document data:', {
              id: doc.id,
              exists: doc.exists(),
              data: doc.data()
            })
            return {
              ...doc.data(),
              id: doc.id
            }
          }) as GalleryItem[]

          if (items.length > 0) {
            console.log('Found items in Firebase:', items)
            galleryCache = items
            lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
            
            return {
              items,
              hasMore: items.length === ITEMS_PER_PAGE
            }
          } else {
            console.log('No items found in Firebase, loading mock data...')
          }
        } catch (error) {
          const fbError = error as FirebaseError
          console.error('Error during query execution:', {
            error: fbError,
            code: fbError.code,
            message: fbError.message,
            details: fbError.customData
          })
          throw fbError
        }
      } else if (lastVisibleDoc) {
        console.log('Fetching subsequent page from Firebase...')
        const q = query(
          collection(db, GALLERY_COLLECTION),
          orderBy('id', 'asc'),
          startAfter(lastVisibleDoc),
          limit(ITEMS_PER_PAGE)
        )
        
        const querySnapshot = await getDocs(q)
        const items = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as GalleryItem[]

        if (items.length > 0) {
          console.log('Found more items in Firebase:', items)
          galleryCache = [...galleryCache, ...items]
          lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
          
          return {
            items,
            hasMore: items.length === ITEMS_PER_PAGE
          }
        }
      }

      // If Firebase returns no items, load mock data
      console.log('Loading mock data...')
      const mockData = await loadGalleryData()
      const startIndex = (page - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      
      return {
        items: mockData.items.slice(startIndex, endIndex),
        hasMore: endIndex < mockData.items.length
      }
    } catch (error) {
      const fbError = error as FirebaseError
      console.error('Error fetching gallery items:', {
        error: fbError,
        code: fbError.code,
        message: fbError.message,
        details: fbError.customData,
        collection: GALLERY_COLLECTION,
        page
      })
      // On error, try mock data
      const mockData = await loadGalleryData()
      const startIndex = (page - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      
      return {
        items: mockData.items.slice(startIndex, endIndex),
        hasMore: endIndex < mockData.items.length
      }
    }
  },

  addGalleryItem: async (item: Omit<GalleryItem, 'id'>): Promise<string> => {
    try {
      const itemsRef = collection(db, GALLERY_COLLECTION)
      const q = query(itemsRef, orderBy('id', 'desc'), limit(1))
      const querySnapshot = await getDocs(q)
      
      // Generate next ID
      let nextId = '001'
      if (!querySnapshot.empty) {
        const lastId = querySnapshot.docs[0].data().id
        nextId = String(Number(lastId) + 1).padStart(3, '0')
      }

      const newItem = { ...item, id: nextId }
      await setDoc(doc(itemsRef, nextId), newItem)
      
      // Clear cache
      galleryCache = []
      lastVisibleDoc = null
      
      return nextId
    } catch (error) {
      const fbError = error as FirebaseError
      console.error('Error adding gallery item:', {
        error: fbError,
        code: fbError.code,
        message: fbError.message,
        details: fbError.customData
      })
      throw fbError
    }
  },

  updateGalleryItem: async (id: string, item: Partial<GalleryItem>): Promise<void> => {
    try {
      await setDoc(doc(db, GALLERY_COLLECTION, id), item, { merge: true })
      
      // Clear cache
      galleryCache = []
      lastVisibleDoc = null
    } catch (error) {
      const fbError = error as FirebaseError
      console.error('Error updating gallery item:', {
        error: fbError,
        code: fbError.code,
        message: fbError.message,
        details: fbError.customData
      })
      throw fbError
    }
  },

  deleteGalleryItem: async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, GALLERY_COLLECTION, id))
      
      // Clear cache
      galleryCache = []
      lastVisibleDoc = null
    } catch (error) {
      const fbError = error as FirebaseError
      console.error('Error deleting gallery item:', {
        error: fbError,
        code: fbError.code,
        message: fbError.message,
        details: fbError.customData
      })
      throw fbError
    }
  },

  getGalleryItemById: async (id: string): Promise<GalleryItem | null> => {
    try {
      // First check cache
      const cachedItem = galleryCache.find(item => item.id === id)
      if (cachedItem) return cachedItem

      // Then try Firebase
      const q = query(collection(db, GALLERY_COLLECTION), where('id', '==', id), limit(1))
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        return {
          ...querySnapshot.docs[0].data(),
          id: querySnapshot.docs[0].id
        } as GalleryItem
      }

      // If not found in Firebase, try mock data
      const mockData = await loadGalleryData()
      return mockData.items.find(item => item.id === id) || null
    } catch (error) {
      const fbError = error as FirebaseError
      console.error('Error fetching gallery item:', {
        error: fbError,
        code: fbError.code,
        message: fbError.message,
        details: fbError.customData
      })
      // On error, try mock data
      const mockData = await loadGalleryData()
      return mockData.items.find(item => item.id === id) || null
    }
  }
}
