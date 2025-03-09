import { defineStore } from 'pinia'
import axios from 'axios'

export interface item {
  id: number
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  isAdded: boolean
  favoriteId: number | null
  addedId: number | null
}

export interface addedItem {
  parentId: number
  id: number
}

export interface favoriteItem {
  parentId: number
  id: number
}

export const useFetchStore = defineStore('fetch', {
  state: () => ({
    items: [] as item[],
    addedItems: [] as addedItem[],
    favoriteItems: [] as favoriteItem[],
  }),
  actions: {
    async fetchItems(): Promise<void> {
      try {
        const { data } = await axios.get<item[]>('https://a3ca5502346e0c49.mokky.dev/items')
        this.items = data.map((obj) => ({
          ...obj,
          isFavorite: false,
          isAdded: false,
          favoriteId: null,
          addedId: null,
        }))
      } catch (err) {
        console.log(err)
      }
    },
    async fetchAdded(): Promise<void> {
      try {
        const { data } = await axios.get<addedItem[]>(
          'https://a3ca5502346e0c49.mokky.dev/cartadded',
        )
        this.addedItems = data
        this.items = this.items.map((item) => {
          const added = data.find((added) => added.parentId === item.id)
          if (!added) {
            return item
          }
          return {
            ...item,
            isAdded: true,
            addedId: added.id,
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchFavorites(): Promise<void> {
      try {
        const { data: favorites } = await axios.get<favoriteItem[]>(
          'https://a3ca5502346e0c49.mokky.dev/favorites',
        )
        this.favoriteItems = favorites
        this.items = this.items.map((item) => {
          const favorite = favorites.find((favorite) => favorite.parentId === item.id)
          if (!favorite) {
            return item
          }
          return {
            ...item,
            isFavorite: true,
            favoriteId: favorite.id,
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
})
