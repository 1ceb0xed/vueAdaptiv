import { defineStore } from 'pinia'
import { useFetchStore } from './FetchStore'
import { item } from './FetchStore'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    filter: 'name' as 'name' | 'priceUP' | 'priceDown',
    searchQuery: '' as string,
  }),
  getters: {
    favoriteAddedItems: (): (item | undefined)[] => {
      const fetchStore = useFetchStore()
      return fetchStore.favoriteItems.map((favoriteItem) => {
        return fetchStore.items.find((item) => item.id === favoriteItem.parentId)
      })
    },
    searchedItems(): item[] {
      const fetchStore = useFetchStore()
      let result = fetchStore.items.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
      switch (
        this.filter //из условия получаем ответ и сравниваем его с case, default - не совпало ни одно
      ) {
        case 'priceUp':
          return result.sort((a, b) => a.price - b.price)
        case 'priceDown':
          return result.sort((a, b) => b.price - a.price)
        case 'name':
          return result.sort((a, b) => a.title.localeCompare(b.title))
        default:
          return result
      }
    },
    totalSummCart(): number {
      const fetchStore = useFetchStore()
      return fetchStore.items
        .filter((item) => item.isAdded)
        .reduce((sum, item) => sum + item.price, 0)
    },
  },
  actions: {
    async addToCart(item: item): Promise<void> {
      const fetchStore = useFetchStore()
      try {
        if (!item.isAdded) {
          const obj = {
            parentId: item.id,
          }
          item.isAdded = true
          const { data } = await axios.post('https://a3ca5502346e0c49.mokky.dev/cartadded', obj)
          item.addedId = data.id
        } else {
          item.isAdded = false
          await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${item.addedId}`)
          item.addedId = null
        }
      } catch (err) {
        console.log(err)
      }
      fetchStore.fetchAdded()
    },
    async addToFavorite(item: item): Promise<void> {
      const fetchStore = useFetchStore()
      try {
        if (!item.isFavorite) {
          const obj = {
            parentId: item.id,
          }
          item.isFavorite = true
          const { data } = await axios.post('https://a3ca5502346e0c49.mokky.dev/favorites', obj)
          item.favoriteId = data.id
        } else {
          item.isFavorite = false
          await axios.delete(`https://a3ca5502346e0c49.mokky.dev/favorites/${item.favoriteId}`)
          item.favoriteId = null
        }
      } catch (err) {
        console.log(err)
      }
      fetchStore.fetchFavorites()
    },
  },
})
