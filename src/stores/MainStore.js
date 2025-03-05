import { defineStore } from 'pinia'
import axios from 'axios'

export const fetchAll = defineStore('data', {
  state: () => ({
    items: null,
    addedItems: null,
    favoriteItems: null,
    err: null,
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
  },
})
