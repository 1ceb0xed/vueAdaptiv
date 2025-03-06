import { defineStore } from 'pinia'
import axios from 'axios'

export const useFetchStore = defineStore('fetch', {
  state: () => ({
    items: [],
    addedItems: [],
    favoriteItems: [],
  }),
  actions: {
    async fetchItems() {
      try {
        const { data } = await axios.get('https://a3ca5502346e0c49.mokky.dev/items')
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
    async fetchAdded() {
      try {
        const { data } = await axios.get('https://a3ca5502346e0c49.mokky.dev/cartadded')
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
    async fetchFavorites() {
      try {
        const { data: favorites } = await axios.get('https://a3ca5502346e0c49.mokky.dev/favorites')
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
